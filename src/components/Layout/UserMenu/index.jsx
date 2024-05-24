import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '@/store'
import { FaUserCircle, FaBars } from 'react-icons/fa'

function UserMenu() {
  const navigate = useNavigate()
  const { auth, clearAuth } = useStore((state) => ({
    auth: state.auth,
    clearAuth: state.clearAuth,
  }))

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    clearAuth()
    navigate('/', {
      state: {
        title: 'Logout Successful',
        message: 'Hope to see you again soon!',
        type: 'success',
      },
    })
    setDropdownOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-primaryText hover:text-primary"
        aria-label="User menu"
      >
        <FaBars size="1.4em" className="mr-2" />
        <FaUserCircle size="1.8em" />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-2 shadow-xl">
          <a
            href={`/profile/${auth.user.name}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setDropdownOpen(false)}
          >
            Profile
          </a>
          {auth.user.venueManager && (
            <Link
              to="/create-venue"
              className="block px-4 py-2 text-sm text-primaryText hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              Add a Venue
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
