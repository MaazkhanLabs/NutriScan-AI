import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const Dashboard = () => {
  const [stats, setStats] = useState({ calories: 0, protein: 0, meals: 0, avg_score: 0 })
  const [recentScans, setRecentScans] = useState([])

  useEffect(() => {
    fetch("/api/dashboard/today")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error loading stats", err))

    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.scans) setRecentScans(data.scans.slice(0, 5))
      })
      .catch((err) => console.error("Error loading history", err))
  }, [])

  return (
    <div style={{ maxWidth: "960px", margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a" }}>My Health Dashboard</h2>
          <p style={{ color: "#64748b", fontSize: "0.98rem" }}>Daily nutritional intake summary & recent AI scans.</p>
        </div>
        <Link to="/scan" className="btn-primary" style={{ textDecoration: "none", borderRadius: "9999px", padding: "0.75rem 1.5rem" }}>
          📷 New Scan
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
        <div className="glass-card" style={{ padding: "1.6rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#6366f1", textTransform: "uppercase" }}>TODAY'S CALORIES</div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", margin: "0.3rem 0" }}>{stats.calories} <span style={{ fontSize: "1rem", color: "#94a3b8" }}>kcal</span></div>
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Target: ~2,000 kcal</div>
        </div>

        <div className="glass-card" style={{ padding: "1.6rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase" }}>PROTEIN INTAKE</div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", margin: "0.3rem 0" }}>{stats.protein} <span style={{ fontSize: "1rem", color: "#94a3b8" }}>g</span></div>
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Target: ~60g daily</div>
        </div>

        <div className="glass-card" style={{ padding: "1.6rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase" }}>MEALS SCANNED</div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", margin: "0.3rem 0" }}>{stats.meals} <span style={{ fontSize: "1rem", color: "#94a3b8" }}>items</span></div>
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Logged today</div>
        </div>

        <div className="glass-card" style={{ padding: "1.6rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#8b5cf6", textTransform: "uppercase" }}>AVERAGE HEALTH SCORE</div>
          <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", margin: "0.3rem 0" }}>{stats.avg_score} <span style={{ fontSize: "1rem", color: "#94a3b8" }}>/100</span></div>
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Overall food rating</div>
        </div>
      </div>

      {/* Recent Scans Table Container */}
      <div className="glass-card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a" }}>Recent AI Scans</h3>
          <Link to="/history" style={{ color: "#4f46e5", fontWeight: 700, textDecoration: "none", fontSize: "0.92rem" }}>View All History →</Link>
        </div>

        {recentScans.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
            <p style={{ margin: "0 0 1rem" }}>No food scans logged today. Start by scanning your first meal!</p>
            <Link to="/scan" className="btn-primary" style={{ textDecoration: "none" }}>Scan Meal Now</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {recentScans.map((scan) => (
              <div key={scan.id} style={{ padding: "1rem 1.2rem", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "1.05rem" }}>{scan.detected_food}</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.2rem" }}>
                    🔥 {scan.calories} kcal | Protein: {scan.protein_g || 0}g
                  </div>
                </div>
                <span className={`badge ${scan.health_score >= 70 ? "badge-emerald" : scan.health_score >= 50 ? "badge-amber" : "badge-rose"}`}>
                  {scan.health_score}/100 ({scan.category})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}