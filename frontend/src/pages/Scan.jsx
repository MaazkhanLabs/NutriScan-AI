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
    <div style={{ maxWidth: "640px", margin: "2rem auto", padding: "2rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>NutriScan AI Scanner</h2>

      {/* Mode Selector Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "#f1f5f9", padding: "0.4rem", borderRadius: "8px" }}>
        <button
          onClick={() => { setScanMode("dish"); setSelectedFile(null); }}
          style={{
            flex: 1,
            padding: "0.75rem",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            background: scanMode === "dish" ? "#3f51b5" : "transparent",
            color: scanMode === "dish" ? "white" : "#64748b",
            transition: "all 0.2s"
          }}
        >
          🍛 Prepared Food Dish
        </button>
        <button
          onClick={() => { setScanMode("packaged"); setSelectedFile(null); }}
          style={{
            flex: 1,
            padding: "0.75rem",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            background: scanMode === "packaged" ? "#3f51b5" : "transparent",
            color: scanMode === "packaged" ? "white" : "#64748b",
            transition: "all 0.2s"
          }}
        >
          🏷️ Packaged Ingredients (OCR)
        </button>
      </div>

      <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "6px", marginBottom: "1.5rem", fontSize: "0.9rem", color: "#475569", borderLeft: "4px solid #3f51b5" }}>
        {scanMode === "dish" ? (
          <span><strong>Dish Recognition Mode:</strong> Upload a photo of a meal or dish to detect calories, macros, and AI health score.</span>
        ) : (
          <span><strong>OCR Ingredient Scanner:</strong> Upload a photo of the <strong>Ingredients Label</strong> on packaged food (e.g. chips, biscuits, cereal) to detect palm oil, trans fats, preservatives, and harmful additives.</span>
        )}
      </div>

      {selectedFile && (
        <div style={{ width: "100%", height: "240px", border: "1px dashed #cbd5e1", borderRadius: "8px", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#f8fafc" }}>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected food"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
      )}

      {/* 1-Click Sample Image Selector */}
      <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: "8px" }}>
        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#6b21a8", fontWeight: "bold" }}>
          🧪 Don't have an image ready? Test with 1-Click Sample Images:
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => { setScanMode("dish"); handleLoadSample("/samples/samosa_sample.jpg", "samosa_sample.jpg"); }}
            style={{ padding: "0.4rem 0.8rem", background: "#f3e8ff", color: "#7e22ce", border: "1px solid #d8b4fe", borderRadius: "6px", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600 }}
          >
            🍛 Load Samosa Dish Sample
          </button>
          <button
            onClick={() => { setScanMode("packaged"); handleLoadSample("/samples/packaged_label_sample.jpg", "packaged_label_sample.jpg"); }}
            style={{ padding: "0.4rem 0.8rem", background: "#f3e8ff", color: "#7e22ce", border: "1px solid #d8b4fe", borderRadius: "6px", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600 }}
          >
            🏷️ Load Ingredient Label Sample (OCR)
          </button>
        </div>
      </div>

      <div>
        <input
          id="food-image-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button
          onClick={() => document.getElementById("food-image-input").click()}
          style={{
            width: "100%",
            padding: "0.9rem",
            background: "#3f51b5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {selectedFile ? "Change Image" : scanMode === "dish" ? "📷 Select Food Dish Image" : "📸 Select Packaged Ingredient Label Photo"}
        </button>
        <button
          onClick={handleAnalyze}
          disabled={!selectedFile || loading}
          style={{
            width: "100%",
            padding: "0.9rem",
            background: selectedFile && !loading ? "#10b981" : "#cbd5e1",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: 600,
            marginTop: "1rem",
            cursor: selectedFile && !loading ? "pointer" : "not-allowed"
          }}
        >
          {loading
            ? scanMode === "packaged" ? "Reading Ingredients Label with OCR..." : "Analyzing Food Dish..."
            : scanMode === "packaged" ? "🔍 Read Ingredients & Analyze Health" : "🔍 Analyze Food Dish"}
        </button>
      </div>
    </div>
  )
}