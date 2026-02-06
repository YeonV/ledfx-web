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
      const res = await fetch('https://api.github.com/repos/YeonV/LedFx-Builds/releases')
      const releases_with_pre = await res.json()
      const releases: ReleaseType[] = releases_with_pre.filter((r: ReleaseType) => r.prerelease === false)
      
      // Get the latest release using the /latest endpoint
      const latestRes = await fetch('https://api.github.com/repos/YeonV/LedFx-Builds/releases/latest')
      const latestRelease: ReleaseType = await latestRes.json()
      
      // Move latest to the front of the array
      const sortedReleases = [
        latestRelease,
        ...releases.filter(r => r.tag_name !== latestRelease.tag_name)
      ]
      setReleases(sortedReleases)
      
      const resO = await fetch('https://api.github.com/repos/LedFx/LedFx/releases')
      const releases_with_preO = await resO.json()
      const releasesO: ReleaseType[] = releases_with_preO.filter((r: ReleaseType) => r.prerelease === false)
      setReleasesO(releasesO)
    }
    get()
  }, [mirror, version])

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
