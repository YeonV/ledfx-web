import { Box, Link, Typography } from '@mui/material'

const Links = () => {
  return (
    <Box sx={{ width: '100%', paddingTop: 1 }}>
      <Typography variant='h6'>Links:</Typography>
      <Link href='https://preview.ledfx.app/'>Preview</Link>&nbsp;|&nbsp;
      <Link href='https://ledfx.readthedocs.io/en/stable/'>Docs</Link>&nbsp;|&nbsp;
      <Link href='https://yeonv.github.io/LedFx-Frontend-v2/docs/'>Frontend Docs</Link>&nbsp;|&nbsp;
      <Link href='https://discord.gg/3VNXqjTX6A'>Discord</Link>&nbsp;|&nbsp;
      <Link href='https://ledfx.app/'>Website</Link>&nbsp;|&nbsp;
      <Link href='https://pypi.org/project/ledfx/'>PyPi</Link>
      <Typography variant='h6'>Source Code:</Typography>
      <Link href='https://github.com/LedFx/LedFx/'>Backend</Link>&nbsp;|&nbsp;
      <Link href='https://github.com/YeonV/LedFx-Frontend-v2'>Frontend </Link>&nbsp;|&nbsp;
      <Link href='https://github.com/YeonV/home-assistant-addons'>HomeAssistant Addon </Link>
    </Box>
  )
}
export default Links
