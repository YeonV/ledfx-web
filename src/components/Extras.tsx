import { Alert, Box, Button, Divider, Stack, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Win from './Win'
import Apple from './Apple'
import Linux from './Linux'
import Android from './Android'
import { getMobileOperatingSystem } from './utils'

type Asset = { browser_download_url: string; name: string }

type Platform = 'win' | 'mac' | 'linux' | 'android' | 'any'

const detectPlatform = (name: string): Platform => {
  const n = name.toLowerCase()
  if (n.includes('android') || n.endsWith('.apk')) return 'android'
  if (n.includes('win') || n.endsWith('.exe')) return 'win'
  if (n.includes('mac') || n.includes('osx') || n.includes('darwin')) return 'mac'
  if (n.includes('linux')) return 'linux'
  return 'any'
}

const arch = (n: string) =>
  n.includes('arm64-v8a') ? 'arm64' : n.includes('armeabi-v7a') ? 'armv7' : n.includes('x86_64') ? 'x86_64' : n.includes('x86') ? 'x86' : ''

/** The APKs the CC tab already shows — mirrors the filter in `OS.tsx`. */
const shownOnCcTab = (n: string) => n.includes('-release.apk') || n.includes('-x86.apk') || n.includes('-x86_64.apk')

/**
 * Assets already covered by the Core / CC / Client tabs — never repeated here.
 * The `LedFx_CC-` prefix alone is not enough to decide: the debug APKs and the
 * root audio module carry it too, and no other tab shows them.
 */
const coveredElsewhere = (name: string) => {
  const n = name.toLowerCase()
  if (!/^ledfx[_-](core|cc|client)/.test(n)) return false
  if (n.endsWith('.apk')) return shownOnCcTab(n)
  return /(win|osx|mac|linux)/.test(n)
}

/**
 * Order matters: the first matching group wins, so `song-detector-plus` has to
 * be tested before the plain `song-detector` prefix would swallow it. It also
 * fixes the button order inside every OS column, so the same product sits on
 * the same row across Windows / macOS / Linux.
 * Anything left over keeps its cleaned-up filename as a label, so a new release
 * asset shows up on this tab by itself instead of silently disappearing.
 */
/** Now Playing is handled by LedFx itself on these platforms; macOS still needs the separate helper. */
const nowPlayingIsNative = {
  on: ['win', 'linux'] as Platform[],
  note: 'Optional here — LedFx has native Now Playing support built in on this platform. The standalone detector still works if you prefer to run it separately.'
}

const groups: {
  id: string
  label: string | ((n: string) => string)
  description: string
  match: (n: string) => boolean
  /**
   * Platforms where LedFx covers this natively and the separate download is
   * therefore optional. Drives both the outlined button and its tooltip, so the
   * styling and the explanation can never drift apart.
   */
  superseded?: { on: Platform[]; note: string }
}[] = [
  {
    id: 'blade-song-detector',
    label: 'Blade Song Detector',
    description: 'Standalone now-playing detector. Feeds artist, title, artwork and colors into LedFx.',
    match: (n) => n.startsWith('blade-song-detector'),
    superseded: nowPlayingIsNative
  },
  {
    id: 'song-detector-plus',
    label: 'Song Detector Plus',
    description: 'Everything Song Detector does, plus playback position, player controls and song triggers.',
    match: (n) => n.startsWith('song-detector-plus'),
    superseded: nowPlayingIsNative
  },
  {
    id: 'song-detector',
    label: 'Song Detector',
    description: 'Artist and title to a matrix, album art visualization and gradient extraction.',
    match: (n) => n.startsWith('song-detector'),
    superseded: nowPlayingIsNative
  },
  {
    id: 'root-audio-module',
    label: 'Root Audio Module',
    description: 'Magisk module for rooted devices: latency-free internal audio capture for the LedFx app.',
    match: (n) => n.includes('root-audio-module')
  },
  {
    id: 'debug-apk',
    label: (n) => (arch(n) ? `Debug APK · ${arch(n)}` : 'Debug APK'),
    description:
      'Debuggable build, for adb run-as and the androdev tooling. Signed with a throwaway key that differs on every build, so it never upgrades in place and cannot replace a release install.',
    match: (n) => n.endsWith('.apk')
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'The web UI on its own. Only needed to serve a custom frontend from your own Core.',
    match: (n) => n.includes('frontend')
  }
]

const describe = (name: string) => {
  const n = name.toLowerCase()
  const group = groups.find((g) => g.match(n))
  if (group) {
    return {
      id: group.id,
      label: typeof group.label === 'function' ? group.label(n) : group.label,
      description: group.description,
      rank: groups.indexOf(group),
      superseded: group.superseded ?? null
    }
  }
  const label = (name.includes('--') ? name.split('--')[1] : name)
    .replace(/\.(exe|zip|dmg|snap|tar\.gz|AppImage|apk)$/i, '')
    .replace(/[-_](win|windows|osx|mac|macos|darwin|linux|android)\b/gi, '')
    .replace(/(\d+\.\d+\.\d+)-/, '')
    .trim()
  return { id: 'other', label: label || name, description: name, rank: groups.length, superseded: null as typeof nowPlayingIsNative | null }
}

export default function Extras({ assets }: { assets: Asset[] }) {
  const isAndroid = getMobileOperatingSystem() === 'Android'
  const pool = (assets ?? []).filter((a) => !coveredElsewhere(a.name))

  const forPlatform = (platform: Platform) =>
    pool
      .filter((a) => detectPlatform(a.name) === platform)
      .map((a) => ({ ...a, ...describe(a.name) }))
      .sort((a, b) => a.rank - b.rank || a.label.localeCompare(b.label))

  const columns: { id: Platform; Icon: ({ ...props }) => JSX.Element }[] = [
    { id: 'win', Icon: Win },
    { id: 'mac', Icon: Apple },
    { id: 'linux', Icon: Linux }
  ]
  const android = { id: 'android' as Platform, Icon: Android }
  const crossPlatform = forPlatform('any')

  if (pool.length === 0) {
    return (
      <Alert variant='outlined' severity='info' sx={{ marginTop: 4 }}>
        This release ships no extra assets.
      </Alert>
    )
  }

  const renderColumn = ({ id, Icon }: { id: Platform; Icon: ({ ...props }) => JSX.Element }) => {
    const items = forPlatform(id)
    if (items.length === 0) return null
    return (
      <Grid item key={id} sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          {id === 'android' && !isAndroid ? (
            <Box sx={{ height: 190, overflow: 'hidden' }}>
              <Icon />
            </Box>
          ) : (
            <Icon />
          )}
          {items.map((a) => {
            const supersededNote = a.superseded?.on.includes(id) ? a.superseded.note : null
            return (
              <Tooltip key={a.name} title={supersededNote ?? a.description} placement='top'>
                <Button
                  sx={{ textTransform: 'none', width: '220px' }}
                  variant={supersededNote ? 'outlined' : 'contained'}
                  href={a.browser_download_url}
                >
                  {a.label}
                </Button>
              </Tooltip>
            )
          })}
          {items.some((a) => a.id === 'debug-apk') && (
            <Alert variant='outlined' severity='warning' sx={{ width: '220px' }}>
              Debug APKs are for <strong>development</strong> — uninstall the app first.
            </Alert>
          )}
        </Stack>
      </Grid>
    )
  }

  return (
    <>
      <Alert variant='outlined' severity='info' sx={{ marginTop: 2, marginBottom: 2 }}>
        Companion tools and developer builds — <strong>in Beta</strong>. LedFx itself does not need any of these.
      </Alert>
      <Grid sx={{ flexGrow: 1, justifyContent: 'center', marginTop: 2, color: '#bbb' }} direction={'row'} spacing={2} container>
        {isAndroid && renderColumn(android)}
        {columns.map(renderColumn)}
        {!isAndroid && renderColumn(android)}
      </Grid>
      {crossPlatform.length > 0 && (
        <>
          <Divider sx={{ marginTop: 2, marginBottom: 3 }} />
          <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
            <Typography variant='body2' color='text.secondary'>
              Cross-platform
            </Typography>
            {crossPlatform.map((a) => (
              <Tooltip key={a.name} title={a.description} placement='top'>
                <Button sx={{ textTransform: 'none', width: '220px' }} variant='contained' href={a.browser_download_url}>
                  {a.label}
                </Button>
              </Tooltip>
            ))}
          </Stack>
        </>
      )}
    </>
  )
}
