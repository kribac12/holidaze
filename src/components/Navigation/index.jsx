import useModalStore from '@/store/ModalStore'

function Nav() {
  const { openModal } = useModalStore()

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
