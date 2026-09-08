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
        <p style={{ margin: "1rem 0", color: "#64748b" }}>Scan a food image or ingredient label to see detailed health analysis here.</p>
        <button
          onClick={() => navigate("/scan")}
          style={{ background: "#3f51b5", color: "white", padding: "0.8rem 1.5rem", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
        >
          Go to Scanner
        </button>
      </div>
    )
  }

  const isPackaged = result.type === "packaged_food" || !!result.extracted_text
  const isUnreadable = isPackaged && result.text_detected === false

  const scoreCategories = {
    Excellent: { color: "#10b981", text: "Excellent Health Score" },
    Healthy: { color: "#22c55e", text: "Healthy Choice" },
    "Healthy & Clean Label": { color: "#10b981", text: "Clean Label & Healthy" },
    Moderate: { color: "#f59e0b", text: "Moderate Quality" },
    "Moderate / Consume in Moderation": { color: "#f59e0b", text: "Consume in Moderation" },
    Unhealthy: { color: "#f97316", text: "Unhealthy Option" },
    "Unhealthy / Ultra-Processed": { color: "#f97316", text: "Ultra-Processed Food" },
    "Very Unhealthy": { color: "#ef4444", text: "Very Unhealthy" },
    "Very Unhealthy / Hazardous Additives": { color: "#ef4444", text: "Hazardous / High Additives" },
    "Unreadable Label / Clear Text Needed": { color: "#ef4444", text: "Text Unreadable — Re-scan Required" }
  }

  const categoryInfo = scoreCategories[result.category] || { color: "#3f51b5", text: result.category || "Calculated" }

  return (
    <div style={{ maxWidth: "680px", margin: "2rem auto", padding: "2rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", background: isPackaged ? "#eff6ff" : "#f0fdf4", color: isPackaged ? "#1d4ed8" : "#15803d", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
        {isPackaged ? "🏷️ Packaged Food Ingredient OCR Scan" : "🍛 Prepared Food Dish Scan"}
      </div>

      <h2 style={{ marginBottom: "1.5rem" }}>Analysis Result</h2>

      {/* Unreadable Text Banner */}
      {isUnreadable ? (
        <div style={{ padding: "1.5rem", background: "#fff1f2", border: "2px solid #fecdd3", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#9f1239", margin: "0 0 0.5rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            ⚠️ OCR Text Detection Failed
          </h3>
          <p style={{ color: "#881337", fontSize: "0.95rem", margin: "0 0 1rem 0" }}>
            The system could not read any clear text from this photo.
          </p>
          <div style={{ background: "white", padding: "1rem", borderRadius: "6px", fontSize: "0.9rem", color: "#475569" }}>
            <strong>💡 How to get accurate ingredient detection:</strong>
            <ul style={{ margin: "0.5rem 0 0 1.2rem", padding: 0 }}>
              <li>Focus directly on the <strong>INGREDIENTS text panel</strong> on the back/side of the packaging.</li>
              <li>Ensure good lighting (avoid reflections, glares, or dark shadows).</li>
              <li>Hold the camera steady so the text is clear and unblurred.</li>
            </ul>
          </div>
        </div>
      ) : (
        /* Health Score Badge */
        <div style={{ textAlign: "center", padding: "1.5rem", background: "#f8fafc", borderRadius: "8px", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "3.5rem", fontWeight: "bold", color: categoryInfo.color }}>
            {result.health_score}<span style={{ fontSize: "1.5rem", color: "#94a3b8" }}>/100</span>
          </div>
          <p style={{ color: categoryInfo.color, fontSize: "1.2rem", fontWeight: 600, marginTop: "0.25rem" }}>
            {categoryInfo.text}
          </p>
          {result.verdict && (
            <p style={{ color: "#475569", fontSize: "0.95rem", marginTop: "0.75rem", fontStyle: "italic", borderTop: "1px solid #e2e8f0", paddingTop: "0.75rem" }}>
              "{result.verdict}"
            </p>
          )}
        </div>
      )}

      {/* Item Title */}
      <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid #e2e8f0" }}>
        <h3 style={{ color: "#334155", marginBottom: "0.25rem" }}>Detected Target</h3>
        <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#1e293b" }}>
          {result.detected_food}
        </p>
      </div>

      {/* PACKAGED FOOD OCR ANALYSIS DISPLAY */}
      {isPackaged ? (
        <>
          {/* Extracted OCR Text Inspection Box */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#334155", marginBottom: "0.5rem" }}>📝 Extracted Ingredient Text (OCR)</h3>
            <div style={{ background: isUnreadable ? "#fef2f2" : "#f8fafc", padding: "1rem", borderRadius: "6px", fontSize: "0.9rem", color: isUnreadable ? "#991b1b" : "#334155", fontFamily: "monospace", border: `1px solid ${isUnreadable ? "#fca5a5" : "#e2e8f0"}`, maxHeight: "150px", overflowY: "auto" }}>
              {result.extracted_text || "No text detected from image."}
            </div>
            {result.text_detected && (
              <p style={{ fontSize: "0.8rem", color: "#166534", marginTop: "0.4rem" }}>
                ✓ System successfully extracted printed text above and scanned for food additives.
              </p>
            )}
          </div>

          {/* Identified Harmful Additives */}
          {!isUnreadable && (
            result.harmful_additives && result.harmful_additives.length > 0 ? (
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ color: "#991b1b", marginBottom: "0.5rem" }}>
                  ⚠️ Identified Unhealthy & Ultra-Processed Additives ({result.harmful_additives.length})
                </h3>
                {result.harmful_additives.map((item, idx) => (
                  <div key={idx} style={{ padding: "0.8rem", background: "#fef2f2", borderLeft: "4px solid #ef4444", borderRadius: "4px", marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ color: "#991b1b", fontSize: "1rem" }}>{item.name}</strong>
                      <span style={{ fontSize: "0.75rem", background: "#fee2e2", color: "#991b1b", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: "bold" }}>
                        {item.risk_level} Risk • {item.category}
                      </span>
                    </div>
                    <p style={{ color: "#7f1d1d", fontSize: "0.88rem", marginTop: "0.3rem" }}>
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: "0.8rem", background: "#f0fdf4", color: "#166534", borderRadius: "6px", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                ✓ No major hazardous chemical additives or palm oil detected in the scanned text.
              </div>
            )
          )}

          {/* Healthy Natural Ingredients */}
          {!isUnreadable && result.healthy_ingredients && result.healthy_ingredients.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#166534", marginBottom: "0.5rem" }}>🟢 Healthy Natural Ingredients Found</h3>
              {result.healthy_ingredients.map((item, idx) => (
                <div key={idx} style={{ padding: "0.6rem 0.8rem", background: "#f0fdf4", borderLeft: "4px solid #22c55e", color: "#15803d", borderRadius: "4px", marginBottom: "0.4rem", fontSize: "0.92rem" }}>
                  <strong>{item.name}:</strong> {item.benefit}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* PREPARED FOOD DISH DISPLAY */
        <>
          {result.nutrition && (
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
          )}

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
        </>
      )}

      {/* Recommendations */}
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
          Scan Another Item
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