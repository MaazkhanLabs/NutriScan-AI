import React from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div style={{ maxWidth: "500px", margin: "3rem auto", padding: "2rem", textAlign: "center" }}>
        <h2>User Profile</h2>
        <p style={{ margin: "1rem 0", color: "#666" }}>Please log in to view your profile.</p>
        <button
          onClick={() => navigate("/login")}
          style={{ background: "#3f51b5", color: "white", padding: "0.8rem 1.5rem", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: "500px", margin: "3rem auto", padding: "2rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#1e293b" }}>My Profile</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ padding: "1rem", background: "#f8fafc", borderRadius: "6px" }}>
          <strong>Name:</strong> {user.name || "User"}
        </div>
        <div style={{ padding: "1rem", background: "#f8fafc", borderRadius: "6px" }}>
          <strong>Email:</strong> {user.email || "N/A"}
        </div>
        <div style={{ padding: "1rem", background: "#f8fafc", borderRadius: "6px" }}>
          <strong>Health Goal:</strong> {user.goal || "Healthy Nutrition & Calorie Tracking"}
        </div>
        <button
          onClick={logout}
          style={{ marginTop: "1rem", background: "#ef4444", color: "white", padding: "0.8rem", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
