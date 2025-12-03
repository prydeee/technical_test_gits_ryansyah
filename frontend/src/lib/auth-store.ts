import { create } from "zustand"
import axios from "axios"

type User = {
  id: number
  name: string
  email: string
}

type AuthStore = {
  user: User | null
  token: string | null
  isLoading: boolean
  isInitialized: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isInitialized: false,

  login: async (email: string, password: string) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email,
        password,
      })

      const { user, token } = res.data

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token)
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      set({ user, token, isLoading: false })
    } catch (error) {
      throw error
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
    delete axios.defaults.headers.common["Authorization"]
    set({ user: null, token: null, isLoading: false })
  },

  checkAuth: () => {
    if (typeof window === "undefined") {
      return
    }

    set({ isLoading: true })

    const token = localStorage.getItem("token")

    if (!token) {
      set({ user: null, token: null, isLoading: false, isInitialized: true })
      return
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      .then((res) => {
        set({ user: res.data, token, isLoading: false, isInitialized: true })
      })
      .catch(() => {
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["Authorization"]
        set({ user: null, token: null, isLoading: false, isInitialized: true })
      })
  },
}))