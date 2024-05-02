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

  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen) // Toggles the dropdown's visibility
  }

  const handleLogout = () => {
    clearAuth() // Clears the authentication state
    navigate('/') // Redirects to the homepage
    setDropdownOpen(false) // Ensures the dropdown is closed after logout
  }
  console.log('User role:', auth.user.venueManager) // Debug: Check the user's role in the console

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

          <Link
            to="/create-venue"
            className="block px-4 py-2 text-sm text-blue-500 hover:text-blue-700"
            onClick={() => setDropdownOpen(false)}
          >
            Add a Venue
          </Link>

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
