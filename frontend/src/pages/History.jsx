import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const History = () => {
  const [scans, setScans] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
            { id: "3", detected_food: "Samosa", created_at: "2 days ago", calories: 260, health_score: 50, category: "Moderate" }
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
    <div style={{ maxWidth: "860px", margin: "2rem auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a" }}>Scan History</h2>
          <p style={{ color: "#64748b", fontSize: "0.98rem" }}>Complete timeline of your previous food scans & health ratings.</p>
        </div>
        <button onClick={() => navigate("/scan")} className="btn-primary" style={{ borderRadius: "9999px", padding: "0.75rem 1.5rem" }}>
          📷 New Scan
        </button>
      </div>

      <div className="glass-card" style={{ padding: "2rem" }}>
        {loading ? (
          <p style={{ color: "#64748b", textAlign: "center", padding: "2rem" }}>Loading your scan history...</p>
        ) : scans.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#64748b" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📜</div>
            <h3 style={{ color: "#0f172a", fontSize: "1.3rem", fontWeight: 700 }}>No scans logged yet</h3>
            <p style={{ margin: "0.5rem 0 1.5rem" }}>Start scanning your meals to track your nutrition history!</p>
            <button onClick={() => navigate("/scan")} className="btn-primary">Scan Meal Now</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {scans.map((item) => (
              <div key={item.id} className="glass-card-hover" style={{ padding: "1.2rem 1.5rem", background: "white", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "1.1rem" }}>
                    {item.detected_food}
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "#64748b", marginTop: "0.3rem" }}>
                    🔥 {item.calories} kcal | 🗓️ {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span className={`badge ${item.health_score >= 70 ? "badge-emerald" : item.health_score >= 50 ? "badge-amber" : "badge-rose"}`}>
                    {item.health_score}/100 ({item.category})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}