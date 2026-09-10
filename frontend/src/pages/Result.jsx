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
      <div style={{ maxWidth: "600px", margin: "3rem auto", padding: "0 1rem" }}>
        <div className="glass-card" style={{ padding: "3rem 2rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f172a" }}>No Scan Result Found</h2>
          <p style={{ color: "#64748b", margin: "0.8rem 0 2rem" }}>Scan a meal photo or food ingredient label to view detailed health analysis.</p>
          <button onClick={() => navigate("/scan")} className="btn-primary">
            Go to Scanner
          </button>
        </div>
      </div>
    )
  }

  const isPackaged = result.type === "packaged_food" || !!result.extracted_text
  const isUnreadable = isPackaged && result.text_detected === false

  const scoreCategories = {
    Excellent: { color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", text: "Clean & Excellent Choice" },
    Healthy: { color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", text: "Healthy Choice" },
    "Healthy & Clean Label": { color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0", text: "Clean Label & Healthy" },
    Moderate: { color: "#f59e0b", bg: "#fffbe6", border: "#fde68a", text: "Moderate / Consume in Moderation" },
    "Moderate / Consume in Moderation": { color: "#f59e0b", bg: "#fffbe6", border: "#fde68a", text: "Consume in Moderation" },
    Unhealthy: { color: "#f97316", bg: "#fff7ed", border: "#ffedd5", text: "Unhealthy Choice" },
    "Unhealthy / Ultra-Processed": { color: "#f97316", bg: "#fff7ed", border: "#ffedd5", text: "Ultra-Processed Snack" },
    "Very Unhealthy": { color: "#ef4444", bg: "#fff1f2", border: "#fecdd3", text: "Very Unhealthy" },
    "Very Unhealthy / Hazardous Additives": { color: "#ef4444", bg: "#fff1f2", border: "#fecdd3", text: "Hazardous / High Additives" },
    "Unreadable Label / Clear Text Needed": { color: "#ef4444", bg: "#fff1f2", border: "#fecdd3", text: "Text Unreadable — Re-scan Needed" }
  }

  const categoryInfo = scoreCategories[result.category] || { color: "#6366f1", bg: "#eff6ff", border: "#c7d2fe", text: result.category || "Calculated" }

  return (
    <div style={{ maxWidth: "780px", margin: "2rem auto", padding: "0 1rem" }}>
      <div className="glass-card" style={{ padding: "2.5rem 2rem" }}>
        
        {/* Top Scan Mode Header Pill */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.8rem" }}>
          <span className={`badge ${isPackaged ? "badge-primary" : "badge-emerald"}`}>
            {isPackaged ? "🏷️ Packaged OCR Scan" : "🍛 Prepared Dish AI Scan"}
          </span>
          <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Circular Health Score Ring / Gauge Header */}
        {!isUnreadable && (
          <div style={{ 
            textAlign: "center", 
            padding: "2rem 1.5rem", 
            background: categoryInfo.bg, 
            border: `1.5px solid ${categoryInfo.border}`, 
            borderRadius: "20px", 
            marginBottom: "2rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.02)"
          }}>
            <div style={{ 
              width: "120px", 
              height: "120px", 
              borderRadius: "50%", 
              background: "white", 
              margin: "0 auto 1rem", 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center",
              boxShadow: `0 0 25px ${categoryInfo.color}33`,
              border: `4px solid ${categoryInfo.color}`
            }}>
              <span style={{ fontSize: "2.8rem", fontWeight: "800", color: categoryInfo.color, lineHeight: 1 }}>
                {result.health_score}
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8" }}>OUT OF 100</span>
            </div>

            <h3 style={{ color: categoryInfo.color, fontSize: "1.35rem", fontWeight: 800 }}>
              {categoryInfo.text}
            </h3>

            {result.verdict && (
              <p style={{ color: "#475569", fontSize: "0.95rem", marginTop: "0.75rem", fontStyle: "italic", maxWidth: "540px", margin: "0.75rem auto 0" }}>
                "{result.verdict}"
              </p>
            )}
          </div>
        )}

        {/* Target Title */}
        <div style={{ marginBottom: "2rem", paddingBottom: "1.2rem", borderBottom: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Detected Target</span>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0f172a", marginTop: "0.2rem" }}>
            {result.detected_food}
          </h2>
        </div>

        {/* PACKAGED FOOD OCR DISPLAY */}
        {isPackaged ? (
          <>
            {/* Extracted Text Inspector Monospace Card */}
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.6rem" }}>
                📝 Extracted Ingredient Text (OCR)
              </h4>
              <div style={{ 
                background: isUnreadable ? "#fef2f2" : "#f8fafc", 
                padding: "1.2rem", 
                borderRadius: "12px", 
                fontSize: "0.88rem", 
                color: isUnreadable ? "#991b1b" : "#334155", 
                fontFamily: "JetBrains Mono, monospace", 
                border: `1px solid ${isUnreadable ? "#fca5a5" : "#cbd5e1"}`, 
                maxHeight: "150px", 
                overflowY: "auto" 
              }}>
                {result.extracted_text || "No text extracted."}
              </div>
            </div>

            {/* Identified Unhealthy Additives */}
            {!isUnreadable && (
              result.harmful_additives && result.harmful_additives.length > 0 ? (
                <div style={{ marginBottom: "2rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#e11d48", marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span>⚠️</span> Identified Unhealthy Additives ({result.harmful_additives.length})
                  </h4>
                  {result.harmful_additives.map((item, idx) => (
                    <div key={idx} style={{ padding: "1rem 1.2rem", background: "#fff1f2", borderLeft: "4px solid #f43f5e", borderRadius: "10px", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <strong style={{ color: "#9f1239", fontSize: "1.05rem" }}>{item.name}</strong>
                        <span className="badge badge-rose">
                          {item.risk_level} Risk • {item.category}
                        </span>
                      </div>
                      <p style={{ color: "#881337", fontSize: "0.9rem", marginTop: "0.4rem" }}>
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: "1rem 1.2rem", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#047857", borderRadius: "12px", marginBottom: "2rem", fontWeight: 600 }}>
                  ✓ No major chemical additives or hazardous oils detected in the scanned text label.
                </div>
              )
            )}
          </>
        ) : (
          /* PREPARED FOOD DISH DISPLAY WITH MACRO PROGRESS BARS */
          <>
            {result.nutrition && (
              <div style={{ marginBottom: "2rem" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "1rem" }}>
                  📊 Nutritional Breakdown & Macros
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                  <div style={{ background: "#f8fafc", padding: "1rem 1.2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>CALORIES</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#4338ca" }}>{result.nutrition.calories} kcal</div>
                  </div>

                  <div style={{ background: "#f8fafc", padding: "1rem 1.2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>PROTEIN</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#059669" }}>{result.nutrition.protein_g} g</div>
                  </div>

                  <div style={{ background: "#f8fafc", padding: "1rem 1.2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>CARBOHYDRATES</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#d97706" }}>{result.nutrition.carbs_g} g</div>
                  </div>

                  <div style={{ background: "#f8fafc", padding: "1rem 1.2rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>TOTAL FAT</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#e11d48" }}>{result.nutrition.fat_g} g</div>
                  </div>
                </div>
              </div>
            )}

            {/* Health Warnings Alerts List */}
            {result.warnings && result.warnings.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#e11d48", marginBottom: "0.8rem" }}>
                  ⚠️ Health Warnings & Dietary Risks ({result.warnings.length})
                </h4>
                {result.warnings.map((warning, i) => (
                  <div key={i} style={{ padding: "0.85rem 1.2rem", background: "#fff1f2", borderLeft: "4px solid #f43f5e", color: "#9f1239", borderRadius: "10px", marginBottom: "0.6rem", fontWeight: 600, fontSize: "0.95rem" }}>
                    {warning}
                  </div>
                ))}
              </div>
            )}

            {/* What's Good List */}
            {result.positives && result.positives.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#059669", marginBottom: "0.8rem" }}>
                  🟢 Positive Nutritional Highlights
                </h4>
                {result.positives.map((positive, i) => (
                  <div key={i} style={{ padding: "0.85rem 1.2rem", background: "#ecfdf5", borderLeft: "4px solid #10b981", color: "#047857", borderRadius: "10px", marginBottom: "0.6rem", fontWeight: 600, fontSize: "0.95rem" }}>
                    ✓ {positive}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
          <button onClick={() => navigate("/scan")} className="btn-primary" style={{ flex: 1, padding: "0.95rem" }}>
            📷 Scan Another Item
          </button>
          <button onClick={() => navigate("/history")} className="btn-secondary" style={{ flex: 1, padding: "0.95rem" }}>
            📜 View Scan History
          </button>
        </div>

      </div>
    </div>
  )
}