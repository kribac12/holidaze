import { useState, useCallback, useEffect } from 'react'
import { Modal as ResponsiveModal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import RegisterForm from '../RegistrationForm'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../LoginForm'
import Notification from '../Notifications'
import useApi from '@/services/Api'
import useStore from '@/store'
import { fetchApiKey } from '@/services/Api/ApiKey'
import Loader from '../Loader'

function ModalLogSignin() {
  const {
    isOpen,
    isRegister,
    closeModal,
    setAuth,
    loginMessage,
    setLoginMessage,
  } = useStore((state) => ({
    isOpen: state.isOpen,
    isRegister: state.isRegister,
    closeModal: state.closeModal,
    setAuth: state.setAuth,
    loginMessage: state.loginMessage,
    setLoginMessage: state.setLoginMessage,
  }))
  const { sendRequest, isLoading, isError, clearError } = useApi()
  const navigate = useNavigate()
  const [notification, setNotification] = useState({ message: '', type: '' })

  const clearNotification = useCallback(() => {
    setNotification({ message: '', type: '' })
  }, [])

  useEffect(() => {
    if (!isOpen) {
      clearNotification()
      setLoginMessage('')
      clearError()
    }
  }, [isOpen, clearNotification, setLoginMessage, clearError])

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
      useStore.getState().openModal(false)
      setNotification({
        message: 'Registration successful, please log in.',
        type: 'success',
      })
    } catch (error) {
      console.error('Registration failed:', error)
      let errorMessage = 'Registration failed, please try again.'
      if (error.errors) {
        error.errors.forEach((err) => {
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
      setNotification({
        message:
          'Login failed: ' + (error.response?.data?.message || error.message),
        type: 'error',
      })
    }
  }

  const handleTabSwitch = (register) => {
    useStore.getState().openModal(register)
    clearNotification()
    setLoginMessage('')
    clearError()
  }

  const modalWidth = 'sm:w.full md:w-1/2 lg:w-1/3 xl:w-1/4'

  return (
    <ResponsiveModal
      open={isOpen}
      onClose={closeModal}
      center
      classNames={{
        modal: `bg-white rounded-lg mx-auto my-12 shadow-lg ${modalWidth}`,
        closeButton: 'text-gray-500 hover:text-gray-800',
      }}
    >
      <div className="relative w-full text-center">
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onDismiss={clearNotification}
          />
        )}
        {loginMessage && (
          <Notification
            message={loginMessage}
            type="error"
            onDismiss={() => setLoginMessage('')}
          />
        )}
      </div>
      <div className="tabs mb-4">
        <button
          onClick={() => handleTabSwitch(true)}
          className={`mr-2 px-4 py-2 rounded ${
            isRegister ? 'bg-primary text-white' : 'bg-transparent text-primary'
          }`}
        >
          Register
        </button>
        <button
          onClick={() => handleTabSwitch(false)}
          className={`px-4 py-2 rounded ${
            !isRegister
              ? 'bg-primary text-white'
              : 'bg-transparent text-primary'
          }`}
        >
          Login
        </button>
      </div>
      {isRegister ? (
        <RegisterForm onSubmit={handleRegister} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      {isLoading && <Loader />}
      {isError && (
        <p className="text-red-500">An error occurred during the operation.</p>
      )}
    </ResponsiveModal>
  )
}

export default ModalLogSignin
