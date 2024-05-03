import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '@/store'
import { FaUserCircle } from 'react-icons/fa'

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
    navigate('/')
    setDropdownOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-primaryText hover:text-primary"
      >
        <FaUserCircle size="1.5em" />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
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
              className="block px-4 py-2 text-sm text-primaryText"
              onClick={() => setDropdownOpen(false)}
            >
              Add a Venue
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
