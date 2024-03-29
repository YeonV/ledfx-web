import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from '@mui/material'
import venv from '../assets/venv.ts'
import { pip, pypi } from '../assets/pip.ts'
import hass from '../assets/hass.ts'
import { useState } from 'react'
import docker from '../assets/docker-compose.yml'
import CodeBlock from './CodeBlock.tsx'
import yaml from 'js-yaml'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Additionals() {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', paddingTop: 7 }}>
      <Typography variant='h6'>Other Environments:</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='pip' {...a11yProps(0)} />
          <Tab label='HomeAssistant' {...a11yProps(1)} />
          <Tab label='Docker (outdated)' {...a11yProps(2)} />
          <Tab label='Raspberry PI' {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Link href='https://pypi.org/project/ledfx/'>PyPi</Link> (Latest stable release)
        <CodeBlock code={pypi} />
        To enable hue-support:
        <CodeBlock code={'pip install ledfx[hue]'} />
        From source
        <CodeBlock code={pip} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Link href='https://github.com/YeonV/home-assistant-addons/'>HomeAssistant Add-on</Link>: add this repo to Home Assistant:
        <CodeBlock code={hass} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Docker-compose:
        <CodeBlock code={yaml.dump(docker)} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        VENV on Raspberry PI OS:
        <CodeBlock code={venv} />
      </CustomTabPanel>
    </Box>
  )
}

// import { Button, Collapse, Link } from '@mui/material'
// import { useState } from 'react'

// const Additionals = () => {
//   const [open, setOpen] = useState(false)
//   return (
//     <>
//       <Button onClick={() => setOpen(!open)} sx={{ marginTop: 2 }} variant='outlined'>
//         Additional information
//       </Button>
//       <Collapse in={open}>

//         <br />
//         <br />

//         <br />
//         <br />

//         <Link href='https://discord.gg/3VNXqjTX6A/'>Discord</Link>
//       </Collapse>
//     </>
//   )
// }

// export default Additionals
