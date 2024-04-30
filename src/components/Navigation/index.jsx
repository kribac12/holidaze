import useStore from '@/store'
import UserMenu from '../UserMenu'

function Nav() {
  const { auth, openModal } = useStore((state) => ({
    auth: state.auth,
    openModal: state.openModal,
  }))

  return (
    <nav>
      {auth.token ? (
        <UserMenu />
      ) : (
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => openModal(true)}
              className="text-primaryText hover:text-primary"
            >
              Register
            </button>
          </li>
          <li>
            <button
              onClick={() => openModal(false)}
              className="text-primaryText hover:text-primary"
            >
              Login
            </button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Nav
