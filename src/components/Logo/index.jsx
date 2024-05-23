import { MdCabin } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex flex-col items-center">
      <MdCabin className="h-7 w-7 md:h-10 md:w-10 text-primary" />
      <span className="text-lg md:text-2xl font-poppins text-primary">
        Holidaze
      </span>
    </Link>
  )
}

export default Logo
