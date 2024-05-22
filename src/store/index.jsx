import { create } from 'zustand'

const getLocalStorageAuth = () => {
  const auth = localStorage.getItem('auth')
  return auth
    ? JSON.parse(auth)
    : { token: null, apiKey: null, user: { venueManager: false } }
}

const setLocalStorageAuth = (authData) => {
  localStorage.setItem('auth', JSON.stringify(authData))
}

const useStore = create((set) => ({
  isOpen: false,
  isRegister: true,
  loginMessage: '',
  notification: { message: '', type: '' },
  openModal: (register = true) => set({ isOpen: true, isRegister: register }),
  closeModal: () => set({ isOpen: false, loginMessage: '' }),
  auth: getLocalStorageAuth(),
  setAuth: (authData) => {
    const currentAuth = getLocalStorageAuth()
    const updatedAuth = { ...currentAuth, ...authData }
    setLocalStorageAuth(updatedAuth)
    set({ auth: updatedAuth })
  },
  clearAuth: () => {
    set({ auth: { token: null, apiKey: null, user: { venueManager: false } } })
    localStorage.removeItem('auth')
  },

  // Error management
  errors: {},
  setErrors: (errors) =>
    set((state) => ({ errors: { ...state.errors, ...errors } })),
  clearErrors: () => set({ errors: {} }),
  setError: (field, error) =>
    set((state) => ({ errors: { ...state.errors, [field]: error } })),
  clearError: (field) =>
    set((state) => {
      const newErrors = { ...state.errors }
      delete newErrors[field]
      return { errors: newErrors }
    }),

  // Login message management
  setLoginMessage: (message) => set({ loginMessage: message }),

  // Notification management
  setNotification: (notification) => set({ notification }),
  clearNotification: () =>
    set({ notification: { message: '', type: 'success' } }),
}))

export default useStore
