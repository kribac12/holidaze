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
  openModal: (register = true) => set({ isOpen: true, isRegister: register }),
  closeModal: () => set({ isOpen: false }),
  auth: getLocalStorageAuth(),
  setAuth: (authData) => {
    const newAuth = { ...getLocalStorageAuth(), ...authData }
    setLocalStorageAuth(newAuth)
    set({ auth: newAuth })
  },
  clearAuth: () => {
    set({ auth: { token: null, apiKey: null, user: { venueManager: false } } })
    localStorage.removeItem('auth')
  },
}))

export default useStore
