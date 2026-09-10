import React from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div style={{ maxWidth: "500px", margin: "4rem auto", padding: "0 1rem" }}>
        <div className="glass-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
          <h2>User Profile</h2>
          <p style={{ margin: "1rem 0", color: "#64748b" }}>Please log in to view your profile.</p>
          <button onClick={() => navigate("/login")} className="btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "540px", margin: "3rem auto", padding: "0 1rem" }}>
      <div className="glass-card" style={{ padding: "2.5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)", color: "white", fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", boxShadow: "0 6px 20px rgba(99, 102, 241, 0.3)" }}>
            👤
          </div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>My Profile</h2>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Manage your account & health goal preferences.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ padding: "1rem 1.2rem", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Full Name</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginTop: "0.2rem" }}>{user.name || "User"}</div>
          </div>

          <div style={{ padding: "1rem 1.2rem", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Email Address</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginTop: "0.2rem" }}>{user.email || "N/A"}</div>
          </div>

          <div style={{ padding: "1rem 1.2rem", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Health & Dietary Goal</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#4f46e5", marginTop: "0.2rem" }}>{user.goal || "Healthy Nutrition & Additive Avoidance"}</div>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "0.9rem",
            background: "#fff1f2",
            color: "#e11d48",
            border: "1px solid #fecdd3",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Logout Account
        </button>
      </div>
    </div>
  )
}
