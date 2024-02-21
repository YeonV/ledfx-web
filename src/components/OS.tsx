import { Button, Stack } from '@mui/material'
import Grid from '@mui/material/Grid'
import Apple from './Apple'
import Linux from './Linux'
import Win from './Win'

export default function OS({
  assets,
  variant = 'core',
  official
}: {
  assets: { browser_download_url: string; name: string }[]
  variant?: 'core' | 'client' | 'CC'
  official?: boolean
}) {
  return (
    <Grid sx={{ flexGrow: 1, justifyContent: 'center', marginTop: 2, color: '#bbb' }} direction={'row'} spacing={2} container>
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
    </Grid>
  )
}
