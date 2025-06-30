"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, requireAdmin = false, fallback }: ProtectedRouteProps) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-algotrek-aqua mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const isAuthenticated = requireAdmin ? isAdmin : user || isAdmin

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="font-bold text-2xl mb-4">
              <span className="text-algotrek-aqua">Algo</span>
              <span className="text-algotrek-pink">Trek</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              {requireAdmin ? "You need admin privileges to access this page." : "Please sign in to access this page."}
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-algotrek-aqua text-algotrek-dark-blue px-6 py-2 rounded-lg font-semibold hover:bg-algotrek-aqua/90 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
