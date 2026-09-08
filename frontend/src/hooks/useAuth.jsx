import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (token) {
      try {
        const payloadStr = atob(token.split(".")[1])
        const payload = JSON.parse(payloadStr)
        if (!user) {
          setUser({ id: payload.sub, name: "User", email: "user@example.com" })
        }
      } catch (e) {
        console.error("Token decoding error", e)
      }
    } else {
      setUser(null)
    }
  }, [token])

  const login = (userToken, userData = null) => {
    setToken(userToken)
    localStorage.setItem("token", userToken)
    if (userData) {
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    }
  }

  const register = (userToken, userData = null) => {
    login(userToken, userData)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)