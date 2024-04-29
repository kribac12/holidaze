import { useState } from 'react'
import { Modal as ResponsiveModal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import RegisterForm from '../RegistrationForm'
import LoginForm from '../LoginForm'
import Notification from '../Notifications'
import useApi from '@/services/Api'
import useModalStore from '@/store/ModalStore'

function ModalLogSignin() {
  const { isOpen, closeModal } = useModalStore()
  const { sendRequest, isLoading, isError, setAuth } = useApi()
  const [isRegister, setIsRegister] = useState(true)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const handleRegister = async (data) => {
    const { avatar, banner, ...otherData } = data

    // Only add avatar and banner to payload if their URLs are provided
    const payload = {
      ...otherData,
      ...(avatar.url && { avatar: { url: avatar.url, alt: avatar.alt || '' } }),
      ...(banner.url && { banner: { url: banner.url, alt: banner.alt || '' } }),
    }

    try {
      const result = await sendRequest({
        url: 'https://v2.api.noroff.dev/auth/register',
        method: 'post',
        data: payload,
      })
      setAuth({ user: result.data })
      setIsRegister(false) // Switch to login tab
      setNotification({
        message: 'Registration successful, please log in.',
        type: 'success',
      })
    } catch (error) {
      console.error('Registration failed:', error)
      let errorMessage = 'Registration failed, please try again.'
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          console.error(
            `Error in ${err.path ? err.path.join('.') : 'request'}: ${err.message}`
          )

          errorMessage += ` ${err.message}`
        })
      }
      setNotification({ message: errorMessage, type: 'error' })
    }
  }

  const handleLogin = async (loginData) => {
    try {
      const loginResponse = await sendRequest({
        url: 'https://v2.api.noroff.dev/auth/login',
        method: 'post',
        data: loginData,
      })
      setAuth({ token: loginResponse.data.accessToken })
      closeModal()
    } catch (error) {
      console.error('Login failed:', error.response.data)
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          console.error(`Error: ${err.message}`)
        })
      }
    }
  }

  return (
    <ResponsiveModal
      open={isOpen}
      onClose={closeModal}
      center
      overlayClassName="bg-gray-900 bg-opacity-50 fixed inset-0 z-40"
      modalClassName="bg-white rounded-lg p-6 mx-auto my-12 max-w-md shadow-lg custom-modal-padding"
      closeIconClassName="text-gray-500 hover:text-gray-800"
    >
      {notification.message && notification.type && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="tabs mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
        <button
          className={`px-4 py-2 rounded ${!isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
          onClick={() => setIsRegister(false)}
        >
          Login
        </button>
      </div>
      {isRegister ? (
        <RegisterForm onSubmit={handleRegister} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      {/* Loading and Error Handling */}
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-red-500">An error occurred during the operation.</p>
      )}
    </ResponsiveModal>
  )
}
export default ModalLogSignin
