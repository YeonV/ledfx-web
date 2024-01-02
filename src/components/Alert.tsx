import { Alert as MuiAlert, AlertTitle } from '@mui/material'

const Alert = () => {
  return (
    <MuiAlert severity='warning' color='info' sx={{ marginTop: 6 }}>
      <AlertTitle>Our binaries are not signed!</AlertTitle>
      Since we don't have a code signing certificate, you might get warnings.
      <br />
      Mac users need to allow through system preferences or terminal:
      <br />
      <br />
      <code style={{ background: '#000', color: '#fff', padding: '0.5rem 1rem', borderRadius: '5px' }}>sudo xattr -cr THEAPP.app</code>
    </MuiAlert>
  )
}

export default Alert
