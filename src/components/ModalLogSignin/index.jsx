import { useState, useCallback } from 'react'
import { Modal as ResponsiveModal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import RegisterForm from '../RegistrationForm'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'
import Notification from '../Notifications'
import useApi from '@/services/Api'
import useStore from '@/store'
import { fetchApiKey } from '@/services/Api/ApiKey'

function ModalLogSignin() {
  const { isOpen, closeModal, setAuth } = useStore((state) => ({
    isOpen: state.isOpen,
    closeModal: state.closeModal,
    setAuth: state.setAuth,
  }))
  const { sendRequest, isLoading, isError } = useApi()
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(true)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const clearNotification = useCallback(() => {
    setNotification({ message: '', type: '' })
  }, [])

  const handleRegister = async (data) => {
    const { avatar, banner, ...otherData } = data
    const formattedData = {
      ...otherData,
      ...(avatar.url && { avatar: { url: avatar.url, alt: avatar.alt || '' } }),
      ...(banner.url && { banner: { url: banner.url, alt: banner.alt || '' } }),
    }

    try {
      const result = await sendRequest({
        url: 'https://v2.api.noroff.dev/auth/register',
        method: 'post',
        data: formattedData,
      })
      setAuth({ user: result.data })
      setIsRegister(false)
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

      if (!loginResponse || !loginResponse.data) {
        throw new Error('Invalid login response')
      }

      useStore.getState().setAuth({
        token: loginResponse.data.accessToken,
        user: loginResponse.data,
      })

      await fetchApiKey(loginResponse.data.accessToken)

      closeModal()

      navigate(`/profile/${loginResponse.data.name}`)
    } catch (error) {
      console.error('Login failed:', error.response?.data || error)
      // Display an error message to the user
      alert('Login failed: ' + (error.response?.data?.message || error.message))
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
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={clearNotification}
          className="absolute top-0 w-full text-center"
        />
      )}
      <div className="tabs mb-4">
        <button
          onClick={() => setIsRegister(true)}
          className={`mr-2 px-4 py-2 rounded ${isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
        >
          Register
        </button>
        <button
          onClick={() => setIsRegister(false)}
          className={`px-4 py-2 rounded ${!isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
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
