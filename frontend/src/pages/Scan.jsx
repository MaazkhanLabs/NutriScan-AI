import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const Scan = () => {
  const [scanMode, setScanMode] = useState("dish") // "dish" or "packaged"
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
    } else if (file) {
      alert("Please select a valid image file (PNG, JPG, JPEG, WEBP)")
    }
  }

  const handleLoadSample = async (sampleUrl, fileName) => {
    try {
      const response = await fetch(sampleUrl)
      const blob = await response.blob()
      const file = new File([blob], fileName, { type: "image/jpeg" })
      setSelectedFile(file)
    } catch (error) {
      alert("Could not load sample image")
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setLoading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)

    const endpoint = scanMode === "packaged" ? "/api/scans/analyze-packaged" : "/api/scans/analyze"

    try {
      const headers = {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("lastScan", JSON.stringify(data))
        navigate("/result")
      } else {
        alert(data.detail || "Analysis failed")
      }
    } catch (error) {
      alert("Error connecting to server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: "680px", margin: "2rem auto", padding: "0 1rem" }}>
      <div className="glass-card" style={{ padding: "2.5rem 2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="badge badge-primary" style={{ marginBottom: "0.6rem" }}>
            ✨ AI Powered Scanner
          </span>
          <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#0f172a" }}>
            NutriScan AI Analysis
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.95rem", marginTop: "0.25rem" }}>
            Select mode & upload photo to analyze healthiness, additives, and macros.
          </p>
        </div>

        {/* Mode Switcher Segmented Pills */}
        <div style={{ 
          display: "flex", 
          gap: "0.5rem", 
          marginBottom: "1.8rem", 
          background: "#f1f5f9", 
          padding: "0.4rem", 
          borderRadius: "14px",
          border: "1px solid #e2e8f0"
        }}>
          <button
            onClick={() => { setScanMode("dish"); setSelectedFile(null); }}
            style={{
              flex: 1,
              padding: "0.8rem",
              border: "none",
              borderRadius: "10px",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
              background: scanMode === "dish" ? "white" : "transparent",
              color: scanMode === "dish" ? "#4f46e5" : "#64748b",
              boxShadow: scanMode === "dish" ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.25s ease"
            }}
          >
            🍛 Prepared Meal Dish
          </button>
          <button
            onClick={() => { setScanMode("packaged"); setSelectedFile(null); }}
            style={{
              flex: 1,
              padding: "0.8rem",
              border: "none",
              borderRadius: "10px",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
              background: scanMode === "packaged" ? "white" : "transparent",
              color: scanMode === "packaged" ? "#4f46e5" : "#64748b",
              boxShadow: scanMode === "packaged" ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.25s ease"
            }}
          >
            🏷️ Packaged OCR Ingredients
          </button>
        </div>

        {/* Mode Info Callout */}
        <div style={{ 
          padding: "1rem 1.2rem", 
          background: scanMode === "dish" ? "#eff6ff" : "#ecfdf5", 
          borderLeft: `4px solid ${scanMode === "dish" ? "#6366f1" : "#10b981"}`, 
          borderRadius: "10px", 
          marginBottom: "1.8rem", 
          fontSize: "0.92rem", 
          color: "#334155" 
        }}>
          {scanMode === "dish" ? (
            <span><strong>Dish Recognition Mode:</strong> Upload a photo of a cooked meal or food dish to analyze calories, macros, and health scores.</span>
          ) : (
            <span><strong>OCR Ingredient Scanner:</strong> Upload a photo of the <strong>Ingredients Label</strong> on packaged food (chips, biscuits, snacks) to detect palm oil, MSG, INS additives, and preservatives.</span>
          )}
        </div>

        {/* 1-Click Sample Image Selector Pills */}
        <div style={{ marginBottom: "1.8rem", padding: "1.2rem", background: "#fcf5ff", border: "1px solid #f3e8ff", borderRadius: "12px" }}>
          <p style={{ margin: "0 0 0.6rem 0", fontSize: "0.88rem", color: "#7e22ce", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>🧪</span> Don't have an image ready? Test with 1-Click Sample Images:
          </p>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <button
              onClick={() => { setScanMode("dish"); handleLoadSample("/samples/samosa_sample.jpg", "samosa_sample.jpg"); }}
              style={{ padding: "0.5rem 1rem", background: "white", color: "#6b21a8", border: "1px solid #e9d5ff", borderRadius: "9999px", fontSize: "0.88rem", cursor: "pointer", fontWeight: 600, boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}
            >
              🍛 Load Samosa Dish Sample
            </button>
            <button
              onClick={() => { setScanMode("packaged"); handleLoadSample("/samples/packaged_label_sample.jpg", "packaged_label_sample.jpg"); }}
              style={{ padding: "0.5rem 1rem", background: "white", color: "#6b21a8", border: "1px solid #e9d5ff", borderRadius: "9999px", fontSize: "0.88rem", cursor: "pointer", fontWeight: 600, boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}
            >
              🏷️ Load Ingredient Label Sample (OCR)
            </button>
          </div>
        </div>

        {/* Dropzone Container */}
        {selectedFile ? (
          <div style={{ width: "100%", height: "260px", border: "2px solid #6366f1", borderRadius: "14px", marginBottom: "1.8rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#f8fafc", position: "relative" }}>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected food"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
            <button
              onClick={() => setSelectedFile(null)}
              style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(15, 23, 42, 0.75)", color: "white", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontWeight: "bold" }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div 
            onClick={() => document.getElementById("food-image-input").click()}
            style={{ 
              width: "100%", 
              padding: "3rem 1.5rem", 
              border: "2px dashed #cbd5e1", 
              borderRadius: "14px", 
              marginBottom: "1.8rem", 
              textAlign: "center", 
              cursor: "pointer",
              background: "#f8fafc",
              transition: "all 0.2s ease"
            }}
          >
            <div style={{ fontSize: "2.8rem", marginBottom: "0.8rem" }}>
              {scanMode === "dish" ? "📸" : "📄"}
            </div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "0.3rem" }}>
              Click to browse or drop food image here
            </h4>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
              Supports PNG, JPG, JPEG, WEBP files
            </p>
          </div>
        )}

        <input
          id="food-image-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Action Button */}
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || loading}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "12px",
            fontSize: "1.05rem",
            opacity: selectedFile && !loading ? 1 : 0.65,
            cursor: selectedFile && !loading ? "pointer" : "not-allowed"
          }}
        >
          {loading
            ? scanMode === "packaged" ? "🔍 Running OCR & Additive Detection..." : "🧠 Running AI Neural Classification..."
            : scanMode === "packaged" ? "🔍 Analyze Packaged Ingredients" : "🔍 Analyze Food Dish"}
        </button>
      </div>
    </div>
  )
}