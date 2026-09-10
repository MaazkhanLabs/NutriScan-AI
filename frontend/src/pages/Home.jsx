import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "840px", margin: "0 auto", textAlign: "center" }}>
      {user ? (
        <div style={{ background: "#eef2ff", border: "1px solid #c7d2fe", padding: "1rem 1.5rem", borderRadius: "12px", marginBottom: "2rem", display: "inline-block" }}>
          <span style={{ fontSize: "1.1rem", color: "#3730a3", fontWeight: 600 }}>
            👋 Welcome back, <strong>{user.name}</strong>! You are signed in and ready to scan meals.
          </span>
        </div>
      ) : (
        <div style={{ background: "#fef3c7", border: "1px solid #fde68a", padding: "0.9rem 1.5rem", borderRadius: "12px", marginBottom: "2rem", display: "inline-block" }}>
          <span style={{ fontSize: "1rem", color: "#92400e", fontWeight: 600 }}>
            🔒 Please <strong>Login</strong> or <strong>Sign Up</strong> to scan packaged foods, ingredients, and meal photos.
          </span>
        </div>
      )}

      <h1 style={{ fontSize: "2.8rem", color: "#1e293b", marginBottom: "1rem" }}>
        Know What's On Your Plate 🥗
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#64748b", maxWidth: "620px", margin: "0 auto 2.5rem" }}>
        Scan any food item or packaged ingredient label to instantly discover nutrition facts, harmful additives, health scores, and personalized dietary advice.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        {user ? (
          <>
            <button
              onClick={() => navigate("/scan")}
              style={{
                background: "#3f51b5",
                color: "white",
                padding: "1rem 2.5rem",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(63, 81, 181, 0.25)"
              }}
            >
              📷 Start Scanning Food
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                background: "white",
                color: "#3f51b5",
                padding: "1rem 2.2rem",
                border: "1.5px solid #3f51b5",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              📊 My Dashboard
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "#3f51b5",
                color: "white",
                padding: "1rem 2.5rem",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(63, 81, 181, 0.25)"
              }}
            >
              🔑 Login to Start Scanning
            </button>
            <button
              onClick={() => navigate("/register")}
              style={{
                background: "white",
                color: "#3f51b5",
                padding: "1rem 2.2rem",
                border: "1.5px solid #3f51b5",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              ✨ Create Account (Sign Up)
            </button>
          </>
        )}
      </div>

      <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", textAlign: "left" }}>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#1e293b", marginBottom: "0.5rem" }}>🔍 OCR Packaged Label Scan</h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Detect Palm Oil, Trans Fats, HFCS, MSG, E-numbers & harmful preservatives from ingredient photos.</p>
        </div>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#1e293b", marginBottom: "0.5rem" }}>🍛 AI Food Dish Recognition</h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Identify meals instantly from your mobile or desktop photo upload.</p>
        </div>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#1e293b", marginBottom: "0.5rem" }}>📊 Health Scoring & Macros</h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Transparent 0-100 health rating with calories, protein, carbs, fat, fiber, and sodium breakdown.</p>
        </div>
      </div>
    </div>
  )
}