import useStore from '@/store'

function Nav() {
  const { openModal } = useStore()

  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={openModal}
            className="text-primaryText hover:text-primary"
          >
            Register
          </button>
        </li>
        <li>
          <button
            onClick={openModal}
            className="text-primaryText hover:text-primary"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
