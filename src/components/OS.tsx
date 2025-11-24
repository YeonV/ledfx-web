import { Alert, Box, Button, Divider, Stack } from '@mui/material'
import Grid from '@mui/material/Grid'
import Apple from './Apple'
import Linux from './Linux'
import Win from './Win'
import { getMobileOperatingSystem } from './utils'
import Android from './Android'
import FireTVGuide from './FireTVGuide'

export default function OS({
  assets,
  variant = 'core',
  official,
  fireTVCode
}: {
  assets: { browser_download_url: string; name: string }[]
  variant?: 'core' | 'client' | 'CC'
  official?: boolean
  fireTVCode?: string | null
}) {
  const isAndroid = getMobileOperatingSystem() === 'Android'
  // console.log(assets.map((a) => a.name))
  return (
    <Grid sx={{ flexGrow: 1, justifyContent: 'center', marginTop: 2, color: '#bbb' }} direction={'row'} spacing={2} container>
      {isAndroid && variant === 'CC' && <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Box>
            <Android />
          </Box>
          {assets
            ?.filter((a) => a.name.includes('apk') && (a.name.includes('-release.apk') || a.name.includes('-x86.apk') || a.name.includes('-x86_64.apk')))
            ?.map((a) => (
              <Button sx={{ textTransform: 'none', width: '180px' }} key={a.name} variant='contained' href={a.browser_download_url}>
                {a.name.includes('arm64-v8a') ? 'arm64' : 
                 a.name.includes('armeabi-v7a') ? 'armv7' :
                 a.name.includes('x86_64') ? 'x86_64' :
                 a.name.includes('x86') ? 'x86' : 'APK'}
              </Button>
            ))}
            <Divider sx={{ pt: 3, pb: 0, width: '100%' }} />
            
            {fireTVCode && (<Box sx={{ width: '180px', marginTop: 2, py: 0, pl: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderColor: 'info.main', borderRadius: 1 }}>
               <div>FireTV:</div>
               <div>
                <strong>{fireTVCode}</strong>
                <FireTVGuide downloadCode={fireTVCode} />
               </div>
               
            </Box>)}
            <Alert variant='outlined' severity='info' sx={{ width: '180px' }}>
               The Android app is <strong>in Alpha</strong>
            </Alert>
            <Divider sx={{ pt: 0, pb: 4, width: '100%' }} />
        </Stack>
      </Grid>}
      <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Win />
          {assets
            ?.filter((a) => a.name.includes('win') && (a.name.includes(variant) || official))
            ?.map((a) => (
              <Button sx={{ textTransform: 'none', width: '180px' }} key={a.name} variant='contained' href={a.browser_download_url}>
                {(a.name.includes('--') ? a.name.split('--')[1] : a.name)
                  .replace('.exe', '')
                  .replace('win', '')
                  .replace('LedFx', '')
                  .replace(/(\d+\.\d+\.\d+)-/, '')
                  .replace('v', '')
                  .replace('-', '')
                  .replace('-', '')
                  .replace('.', '')}
              </Button>
            ))}
        </Stack>
      </Grid>
      <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Apple />
          {assets
            ?.filter((a) => (a.name.includes('osx') || a.name.includes('mac')) && (a.name.includes(variant) || official))
            ?.map((a) => {
              const filename = a.name.includes('--') ? a.name.split('--')[1] : a.name
              const extension = filename.split('.').pop() || ''
              const label = filename
                .replace('osx', '')
                .replace('zip', '')
                .replace('mac', '')
                .replace('dmg', '')
                .replace('LedFx', '')
                .replace(/(\d+\.\d+\.\d+)-/, '')
                .replace('v', '')
                .replace('-', '')
                .replace('.', '')
                .trim()
              return (
                <Button sx={{ textTransform: 'none', width: '180px', display: 'flex', justifyContent: 'space-between' }} key={a.name} variant='contained' href={a.browser_download_url}>
                  <span>{label}</span>
                  <span>{extension}</span>
                </Button>
              )
            })}
        </Stack>
      </Grid>
      <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Linux />
          {assets
            ?.filter((a) => a.name.includes('linux') && (a.name.includes(variant) || official))
            ?.map((a) => {
              const filename = a.name.includes('--') ? a.name.split('--')[1] : a.name
              const extension = filename.includes('tar.gz') ? 'tar.gz' : filename.split('.').pop() || ''
              const label = filename
                .replace('linux', '')
                .replace('tar.gz', '')
                .replace('AppImage', '')
                .replace('snap', '')
                .replace('LedFx', '')
                .replace(/(\d+\.\d+\.\d+)-/, '')
                .replace('v', '')
                .replace('-', '')
                .replace('.', '')
                .trim()
              return (
                <Button sx={{ textTransform: 'none', width: '180px', display: 'flex', justifyContent: 'space-between' }} key={a.name} variant='contained' href={a.browser_download_url}>
                  <span>{label}</span>
                  <span>{extension}</span>
                </Button>
              )
            })}
        </Stack>
      </Grid>
      {!isAndroid && variant === 'CC' && <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Box sx={{ height: 190, overflow: 'hidden' }}>
            <Android />
          </Box>
          {assets
            ?.filter((a) => a.name.includes('apk') && (a.name.includes('-release.apk') || a.name.includes('-x86.apk') || a.name.includes('-x86_64.apk')))
            ?.map((a) => (
              <Button sx={{ textTransform: 'none', width: '180px' }} key={a.name} variant='contained' href={a.browser_download_url}>
                {a.name.includes('arm64-v8a') ? 'arm64' : 
                 a.name.includes('armeabi-v7a') ? 'armv7' :
                 a.name.includes('x86_64') ? 'x86_64' :
                 a.name.includes('x86') ? 'x86' : 'APK'}
              </Button>
            ))}
            {fireTVCode && (<Box sx={{ width: '180px', marginTop: 2, py: 0, pl: 2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', border: '1px solid', borderColor: 'info.main', borderRadius: 1 }}>
               <div>FireTV:</div>
               <div>
                <strong>{fireTVCode}</strong>
                <FireTVGuide downloadCode={fireTVCode} />
               </div>
               
            </Box>)}
        </Stack>
      </Grid>}
    </Grid>
  )
}
