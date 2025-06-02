import { Alert, Box, Button, Divider, Stack } from '@mui/material'
import Grid from '@mui/material/Grid'
import Apple from './Apple'
import Linux from './Linux'
import Win from './Win'
import { getMobileOperatingSystem } from './utils'
import Android from './Android'

export default function OS({
  assets,
  variant = 'core',
  official,
}: {
  assets: { browser_download_url: string; name: string }[]
  variant?: 'core' | 'client' | 'CC'
  official?: boolean
}) {
    const isAndroid = getMobileOperatingSystem() === 'Android'
  
  return (
    <Grid sx={{ flexGrow: 1, justifyContent: 'center', marginTop: 2, color: '#bbb' }} direction={'row'} spacing={2} container>
      {isAndroid && variant === 'CC' && <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Box>
            <Android />
          </Box>
          {assets
            ?.filter((a) => a.name.includes('apk'))
            ?.map((a) => (
              <Button key={a.name} variant='contained' href={a.browser_download_url}>
                {'APK'}
              </Button>
            ))}
            <Divider sx={{ pt: 3, pb: 2, width: '100%' }} />
            <Alert variant='outlined' severity='info' sx={{ width: '100%' }}>
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
              <Button key={a.name} variant='contained' href={a.browser_download_url}>
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
            ?.map((a) => (
              <Button key={a.name} variant='contained' href={a.browser_download_url}>
                {(a.name.includes('--') ? a.name.split('--')[1] : a.name)
                  .replace('osx', '')
                  .replace('zip', '')
                  .replace('mac', '')
                  .replace('zip', '')
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
          <Linux />
          {assets
            ?.filter((a) => a.name.includes('linux') && (a.name.includes(variant) || official))
            ?.map((a) => (
              <Button key={a.name} variant='contained' href={a.browser_download_url}>
                {(a.name.includes('--') ? a.name.split('--')[1] : a.name).replace('linux', '').replace('tar.gz', '').replace('-', '').replace('.', '')}
              </Button>
            ))}
        </Stack>
      </Grid>
      {!isAndroid && variant === 'CC' && <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Box sx={{ height: 190, overflow: 'hidden' }}>
            <Android />
          </Box>
          {assets
            ?.filter((a) => a.name.includes('apk'))
            ?.map((a) => (
              <Button key={a.name} variant='contained' href={a.browser_download_url}>
                {'APK'}
              </Button>
            ))}
        </Stack>
      </Grid>}
    </Grid>
  )
}
