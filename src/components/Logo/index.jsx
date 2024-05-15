import { MdCabin } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <MdCabin className="h-9 w-9 text-primary" />
      <span className="text-2xl font-poppins text-primary">Holidaze</span>
    </Link>
  )
}

export default Logo
