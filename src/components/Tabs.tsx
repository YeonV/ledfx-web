import * as React from 'react'
import MuiTabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import OS from './OS'
import { ReleaseType } from '../App'

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Tabs({ releases, mirror, version }: { releases: ReleaseType[]; mirror: 'Official' | 'Unofficial'; version: string }) {
  const [value, setValue] = React.useState(0)
  console.log(mirror)
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const assets = releases.find((r) => r.tag_name === version)?.assets

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab wrapped label='LedFx (core)' {...a11yProps(0)} />
          <Tab wrapped label='Client (beta)' {...a11yProps(1)} />
          <Tab wrapped label='CC (beta)' {...a11yProps(2)} />
        </MuiTabs>
      </Box>

      {assets && <OS assets={assets} variant={value === 0 ? 'core' : value === 1 ? 'client' : 'CC'} />}
    </Box>
  )
}
