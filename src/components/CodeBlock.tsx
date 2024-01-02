import { Check, CopyAll } from '@mui/icons-material'
import { Fab } from '@mui/material'
import useClipboard from 'react-use-clipboard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CodeBlock({ code }: { code: any }) {
  const [isCopied, setCopied] = useClipboard(code, {
    successDuration: 2000
  })

  return (
    <code style={{ position: 'relative', display: 'block' }}>
      <Fab sx={{ position: 'absolute', right: 16, top: 16, zIndex: 10 }} onClick={setCopied}>
        {isCopied ? <Check /> : <CopyAll />}
      </Fab>
      <pre style={{ padding: '28px 96px 32px 32px', overflowX: 'auto' }}>{code}</pre>
    </code>
  )
}

export default CodeBlock
