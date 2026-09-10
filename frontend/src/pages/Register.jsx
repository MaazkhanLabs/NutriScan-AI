import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate, useLocation, Link } from "react-router-dom"

export const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const fromPage = location.state?.from?.pathname || "/scan"

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMsg("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      const data = await response.json()
      if (response.ok) {
        register(data.access_token, data.user || { name, email })
        navigate(fromPage, { replace: true })
      } else {
        setErrorMsg(data.detail || "Registration failed")
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
          <Link to="/login" style={{ flex: 1, textAlign: "center", padding: "0.65rem", color: "#64748b", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" }}>
            Login
          </Link>
          <div style={{ flex: 1, textAlign: "center", padding: "0.65rem", background: "white", borderRadius: "8px", color: "#4f46e5", fontWeight: "800", fontSize: "0.95rem", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
            Sign Up
          </div>
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "0.4rem", fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>Create an Account ✨</h2>
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.92rem", marginBottom: "1.8rem" }}>
          Sign up to start scanning foods, ingredients, and tracking meal nutrition.
        </p>

        {errorMsg && (
          <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", color: "#e11d48", padding: "0.8rem", borderRadius: "10px", marginBottom: "1.2rem", fontSize: "0.9rem", textAlign: "center", fontWeight: 600 }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.88rem", color: "#475569", fontWeight: 700 }}>Full Name</label>
            <input
              type="text"
              placeholder="enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="create a password"
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
            {loading ? "Creating Account..." : "Create Account & Start"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.8rem", color: "#64748b", fontSize: "0.92rem" }}>
          Already have an account? <Link to="/login" style={{ color: "#4f46e5", fontWeight: 700, textDecoration: "none" }}>Login here</Link>
        </p>
      </div>
    </div>
  )
}