import { Alert as MuiAlert, AlertTitle, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import CodeBlock from './CodeBlock'
import mbedtls from '../assets/mbedtls'

const Alert = () => {
  return (
    <MuiAlert severity='warning' color='info' variant='outlined' sx={{ marginTop: 6 }}>
      <AlertTitle>ATTENTION: Our binaries are not signed!</AlertTitle>
      Since we don't have a code signing certificate, you might get warnings.
      <br />
      <h1>
        Mac users <span style={{ fontWeight: 100 }}>should read this</span>
      </h1>
      <Accordion sx={{ marginTop: 2 }}>
        <AccordionSummary>click to expand</AccordionSummary>
        <AccordionDetails>
          need to allow through system preferences or terminal:
          <br /> ( either replace THEAPP.app with the actual app name, or drag and drop the app into the terminal )
          <br />
          <CodeBlock code={'sudo xattr -cr THEAPP.app'} />
          <br />
          You also need to install python-mbedtls via brew: (we are using this for hue-support)
          <br />
          <CodeBlock code={mbedtls} />
          <br />
          Some users reported that they need to install aubio from brew aswell:
          <br />
          <CodeBlock code={'brew install aubio'} />
        </AccordionDetails>
      </Accordion>
    </MuiAlert>
  )
}

export default Alert
