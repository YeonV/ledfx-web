import { Button, Stack } from '@mui/material'
import Grid from '@mui/material/Grid'
import Apple from './Apple'
import Linux from './Linux'
import Win from './Win'

export default function OS({ assets, variant }: { assets: { browser_download_url: string; name: string }[]; variant: 'core' | 'client' | 'CC' }) {
  // console.log(assets)
  return (
    <Grid sx={{ flexGrow: 1, justifyContent: 'center', marginTop: 2, color: '#bbb' }} direction={'row'} spacing={2} container>
      <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Win />
          {assets
            ?.filter((a) => a.name.includes('win') && a.name.includes(variant))
            ?.map((a) => (
              <Button key={a.name} variant='contained' href={a.browser_download_url}>
                {a.name.split('--')[1].replace('.exe', '').replace('win', '').replace('-', '').replace('.', '')}
              </Button>
            ))}
        </Stack>
      </Grid>
      <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Apple />
          {assets
            ?.filter((a) => (a.name.includes('osx') || a.name.includes('mac')) && a.name.includes(variant))
            ?.map((a) => (
              <Button key={a.name} variant='contained' href={a.browser_download_url}>
                {a.name.split('--')[1].replace('osx', '').replace('zip', '').replace('mac', '').replace('zip', '').replace('-', '').replace('.', '')}
              </Button>
            ))}
        </Stack>
      </Grid>
      <Grid item sx={{ width: '30%', minWidth: 300 }}>
        <Stack direction={'column'} spacing={2} alignItems={'center'} marginBottom={4}>
          <Linux />
          {assets
            ?.filter((a) => a.name.includes('linux') && a.name.includes(variant))
            ?.map((a) => (
              <Button key={a.name} variant='contained' href={a.browser_download_url}>
                {a.name.split('--')[1].replace('linux', '').replace('tar.gz', '').replace('-', '').replace('.', '')}
              </Button>
            ))}
        </Stack>
      </Grid>
    </Grid>
  )
}
