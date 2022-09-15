import { FunctionComponent } from 'react'
type Props = {}

const Footer: FunctionComponent<Props> = () => (
  <footer className="flex items-center justify-center h-footer bg-bgDim">
    Powered by <span className="text-2xl">☕</span>
  </footer>
)

export default Footer
