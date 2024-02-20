import * as React from 'react'
import MuiTabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import OS from './OS'
import { ReleaseType } from '../App'
import { Autocomplete, TextField, useTheme } from '@mui/material'
import { Search } from '@mui/icons-material'

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Tabs({
  releases,
  releasesO,
  mirror,
  version
}: // setMirror
{
  releases: ReleaseType[]
  releasesO: ReleaseType[]
  mirror: 'Official' | 'Unofficial'
  version: string
  // setMirror: React.Dispatch<React.SetStateAction<'Official' | 'Unofficial'>>
}) {
  const [value, setValue] = React.useState(0)
  const theme = useTheme()
  // console.log(mirror)
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    // newValue === 0 ? setMirror('Official') : setMirror('Unofficial')
  }
  const assets = releases.find((r) => r.tag_name === version)?.assets
  const assetsO = releasesO.find((r) => r.tag_name === version)?.assets

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <MuiTabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab wrapped label='LedFx Core (stable)' {...a11yProps(0)} />
          <Tab wrapped label='LedFx Core (beta)' {...a11yProps(1)} />
          <Tab wrapped label='LedFx Client (beta)' {...a11yProps(2)} />
          <Tab wrapped label='LedFx CC (beta)' {...a11yProps(3)} />
        </MuiTabs>
        <Autocomplete
          id='grouped-demo'
          clearOnBlur
          color={theme.palette.text.disabled}
          popupIcon={<Search />}
          options={(mirror === 'Unofficial' ? releases : releasesO).map((r) => r.assets.map((a) => ({ name: r.tag_name, assets: a }))).flat(1)}
          groupBy={(option) => option.name}
          getOptionLabel={(option) =>
            option.assets.name
              .replace('LedFx-', '')
              .replace('LedFx_', '')
              .replace(/(\d+\.\d+\.\d+)-/, '')
              .replace('v', '')
          }
          onChange={(_event, newValue) => {
            if (newValue) {
              window.open(newValue.assets.browser_download_url)
            }
          }}
          sx={{
            'width': 300,
            '& .MuiAutocomplete-popupIndicator': { color: theme.palette.text.disabled, transform: 'none' },
            '.MuiInputLabel-root': { color: theme.palette.text.disabled },
            '& .MuiInputBase-root': { color: theme.palette.text.disabled },
            '& .MuiInputBase-root:before': { content: 'none' },
            '& .MuiInputBase-root:after': { content: 'none' }
          }}
          renderInput={(params) => <TextField {...params} label='Search all downloads' variant='standard' sx={{ color: theme.palette.text.disabled }} />}
        />
      </Box>
      {assets && assetsO && (
        <OS
          assets={value === 0 ? assetsO : assets}
          variant={value === 1 ? 'core' : value === 2 ? 'client' : value === 3 ? 'CC' : undefined}
          official={value === 0}
        />
      )}
    </Box>
  )
}
