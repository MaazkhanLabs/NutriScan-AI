import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const NavBar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, padding: "0.85rem 1.5rem" }}>
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: "1100px", 
          margin: "0 auto", 
          padding: "0.75rem 1.6rem", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderRadius: "9999px"
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <div style={{ 
            width: "38px", 
            height: "38px", 
            borderRadius: "10px", 
            background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: "1.2rem", 
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)" 
          }}>
            🥗
          </div>
          <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em" }}>
            NutriScan <span style={{ color: "#6366f1" }}>AI</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link 
            to="/" 
            style={{ 
              padding: "0.45rem 0.95rem", 
              borderRadius: "9999px", 
              textDecoration: "none", 
              fontWeight: isActive("/") ? 700 : 600, 
              fontSize: "0.92rem", 
              color: isActive("/") ? "#4f46e5" : "#475569", 
              background: isActive("/") ? "#eff6ff" : "transparent",
              transition: "all 0.2s ease"
            }}
          >
            Home
          </Link>

          {user ? (
            <>
              <Link 
                to="/scan" 
                style={{ 
                  padding: "0.45rem 0.95rem", 
                  borderRadius: "9999px", 
                  textDecoration: "none", 
                  fontWeight: isActive("/scan") ? 700 : 600, 
                  fontSize: "0.92rem", 
                  color: isActive("/scan") ? "#4f46e5" : "#475569", 
                  background: isActive("/scan") ? "#eff6ff" : "transparent",
                  transition: "all 0.2s ease"
                }}
              >
                📷 Scan Food
              </Link>
              <Link 
                to="/dashboard" 
                style={{ 
                  padding: "0.45rem 0.95rem", 
                  borderRadius: "9999px", 
                  textDecoration: "none", 
                  fontWeight: isActive("/dashboard") ? 700 : 600, 
                  fontSize: "0.92rem", 
                  color: isActive("/dashboard") ? "#4f46e5" : "#475569", 
                  background: isActive("/dashboard") ? "#eff6ff" : "transparent",
                  transition: "all 0.2s ease"
                }}
              >
                📊 Dashboard
              </Link>
              <Link 
                to="/history" 
                style={{ 
                  padding: "0.45rem 0.95rem", 
                  borderRadius: "9999px", 
                  textDecoration: "none", 
                  fontWeight: isActive("/history") ? 700 : 600, 
                  fontSize: "0.92rem", 
                  color: isActive("/history") ? "#4f46e5" : "#475569", 
                  background: isActive("/history") ? "#eff6ff" : "transparent",
                  transition: "all 0.2s ease"
                }}
              >
                📜 History
              </Link>

              <div style={{ width: "1px", height: "20px", background: "#cbd5e1", margin: "0 0.25rem" }} />

              <Link 
                to="/profile" 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.4rem", 
                  padding: "0.4rem 0.85rem", 
                  background: "linear-gradient(135deg, #e0e7ff 0%, #eff6ff 100%)", 
                  color: "#4338ca", 
                  borderRadius: "9999px", 
                  textDecoration: "none", 
                  fontWeight: 700, 
                  fontSize: "0.88rem",
                  border: "1px solid rgba(99, 102, 241, 0.2)"
                }}
              >
                <span>👤</span> {user.name || "Profile"}
              </Link>
              <button 
                onClick={logout} 
                style={{ 
                  padding: "0.4rem 0.85rem", 
                  background: "white", 
                  border: "1px solid #cbd5e1", 
                  borderRadius: "9999px", 
                  cursor: "pointer", 
                  color: "#64748b", 
                  fontWeight: 600, 
                  fontSize: "0.85rem" 
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginLeft: "0.5rem" }}>
              <Link 
                to="/login" 
                style={{ 
                  padding: "0.45rem 1.1rem", 
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", 
                  color: "white", 
                  textDecoration: "none", 
                  borderRadius: "9999px", 
                  fontWeight: 600, 
                  fontSize: "0.9rem",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)"
                }}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                style={{ 
                  padding: "0.45rem 1.1rem", 
                  background: "white", 
                  color: "#4f46e5", 
                  border: "1.5px solid #6366f1", 
                  textDecoration: "none", 
                  borderRadius: "9999px", 
                  fontWeight: 600, 
                  fontSize: "0.9rem" 
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}