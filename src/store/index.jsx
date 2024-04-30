import { create } from 'zustand'

// Helper functions to manage localStorage
const getLocalStorageAuth = () => {
  const auth = localStorage.getItem('auth')
  return auth ? JSON.parse(auth) : { token: null, apiKey: null, user: null }
}

const setLocalStorageAuth = (authData) => {
  localStorage.setItem('auth', JSON.stringify(authData))
}

const useStore = create((set) => ({
  isOpen: false,
  isRegister: true, // true for register form, false for login form
  openModal: (register = true) => set({ isOpen: true, isRegister: register }),
  closeModal: () => set({ isOpen: false }),

  // Authentication state
  auth: getLocalStorageAuth(),
  setAuth: (authData) =>
    set((state) => {
      // Update the state and localStorage
      const newAuth = { ...state.auth, ...authData }
      setLocalStorageAuth(newAuth)
      return { auth: newAuth }
    }),
  clearAuth: () => {
    set({ auth: { token: null, apiKey: null, user: null } })
    localStorage.removeItem('auth')
  },
}))

export default useStore
