import { FunctionComponent } from 'react'
// import { SITE_NAME } from 'config'

type Props = {}

const Footer: FunctionComponent<Props> = () => (
  <footer className="flex items-center justify-center h-footer bg-bgDim">
    Powered by <span className="text-2xl">☕</span>
  </footer>
)

export default Footer
