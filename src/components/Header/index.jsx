import Logo from '../Logo'
import Nav from '../Navigation'

function Header() {
  return (
    <header className="bg-cardBg text-white py-4 mb-2 px-6 flex justify-between items-center">
      <div className="container mx-auto flex justify-between">
        <Logo />
        <Nav />
      </div>
    </header>
  )
}

export default Header
