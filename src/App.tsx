import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useMemo, useState } from 'react'
import TopBar from './components/TopBar'
import Tabs from './components/Tabs'
import Alert from './components/Alert'
import { Box, Typography } from '@mui/material'
import Additionals from './components/Additional'
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
}

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light')
  const [releases, setReleases] = useState<ReleaseType[]>([])
  const [version, setVersion] = useState<string>(releases[0]?.tag_name || '')
  const [mirror, setMirror] = useState<'Official' | 'Unofficial'>('Unofficial')

  const isAndroid = getMobileOperatingSystem() === 'Android'
  const isIOS = getMobileOperatingSystem() === 'iOS'

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
      const res =
        mirror === 'Unofficial'
          ? await fetch('https://api.github.com/repos/YeonV/LedFx-Builds/releases')
          : await fetch('https://api.github.com/repos/LedFx/LedFx/releases')
      const releases_with_pre = await res.json()
      // console.log(releases_with_pre)
      const releases: ReleaseType[] = releases_with_pre.filter((r: ReleaseType) => r.prerelease === false)
      setReleases(releases)
    }
    get()
  }, [mirror, version])

  useEffect(() => {
    version === '' && setVersion(releases[0]?.tag_name || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releases])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ width: '100%', maxWidth: 1240, margin: '2rem auto', padding: '50px 20px 50px' }}>
        <TopBar mode={mode} setMode={setMode} releases={releases} version={version} setVersion={setVersion} mirror={mirror} setMirror={setMirror} />
        {!isAndroid && !isIOS && (
          <>
            <Tabs releases={releases} mirror={mirror} version={version} />
            <Alert />
            <Additionals />
          </>
        )}
        {(isAndroid || isIOS) && (
          <Typography marginBottom={5} variant='h6'>
            You need Windows, macOS or Linux to run LedFx.
          </Typography>
        )}
        <Links />
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
