import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'
import { Brightness7, DarkMode } from '@mui/icons-material'
import { ReleaseType } from '../App'
import { getMobileOperatingSystem } from './utils'

function TopBar({
  mode,
  setMode
}: {
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
  releases: ReleaseType[]
  mirror: 'Official' | 'Unofficial'
  setMirror: (mirror: 'Official' | 'Unofficial') => void
  setVersion: (version: string) => void
}) {
  const isAndroid = getMobileOperatingSystem() === 'Android'
  const isIOS = getMobileOperatingSystem() === 'iOS'
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%', maxWidth: 1240, margin: '0 auto' }}>
          <Typography variant='h6'>Download LedFx</Typography>
          {!isAndroid && !isIOS && (
            <>
              <Stack direction={'row'} spacing={2} sx={{ color: '#fff' }} alignItems={'center'}>
                <Button variant='outlined' color={'inherit'} href='https://ledfx.readthedocs.io/en/stable/'>
                  Docs
                </Button>
                <Button variant='outlined' color={'inherit'} onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
                  {mode === 'dark' ? <DarkMode /> : <Brightness7 />}
                </Button>
                {/* <Select
                  disabled
                  value={mirror}
                  onChange={(e) => setMirror(e.target.value as 'Official' | 'Unofficial')}
                  sx={{
                    'color': 'inherit',
                    'border': '1px solid #fff',
                    'boxSizing': 'border-box',
                    '& .MuiSelect-select': {
                      padding: '7px 2rem 7px 1rem'
                    }
                  }}
                >
                  <MenuItem value='Unofficial'>Unofficial</MenuItem>
                  <MenuItem value='Official'>Official</MenuItem>
                </Select> */}
                {/* <Select
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  sx={{
                    'color': 'inherit',
                    'border': '1px solid #fff',
                    'boxSizing': 'border-box',
                    '& .MuiSelect-select': {
                      padding: '7px 2rem 7px 1rem'
                    }
                  }}
                >
                  {releases.map((r) => (
                    <MenuItem key={r.tag_name} value={r.tag_name}>
                      {r.tag_name}
                    </MenuItem>
                  ))}
                </Select> */}
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
