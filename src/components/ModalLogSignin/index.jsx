import { useState } from 'react'
import { Modal as ResponsiveModal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import RegisterForm from '../RegistrationForm'
import useApi from '@/services/Api'
import useModalStore from '@/store/ModalStore'

function Modal() {
  const { isOpen, closeModal } = useModalStore()
  const { sendRequest, isLoading, isError } = useApi()
  const [isRegister, setIsRegister] = useState(true)

  const handleRegister = async (data) => {
    const result = await sendRequest({
      url: 'https://v2.api.noroff.dev/auth/register',
      method: 'post',
      data,
    })
    if (result) {
      closeModal()
    }
  }

  return (
    <ResponsiveModal
      open={isOpen}
      onClose={closeModal}
      center
      overlayClassName="bg-gray-900 bg-opacity-50 fixed inset-0 z-40"
      modalClassName="bg-white rounded-lg p-6 mx-auto my-12 max-w-md shadow-lg"
      closeIconClassName="text-gray-500 hover:text-gray-800"
    >
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
        <div>Login Form Goes Here</div>
      )}
      {/* Loading and Error Handling */}
      {isLoading && <p>Loading...</p>}
      {isError && (
        <p className="text-red-500">An error occurred during registration.</p>
      )}
    </ResponsiveModal>
  )
}

export default Modal
