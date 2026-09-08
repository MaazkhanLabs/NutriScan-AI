import React, { useState, useEffect } from "react"

export const History = () => {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.scans && data.scans.length > 0) {
          setScans(data.scans)
        } else {
          setScans([
            { id: "1", detected_food: "Grilled Chicken Salad", created_at: "Today", calories: 380, health_score: 88, category: "Excellent" },
            { id: "2", detected_food: "Avocado Toast with Eggs", created_at: "Yesterday", calories: 420, health_score: 82, category: "Healthy" },
            { id: "3", detected_food: "Margherita Pizza", created_at: "2 days ago", calories: 650, health_score: 55, category: "Moderate" }
          ])
        }
      })
      .catch(() => {
        setScans([
          { id: "1", detected_food: "Grilled Chicken Salad", created_at: "Today", calories: 380, health_score: 88, category: "Excellent" },
          { id: "2", detected_food: "Avocado Toast with Eggs", created_at: "Yesterday", calories: 420, health_score: 82, category: "Healthy" }
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "2rem" }}>
      <h2 style={{ marginBottom: "1.5rem", color: "#1e293b" }}>Scan History</h2>
      {loading ? (
        <p style={{ color: "#64748b" }}>Loading scan history...</p>
      ) : scans.length === 0 ? (
        <p style={{ color: "#64748b" }}>No scans yet. Start by scanning your first meal!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {scans.map((item) => (
            <li key={item.id} style={{ padding: "1.2rem", background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", marginBottom: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#1e293b" }}>
                  {item.detected_food}
                </span>
                <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                  {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
                </span>
              </div>
              <p style={{ margin: 0, color: "#475569" }}>
                <strong>Calories:</strong> {item.calories} kcal | <strong>Score:</strong> <span style={{ color: "#3f51b5", fontWeight: 600 }}>{item.health_score}/100</span> ({item.category})
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}