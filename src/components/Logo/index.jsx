import { FaTent } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <FaTent className="h-9 w-9 text-primary" />
      <span className="text-2xl font-poppins text-primary">Holidaze</span>
    </Link>
  )
}

export default Logo
