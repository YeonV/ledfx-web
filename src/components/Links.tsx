import { Box, Link, Typography } from '@mui/material'

const Links = () => {
  return (
    <Box sx={{ width: '100%', paddingTop: 1 }}>
      <Typography variant='h6'>Links:</Typography>
      <Link target='_blank' href='https://ledfx.stream/'>Preview</Link>&nbsp;|&nbsp;
      <Link target='_blank' href='https://docs.ledfx.app/en/latest/'>Docs</Link>&nbsp;|&nbsp;
      <Link target='_blank' href='https://docs.ledfx.stream/'>Frontend Docs</Link>&nbsp;|&nbsp;
      <Link target='_blank' href='https://typedoc.ledfx.stream//'>TypeDoc</Link>&nbsp;|&nbsp;
      <Link target='_blank' href='https://discord.gg/3VNXqjTX6A'>Discord</Link>&nbsp;|&nbsp;
      <Link target='_blank' href='https://pypi.org/project/ledfx/'>PyPi</Link>
      <Typography variant='h6'>Source Code:</Typography>
      <Link target='_blank' href='https://github.com/LedFx/LedFx/'>Backend</Link>&nbsp;|&nbsp;
      <Link target='_blank' href='https://github.com/YeonV/LedFx-Frontend-v2'>Frontend </Link>&nbsp;|&nbsp;
      <Link target='_blank' href='https://github.com/YeonV/home-assistant-addons'>HomeAssistant Addon </Link>
    </Box>
  )
}
export default Links
