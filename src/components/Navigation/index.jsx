import useStore from '@/store'
import UserMenu from '../UserMenu'
import Button from '@/lib/Buttons'
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
        <ul className="flex ">
          <li>
            <Button
              type="link-button"
              onClick={() => openModal(true)}
              className="flex items-center space-x-2"
            >
              <FaUserPlus />
              <span>Register</span>
            </Button>
          </li>
          <li>
            <Button
              type="link-button"
              onClick={() => openModal(false)}
              className="flex items-center space-x-2 "
            >
              <FaSignInAlt />
              <span>Login</span>
            </Button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Nav
