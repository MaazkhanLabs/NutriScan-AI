import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Result = () => {
  const [result] = useState(() => {
    const saved = localStorage.getItem("lastScan")
    return saved ? JSON.parse(saved) : null
  })
  const navigate = useNavigate()

  if (!result) {
    return (
      <div style={{ padding: "3rem 1rem", textAlign: "center" }}>
        <h2>Analysis Result</h2>
        <p style={{ margin: "1rem 0", color: "#64748b" }}>Scan a food image to see detailed nutrition facts and health score here.</p>
        <button
          onClick={() => navigate("/scan")}
          style={{ background: "#3f51b5", color: "white", padding: "0.8rem 1.5rem", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
        >
          Go to Scanner
        </button>
      </div>
    )
  }

  const scoreCategories = {
    Excellent: { color: "#10b981", text: "Excellent Health Score" },
    Healthy: { color: "#22c55e", text: "Healthy Choice" },
    Moderate: { color: "#f59e0b", text: "Moderate Nutritional Quality" },
    Unhealthy: { color: "#f97316", text: "Unhealthy Option" },
    "Very Unhealthy": { color: "#ef4444", text: "Very Unhealthy" }
  }

  const categoryInfo = scoreCategories[result.category] || { color: "#64748b", text: "Calculated" }

  return (
    <div style={{ maxWidth: "640px", margin: "2rem auto", padding: "2rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Analysis Result</h2>

      <div style={{ textAlign: "center", padding: "1.5rem", background: "#f8fafc", borderRadius: "8px", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "3.5rem", fontWeight: "bold", color: categoryInfo.color }}>
          {result.health_score}<span style={{ fontSize: "1.5rem", color: "#94a3b8" }}>/100</span>
        </div>
        <p style={{ color: categoryInfo.color, fontSize: "1.2rem", fontWeight: 600, marginTop: "0.25rem" }}>
          {categoryInfo.text}
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e2e8f0" }}>
        <h3 style={{ color: "#334155", marginBottom: "0.5rem" }}>Detected Food</h3>
        <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#1e293b" }}>
          {result.detected_food}
        </p>
        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
          Confidence: {Math.round(result.confidence * 100)}%
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e2e8f0" }}>
        <h3 style={{ color: "#334155", marginBottom: "0.75rem" }}>Nutritional Breakdown</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem", background: "#f8fafc", padding: "1rem", borderRadius: "6px" }}>
          <div><strong>Calories:</strong> {result.nutrition.calories} kcal</div>
          <div><strong>Protein:</strong> {result.nutrition.protein_g} g</div>
          <div><strong>Carbs:</strong> {result.nutrition.carbs_g} g</div>
          <div><strong>Fat:</strong> {result.nutrition.fat_g} g</div>
          <div><strong>Fiber:</strong> {result.nutrition.fiber_g} g</div>
          <div><strong>Sugar:</strong> {result.nutrition.sugar_g} g</div>
          <div><strong>Sodium:</strong> {result.nutrition.sodium_mg} mg</div>
        </div>
      </div>

      {result.positives && result.positives.length > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          <h3 style={{ color: "#166534", marginBottom: "0.5rem" }}>What's Good</h3>
          {result.positives.map((positive, i) => (
            <div key={i} style={{ padding: "0.4rem 0.8rem", background: "#f0fdf4", color: "#15803d", borderRadius: "4px", marginBottom: "0.4rem", fontSize: "0.95rem" }}>
              ✓ {positive}
            </div>
          ))}
        </div>
      )}

      {result.warnings && result.warnings.length > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          <h3 style={{ color: "#991b1b", marginBottom: "0.5rem" }}>Keep In Mind</h3>
          {result.warnings.map((warning, i) => (
            <div key={i} style={{ padding: "0.4rem 0.8rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "4px", marginBottom: "0.4rem", fontSize: "0.95rem" }}>
              ⚠ {warning}
            </div>
          ))}
        </div>
      )}

      {result.recommendations && result.recommendations.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#1e293b", marginBottom: "0.5rem" }}>Health Recommendations</h3>
          {result.recommendations.map((rec, i) => (
            <div key={i} style={{ padding: "0.5rem 0.8rem", background: "#eff6ff", color: "#1d4ed8", borderRadius: "4px", marginBottom: "0.4rem", fontSize: "0.95rem" }}>
              💡 {rec}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={() => navigate("/scan")}
          style={{ flex: 1, background: "#3f51b5", color: "white", padding: "0.8rem", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
        >
          Scan Another Food
        </button>
        <button
          onClick={() => navigate("/history")}
          style={{ flex: 1, background: "transparent", border: "1px solid #cbd5e1", color: "#475569", padding: "0.8rem", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
        >
          View History
        </button>
      </div>
    </div>
  )
}