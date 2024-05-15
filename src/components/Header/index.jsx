import Logo from '../Logo'
import Nav from '../Navigation'

function Header() {
  return (
    <header className="bg-cardBg text-white p-4 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <Nav />
      </div>
    </header>
  )
}

export default Header
