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
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem" }}>
      <h2 style={{ marginBottom: "1.5rem", color: "#1e293b" }}>Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#3f51b5", color: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.25rem" }}>{stats.calories}</div>
          <div style={{ opacity: 0.9 }}>Today's Calories</div>
        </div>
        <div style={{ background: "#10b981", color: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.25rem" }}>{stats.protein}g</div>
          <div style={{ opacity: 0.9 }}>Protein Intake</div>
        </div>
        <div style={{ background: "#f59e0b", color: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.25rem" }}>{stats.meals}</div>
          <div style={{ opacity: 0.9 }}>Meals Scanned</div>
        </div>
        <div style={{ background: "#8b5cf6", color: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.25rem" }}>{stats.avg_score}/100</div>
          <div style={{ opacity: 0.9 }}>Average Score</div>
        </div>
      </div>

      <div style={{ background: "white", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ margin: 0, color: "#1e293b" }}>Recent Scans</h3>
          <Link to="/scan" style={{ color: "#3f51b5", fontWeight: 600, textDecoration: "none" }}>+ New Scan</Link>
        </div>

        {recentScans.length === 0 ? (
          <p style={{ color: "#64748b", margin: "1rem 0" }}>No food items scanned yet today. Start by scanning your meal!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {recentScans.map((scan) => (
              <li key={scan.id} style={{ padding: "0.8rem 0", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontWeight: 600, color: "#1e293b" }}>{scan.detected_food}</span>
                  <span style={{ fontSize: "0.85rem", color: "#64748b", marginLeft: "0.75rem" }}>{scan.calories} kcal</span>
                </div>
                <span style={{ background: "#f1f5f9", padding: "0.25rem 0.6rem", borderRadius: "4px", fontWeight: 600, color: "#3f51b5" }}>
                  {scan.health_score}/100 ({scan.category})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}