import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useMemo, useState } from 'react'
import TopBar from './components/TopBar'
import Tabs from './components/Tabs'
// import Alert from './components/Alert'
import { Box, Typography } from '@mui/material'
// import Additionals from './components/Additional'
import Footer from './components/Footer'
import Links from './components/Links'
import { getMobileOperatingSystem } from './components/utils'

export type ReleaseType = {
  name: string
  assets: {
    browser_download_url: string
    name: string
  }[]
  tag_name: string
  prerelease: boolean
  body?: string
}

/**
 * Every mount hits three release endpoints, and GitHub allows 60 anonymous
 * calls per hour per IP — a handful of dev-server reloads used to exhaust that
 * and leave the page blank. Cache per tab so reloads reuse the response, and
 * never cache a failed one: a rate-limit body is `{ message: ... }`, which
 * would poison the cache for the whole TTL and break `.filter()` downstream.
 */
const CACHE_TTL = 5 * 60 * 1000
const BLOCKED_UNTIL = 'ledfx-releases:blocked-until'

/**
 * GitHub is explicit that you must not retry before `x-ratelimit-reset`, and
 * that "continuing to make requests while you are rate limited may result in
 * the banning of your integration" — so once we see a 403/429 with no quota
 * left, park the reset time and refuse to hit the network until it passes.
 * If CORS ever stops exposing the header this simply never engages, and the
 * cache above still carries the load.
 */
const blockedUntil = () => {
  const until = Number(sessionStorage.getItem(BLOCKED_UNTIL) ?? 0)
  return Date.now() < until ? until : 0
}

const cachedJson = async (url: string) => {
  const key = `ledfx-releases:${url}`
  try {
    const hit = sessionStorage.getItem(key)
    if (hit) {
      const { at, data } = JSON.parse(hit)
      if (Date.now() - at < CACHE_TTL) return data
    }
  } catch {
    // unreadable entry — fall through and refetch
  }

  const until = blockedUntil()
  if (until) throw new Error(`rate limited, not retrying until ${new Date(until).toLocaleTimeString()}`)

  const res = await fetch(url)
  if (!res.ok) {
    if ((res.status === 403 || res.status === 429) && res.headers.get('x-ratelimit-remaining') === '0') {
      const reset = Number(res.headers.get('x-ratelimit-reset')) * 1000
      if (reset) sessionStorage.setItem(BLOCKED_UNTIL, String(reset))
    }
    throw new Error(`${res.status} ${res.statusText} — ${url}`)
  }
  const data = await res.json()
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }))
  } catch {
    // quota or private mode — caching is best effort
  }
  return data
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light')
  const [releases, setReleases] = useState<ReleaseType[]>([])
  const [releasesO, setReleasesO] = useState<ReleaseType[]>([])
  const [mirror, setMirror] = useState<'Official' | 'Unofficial'>('Unofficial')
  const [version, setVersion] = useState<string>((mirror === 'Unofficial' ? releases : releasesO)[0]?.tag_name || '')

  const isAndroid = getMobileOperatingSystem() === 'Android'
  const isIOS = getMobileOperatingSystem() === 'iOS'
  const isFireTV = new URLSearchParams(window.location.search).get('firetv') !== null
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode
        }
      }),
    [mode]
  )

  useEffect(() => {
    const get = async () => {
      const releases_with_pre = await cachedJson('https://api.github.com/repos/YeonV/LedFx-Builds/releases')
      const releases: ReleaseType[] = releases_with_pre.filter((r: ReleaseType) => r.prerelease === false)

      // Get the latest release using the /latest endpoint
      const latestRelease: ReleaseType = await cachedJson('https://api.github.com/repos/YeonV/LedFx-Builds/releases/latest')

      // Move latest to the front of the array
      const sortedReleases = [
        latestRelease,
        ...releases.filter(r => r.tag_name !== latestRelease.tag_name)
      ]
      setReleases(sortedReleases)

      const releases_with_preO = await cachedJson('https://api.github.com/repos/LedFx/LedFx/releases')
      const releasesO: ReleaseType[] = releases_with_preO.filter((r: ReleaseType) => r.prerelease === false)
      setReleasesO(releasesO)
    }
    // No deps: the effect reads neither `mirror` nor `version`, and it *writes*
    // `version` further down — so listing them made every tab switch refetch all
    // three endpoints, then bounce and do it again.
    get().catch((e) => console.warn('[releases]', e.message))
  }, [])

  useEffect(() => {
    setVersion((mirror === 'Unofficial' ? releases : releasesO)[0]?.tag_name || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releases, releasesO])

  console.log(releases)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {isFireTV ? (<Box sx={{ width: '100%', height: '100%', overflow: 'hidden', bgcolor: 'red'}}>

      </Box>) : (<Box sx={{ width: '100%', maxWidth: 1240, margin: '2rem auto', padding: isAndroid? '30px 20px 50px' : '50px 20px 50px' }}>
        <TopBar
          mode={mode}
          setMode={setMode}
          releases={mirror === 'Unofficial' ? releases : releasesO}
          setVersion={setVersion}
          mirror={mirror}
          setMirror={setMirror}
        />
        {!isIOS && (
          <>
            <Tabs releasesO={releasesO} releases={releases} version={version} setVersion={setVersion} setMirror={setMirror} />
            {/* <Alert />
            <Additionals /> */}
          </>
        )}
        {isIOS && (
          <Typography marginBottom={5} variant='h6'>
            You need Windows, macOS or Linux to <b>run</b> LedFx, <br />
            however you can still control it from your phone by browsing <br />
            <br />
            <code style={{ padding: '15px 30px', margin: 0, background: '#000' }}>http://[ip-of-pc-running-ledfx]:8888</code>
          </Typography>
        )}
        <Links />
        <Footer />
      </Box>)}
    </ThemeProvider>
  )
}

export default App
