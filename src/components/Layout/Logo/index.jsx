import { MdCabin } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex flex-col items-center">
      <MdCabin className="h-7 w-7 text-primary md:h-10 md:w-10" />
      <span className="font-poppins text-lg text-primary md:text-2xl">
        Holidaze
      </span>
    </Link>
  )
}

export default Logo
