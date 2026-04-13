import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: {
    email: '',
    role: '',
    name: '',
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: { email: '', role: '', name: '' } }),
}))

export default useUserStore