import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const NavBar = () => {
  const { user, logout } = useAuth()

  return (
    <nav style={{ background: "white", padding: "1rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#3f51b5", textDecoration: "none" }}>
        NutriScan AI 🥗
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <Link to="/" style={{ color: "#475569", textDecoration: "none", fontWeight: 500 }}>Home</Link>
        
        {user ? (
          <>
            <Link to="/scan" style={{ color: "#475569", textDecoration: "none", fontWeight: 500 }}>Scan Food</Link>
            <Link to="/dashboard" style={{ color: "#475569", textDecoration: "none", fontWeight: 500 }}>Dashboard</Link>
            <Link to="/history" style={{ color: "#475569", textDecoration: "none", fontWeight: 500 }}>History</Link>
            <Link to="/profile" style={{ color: "#3f51b5", textDecoration: "none", fontWeight: 600, background: "#eef2ff", padding: "0.4rem 0.8rem", borderRadius: "6px" }}>
              👤 {user.name || "Profile"}
            </Link>
            <button 
              onClick={logout} 
              style={{ padding: "0.4rem 0.9rem", background: "transparent", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", color: "#64748b", fontWeight: 500 }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ padding: "0.5rem 1.2rem", background: "#3f51b5", color: "white", textDecoration: "none", borderRadius: "6px", fontWeight: 600 }}>
              Login
            </Link>
            <Link to="/register" style={{ padding: "0.5rem 1.2rem", background: "white", color: "#3f51b5", border: "1.5px solid #3f51b5", textDecoration: "none", borderRadius: "6px", fontWeight: 600 }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}