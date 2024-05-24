import Logo from '../Logo'
import Nav from '../Navigation'

function Header() {
  return (
    <header className="mb-2 bg-cardBg p-3 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <Nav />
      </div>
    </header>
  )
}

export default Header
