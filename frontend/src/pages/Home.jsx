import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Top Banner Notice */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        {user ? (
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            padding: "0.5rem 1.25rem", 
            background: "linear-gradient(135deg, #e0e7ff 0%, #ecfdf5 100%)", 
            border: "1px solid rgba(99, 102, 241, 0.2)", 
            borderRadius: "9999px",
            color: "#3730a3",
            fontWeight: 600,
            fontSize: "0.95rem"
          }}>
            <span>✨</span> Welcome back, <strong>{user.name}</strong>! You are signed in and ready to scan.
          </div>
        ) : (
          <div style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            padding: "0.5rem 1.25rem", 
            background: "linear-gradient(135deg, #fffbe6 0%, #fff1f2 100%)", 
            border: "1px solid rgba(245, 158, 11, 0.25)", 
            borderRadius: "9999px",
            color: "#92400e",
            fontWeight: 600,
            fontSize: "0.95rem"
          }}>
            <span>🔒</span> Please <strong>Login</strong> or <strong>Sign Up</strong> to unlock food scanning & additive detection.
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3.2rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: "1.2rem" }}>
          Know Exactly What's On Your Plate <span className="gradient-text">With AI 🥗</span>
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "680px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
          Instantly scan any meal photo or packaged food ingredient label. Detect Palm Oil, MSG, Trans Fats, E-Numbers, and get transparent $0–100$ health scores.
        </p>

        {/* CTA Actions */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {user ? (
            <>
              <button 
                onClick={() => navigate("/scan")}
                className="btn-primary"
                style={{ padding: "1rem 2.5rem", fontSize: "1.1rem", borderRadius: "9999px" }}
              >
                📷 Start Scanning Food
              </button>
              <button 
                onClick={() => navigate("/dashboard")}
                className="btn-secondary"
                style={{ padding: "1rem 2.2rem", fontSize: "1.1rem", borderRadius: "9999px" }}
              >
                📊 View Dashboard
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate("/login")}
                className="btn-primary"
                style={{ padding: "1rem 2.5rem", fontSize: "1.1rem", borderRadius: "9999px" }}
              >
                🔑 Login & Start Scanning
              </button>
              <button 
                onClick={() => navigate("/register")}
                className="btn-secondary"
                style={{ padding: "1rem 2.2rem", fontSize: "1.1rem", borderRadius: "9999px" }}
              >
                ✨ Create Free Account
              </button>
            </>
          )}
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
        <div className="glass-card glass-card-hover" style={{ padding: "1.8rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1.2rem" }}>
            🏷️
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
            OCR Ingredient Additive Scan
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            Extract packaging ingredient text cleanly. Detect Palm Oil, Trans Fats, INS/E-Numbers, artificial dyes, and refined sugar.
          </p>
        </div>

        <div className="glass-card glass-card-hover" style={{ padding: "1.8rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1.2rem" }}>
            🍛
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
            Vision AI Dish Classifier
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            Identify prepared food photos instantly using Food-101 Vision Transformer models with Indian & global dish recognition.
          </p>
        </div>

        <div className="glass-card glass-card-hover" style={{ padding: "1.8rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#fffbe6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1.2rem" }}>
            📊
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
            Transparent Health Scoring
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            Get accurate $0–100$ health scores evaluating deep-frying, refined carbs, fat ratios, protein, and fiber breakdown.
          </p>
        </div>
      </div>
    </div>
  )
}