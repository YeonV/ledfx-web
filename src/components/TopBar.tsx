import { AppBar, Box, Button, MenuItem, Select, Stack, Toolbar, Typography } from '@mui/material'
import { Brightness7, DarkMode } from '@mui/icons-material'
import { ReleaseType } from '../App'

function TopBar({
  mode,
  setMode,
  releases,
  mirror,
  version,
  setMirror,
  setVersion
}: {
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
  releases: ReleaseType[]
  mirror: 'Official' | 'Unofficial'
  version: string
  setMirror: (mirror: 'Official' | 'Unofficial') => void
  setVersion: (version: string) => void
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6'>Download LedFx</Typography>
          <Stack direction={'row'} spacing={2} sx={{ color: '#fff' }} alignItems={'center'}>
            <Button variant='outlined' color={'inherit'} href='https://ledfx.readthedocs.io/en/stable/'>
              Docs
            </Button>
            <Button variant='outlined' color={'inherit'} onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
              {mode === 'dark' ? <DarkMode /> : <Brightness7 />}
            </Button>
            <Select
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
            </Select>
            <Select
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
            </Select>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar
