"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "./auth-modal"
import { UserMenu } from "./user-menu"
import { Shield, User } from "lucide-react"

export function AuthHeader() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authType, setAuthType] = useState<"user" | "admin">("user")
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const { user, isAdmin } = useAuth()

  const openUserAuth = (mode: "login" | "register") => {
    setAuthType("user")
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const openAdminAuth = () => {
    setAuthType("admin")
    setAuthModalOpen(true)
  }

  if (user || isAdmin) {
    return <UserMenu />
  }

  return (
    <>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => openUserAuth("login")}
          className="flex items-center space-x-2 text-gray-700 hover:text-algotrek-aqua transition-colors"
        >
          <User className="w-4 h-4" />
          <span>Sign In</span>
        </button>

        <button
          onClick={() => openUserAuth("register")}
          className="bg-algotrek-aqua text-algotrek-dark-blue px-4 py-2 rounded-lg font-semibold hover:bg-algotrek-aqua/90 transition-colors"
        >
          Sign Up
        </button>

        <button
          onClick={openAdminAuth}
          className="flex items-center space-x-2 bg-algotrek-dark-blue text-white px-3 py-2 rounded-lg hover:bg-algotrek-dark-blue/90 transition-colors"
        >
          <Shield className="w-4 h-4" />
          <span className="hidden sm:inline">Admin</span>
        </button>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialType={authType}
        initialMode={authMode}
      />
    </>
  )
}
