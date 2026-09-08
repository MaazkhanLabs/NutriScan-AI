import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const Scan = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
    } else if (file) {
      alert("Please select a valid image file (PNG, JPG, JPEG, WEBP)")
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setLoading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const headers = {}
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch("/api/scans/analyze", {
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
    <div style={{ maxWidth: "600px", margin: "3rem auto", padding: "2rem", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Scan Your Food</h2>

      {selectedFile && (
        <div style={{ width: "100%", height: "240px", border: "1px dashed #cbd5e1", borderRadius: "8px", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#f8fafc" }}>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected food"
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        </div>
      )}

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
          {selectedFile ? "Change Image" : "📷 Select Food Image"}
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
          {loading ? "Analyzing Food Nutrition..." : "🔍 Analyze Food"}
        </button>
      </div>
    </div>
  )
}