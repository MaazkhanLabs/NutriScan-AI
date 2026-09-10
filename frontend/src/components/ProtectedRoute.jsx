import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoute = ({ children }) => {
  const { user, token } = useAuth()
  const location = useLocation()

  if (!token && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
