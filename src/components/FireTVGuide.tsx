import { useState } from 'react'
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  StepContent,
  Paper,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'
import HelpIcon from '@mui/icons-material/Help'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'
import { forwardRef } from 'react'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const downloaderSteps = [
  {
    label: 'Enter Download Code in Downloader App',
    description: `Open the Downloader app and enter the 7-digit code shown below to download LedFx for Fire TV.`,
    showCode: true
  },
  {
    label: 'Install the APK',
    description: `Once downloaded, the Downloader app will prompt you to install the APK. Click "Install" and wait for the installation to complete.`
  },
  {
    label: 'Enable Audio Recording Permission',
    description: `Go to Settings > Applications > Manage Installed Applications > LedFx > Permissions and enable "Record audio". This allows LedFx to react to music.`
  },
  {
    label: 'Enable In-App Updates (Optional)',
    description: `Go to Settings > My Fire TV > Developer Options and enable "Install unknown apps" for LedFx. This allows the app to update itself in the future.`
  },
  {
    label: 'Launch LedFx',
    description: `You can now find LedFx in your Apps section. Launch it and enjoy controlling your LED effects!`
  }
]

const adbSteps = [
  {
    label: 'Enable Developer Options on Fire TV',
    description: `Go to Settings > My Fire TV > About and click on the Fire TV device name 7 times to enable Developer Options.`
  },
  {
    label: 'Enable ADB Debugging',
    description: `Go to Settings > My Fire TV > Developer Options and turn on "ADB debugging" and "Apps from Unknown Sources".`
  },
  {
    label: 'Find Your Fire TV IP Address',
    description: `Go to Settings > My Fire TV > About > Network to find your Fire TV's IP address. You'll need this for the next step.`
  },
  {
    label: 'Install ADB on Your Computer',
    description: `Download and install Android Debug Bridge (ADB) on your computer. You can get it from the Android SDK Platform Tools.`
  },
  {
    label: 'Connect via ADB',
    description: `Open a terminal/command prompt and run: adb connect [YOUR_FIRE_TV_IP]:5555`,
    showCode: true
  },
  {
    label: 'Install the APK',
    description: `Download the APK to your computer and run: adb install path/to/LedFx.apk`
  },
  {
    label: 'Enable Audio Recording Permission',
    description: `Go to Settings > Applications > Manage Installed Applications > LedFx > Permissions and enable "Record audio". This allows LedFx to react to music.`
  },
  {
    label: 'Enable In-App Updates (Optional)',
    description: `Go to Settings > My Fire TV > Developer Options and enable "Install unknown apps" for LedFx. This allows the app to update itself in the future.`
  },
  {
    label: 'Launch LedFx',
    description: `You can now find LedFx in your Apps section. Launch it and enjoy controlling your LED effects!`
  }
]

export default function FireTVGuide({ downloadCode }: { downloadCode?: string | null }) {
  const [open, setOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [installMethod, setInstallMethod] = useState<'downloader' | 'adb' | null>(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setActiveStep(0)
    setInstallMethod(null)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    setInstallMethod(null)
  }

  const handleMethodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMethod: 'downloader' | 'adb' | null
  ) => {
    if (newMethod !== null) {
      setInstallMethod(newMethod)
    }
  }

  const steps = installMethod === 'adb' ? adbSteps : downloaderSteps

  return (
    <>
      <IconButton color="primary" onClick={handleClickOpen} aria-label="Fire TV Setup Guide">
        <HelpIcon />
      </IconButton>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Fire TV Setup Guide
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ maxWidth: 800, margin: '2rem auto', padding: '0 2rem', width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            How to Install LedFx on Fire TV
          </Typography>

          {!installMethod ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, mt: 6 }}>
              <Typography variant="h5" gutterBottom>
                Choose Your Installation Method
              </Typography>
              <ToggleButtonGroup
                value={installMethod}
                exclusive
                onChange={handleMethodChange}
                orientation="vertical"
                sx={{ width: '100%', maxWidth: 400 }}
              >
                <ToggleButton value="downloader" sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <CloudDownloadIcon fontSize="large" />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="h6">Install via Downloader App</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Easiest method - Install directly on Fire TV
                      </Typography>
                    </Box>
                  </Box>
                </ToggleButton>
                <ToggleButton value="adb" sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <DeveloperModeIcon fontSize="large" />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="h6">Install via ADB</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Advanced method - Install from your computer
                      </Typography>
                    </Box>
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          ) : (
            <>
              {downloadCode && installMethod === 'downloader' && (
                <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                  <Typography variant="h6" gutterBottom>
                    Download Code:
                  </Typography>
                  <Typography variant="h2" sx={{ fontFamily: 'monospace', letterSpacing: 4 }}>
                    {downloadCode}
                  </Typography>
                </Paper>
              )}

              <Button onClick={() => setInstallMethod(null)} sx={{ mb: 3 }}>
                ← Change Installation Method
              </Button>

              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      <Typography variant="h6">{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {step.description}
                      </Typography>
                      {step.showCode && downloadCode && installMethod === 'downloader' && (
                        <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'action.hover' }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Enter this code in the Downloader app:
                          </Typography>
                          <Typography variant="h4" sx={{ fontFamily: 'monospace', letterSpacing: 2 }}>
                            {downloadCode}
                          </Typography>
                        </Paper>
                      )}
                      <Box sx={{ mb: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    All steps completed - you're ready to use LedFx!
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset Guide
                  </Button>
                  <Button onClick={handleClose} variant="contained" sx={{ mt: 1, mr: 1 }}>
                    Close
                  </Button>
                </Paper>
              )}
            </>
          )}
        </Box>
      </Dialog>
    </>
  )
}
