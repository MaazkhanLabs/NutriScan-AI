import React from "react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.8rem", color: "#1e293b", marginBottom: "1rem" }}>
        Know What's On Your Plate 🥗
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#64748b", maxWidth: "600px", margin: "0 auto 2.5rem" }}>
        Scan any food item or meal photo to instantly discover nutrition facts, health score, and personalized nutritional recommendations.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button
          onClick={() => navigate("/scan")}
          style={{
            background: "#3f51b5",
            color: "white",
            padding: "1rem 2.2rem",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(63, 81, 181, 0.25)"
          }}
        >
          📷 Scan Food Now
        </button>
        <button
          onClick={() => navigate("/login")}
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
          Login
        </button>
      </div>

      <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", textAlign: "left" }}>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#1e293b", marginBottom: "0.5rem" }}>🔍 AI Food Recognition</h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Identify meals instantly from your mobile or desktop camera.</p>
        </div>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#1e293b", marginBottom: "0.5rem" }}>📊 Health Scoring</h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Get transparent 0-100 nutrition scores based on sodium, sugar, fiber, and protein.</p>
        </div>
        <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#1e293b", marginBottom: "0.5rem" }}>💡 Dietary Tips</h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>Receive practical advice on how to improve meal healthiness.</p>
        </div>
      </div>
    </div>
  )
}