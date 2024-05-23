import useStore from '@/store'
import UserMenu from '../UserMenu'
import Button from '@/components/Shared/Buttons'
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa'

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
        <ul className="flex">
          <li>
            <Button
              type="link-button"
              onClick={() => openModal(true)}
              className="flex items-center space-x-2"
            >
              <FaUserPlus />
              <span className="text-base md:text-lg">Register</span>
            </Button>
          </li>
          <li>
            <Button
              type="link-button"
              onClick={() => openModal(false)}
              className="flex items-center space-x-2 "
            >
              <FaSignInAlt />
              <span
                className="text-base md:text-lg
            "
              >
                Login
              </span>
            </Button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Nav
