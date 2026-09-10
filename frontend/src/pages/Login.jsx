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
    <div style={{ maxWidth: "460px", margin: "3rem auto", padding: "0 1rem" }}>
      <div className="glass-card" style={{ padding: "2.5rem 2rem" }}>
        {/* Login / Register Tab Header */}
        <div style={{ display: "flex", background: "#f1f5f9", padding: "0.35rem", borderRadius: "12px", marginBottom: "2rem", border: "1px solid #e2e8f0" }}>
          <div style={{ flex: 1, textAlign: "center", padding: "0.65rem", background: "white", borderRadius: "8px", color: "#4f46e5", fontWeight: "800", fontSize: "0.95rem", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
            Login
          </div>
          <Link to="/register" style={{ flex: 1, textAlign: "center", padding: "0.65rem", color: "#64748b", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" }}>
            Sign Up
          </Link>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "0.4rem", fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>Welcome Back 👋</h2>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.92rem", marginBottom: "1.8rem" }}>
          Please sign in to access food scanning & health analysis.
        </p>

        {errorMsg && (
          <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#e11d48", padding: "0.8rem", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.9rem", textAlign: "center", fontWeight: 600 }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.88rem", color: "#475569", fontWeight: 700 }}>Email Address</label>
            <input
              type="email"
              placeholder="enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.88rem", color: "#475569", fontWeight: 700 }}>Password</label>
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "0.95rem",
              borderRadius: "12px",
              fontSize: "1.05rem",
              marginTop: "0.5rem"
            }}
          >
            {loading ? "Signing in..." : "Login & Continue"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.8rem", color: "#64748b", fontSize: "0.92rem" }}>
          Don't have an account? <Link to="/register" style={{ color: "#4f46e5", fontWeight: 700, textDecoration: "none" }}>Sign Up here</Link>
        </p>
      </div>
    </div>
  )
}