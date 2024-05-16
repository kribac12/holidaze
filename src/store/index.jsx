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
  openModal: (register = true) => set({ isOpen: true, isRegister: register }),
  closeModal: () => set({ isOpen: false, loginMessage: '' }),
  auth: getLocalStorageAuth(),
  setAuth: (authData) => {
    // Fetch the current auth state from local storage to ensure all data is up-to-date
    const currentAuth = getLocalStorageAuth()
    // Merge the current auth state with the new data
    const updatedAuth = { ...currentAuth, ...authData }
    // Update the local storage with the new auth state
    setLocalStorageAuth(updatedAuth)
    // Update the Zustand store with the new auth state
    set({ auth: updatedAuth })
  },
  clearAuth: () => {
    // Reset the auth state in the store and clear local storage
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
}))

export default useStore
