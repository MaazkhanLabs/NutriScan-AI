import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, useLocation, Link } from "react-router-dom"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const fromPage = location.state?.from?.pathname || "/scan"

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        login(data.access_token, data.user)
        navigate(fromPage, { replace: true })
      } else {
        setErrorMsg(data.detail || "Invalid email or password")
      }
    } catch (error) {
      setErrorMsg("Error connecting to server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "440px", margin: "3rem auto", padding: "2.5rem 2rem", background: "white", borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
      {/* Login / Register Tab Header */}
      <div style={{ display: "flex", borderBottom: "2px solid #e2e8f0", marginBottom: "2rem" }}>
        <div style={{ flex: 1, textAlign: "center", paddingBottom: "0.75rem", borderBottom: "3px solid #3f51b5", color: "#3f51b5", fontWeight: "bold", fontSize: "1.1rem" }}>
          Login
        </div>
        <Link to="/register" style={{ flex: 1, textAlign: "center", paddingBottom: "0.75rem", color: "#64748b", textDecoration: "none", fontWeight: 500, fontSize: "1.1rem" }}>
          Sign Up
        </Link>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "0.5rem", color: "#1e293b" }}>Welcome Back 👋</h2>
      <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
        Please sign in to access food scanning & health analysis.
      </p>

      {errorMsg && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "0.8rem", borderRadius: "6px", marginBottom: "1rem", fontSize: "0.9rem", textAlign: "center" }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.9rem", color: "#475569", fontWeight: 600 }}>Email Address</label>
          <input
            type="email"
            placeholder="enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.8rem", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "1rem", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.9rem", color: "#475569", fontWeight: 600 }}>Password</label>
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.8rem", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "1rem", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#94a3b8" : "#3f51b5",
            color: "white",
            padding: "0.9rem",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "0.5rem"
          }}
        >
          {loading ? "Signing in..." : "Login & Continue"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#64748b", fontSize: "0.95rem" }}>
        Don't have an account? <Link to="/register" style={{ color: "#3f51b5", fontWeight: 600, textDecoration: "none" }}>Sign Up here</Link>
      </p>
    </div>
  )
}