"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { AdminAuthModal } from "@/components/auth/admin-auth-modal"

export function AdminAccess() {
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false)
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  const handleAdminLogin = () => {
    if (user && isAdmin) {
      // Already logged in as admin, redirect to secure dashboard
      router.push("/admin/8530085300/dashboard")
    } else {
      // Show admin login modal
      setAdminAuthModalOpen(true)
    }
  }

  const handleAdminLoginSuccess = () => {
    setAdminAuthModalOpen(false)
    router.push("/admin/8530085300/dashboard")
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={handleAdminLogin}
          className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Admin Access"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </button>
      </div>

      <AdminAuthModal
        isOpen={adminAuthModalOpen}
        onClose={() => setAdminAuthModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />
    </>
  )
}
