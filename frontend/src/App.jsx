import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { NavBar } from "./components/Navbar"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { Scan } from "./pages/Scan"
import { Result } from "./pages/Result"
import { History } from "./pages/History"
import { Profile } from "./pages/Profile"
import { AuthProvider } from "./hooks/useAuth.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes: Users must login/sign in first before performing tasks */}
          <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App