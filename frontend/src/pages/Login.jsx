import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        login(data.access_token, data.user)
        navigate("/dashboard")
      } else {
        alert(data.detail || "Login failed")
      }
    } catch (error) {
      alert("Error connecting to server")
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "3rem auto", padding: "2rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ background: "#3f51b5", color: "white", padding: "0.8rem", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}>
          Login
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#64748b" }}>
        Don't have an account? <a href="/register" style={{ color: "#3f51b5", textDecoration: "none" }}>Register here</a>
      </p>
    </div>
  )
}