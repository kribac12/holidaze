import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create(
  devtools((set) => ({
    // Include modal open/close state
    isOpen: false,
    isRegister: true, // true for register form, false for login form
    openModal: (register = true) => set({ isOpen: true, isRegister: register }),
    closeModal: () => set({ isOpen: false }),

    // Authentication state
    auth: { token: null, apiKey: null, user: null },
    setAuth: (authData) =>
      set((state) => ({
        auth: { ...state.auth, ...authData },
      })),
    clearAuth: () => set({ auth: { token: null, apiKey: null, user: null } }),
  }))
)

useStore.subscribe(
  (state) => console.log('Auth state changed:', state.auth),
  (state) => state.auth
)

export default useStore
