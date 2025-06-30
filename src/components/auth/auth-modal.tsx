"use client"

import { useState } from "react"
import { UserAuthModal } from "./user-auth-modal"
import { AdminAuthModal } from "./admin-auth-modal"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialType?: "user" | "admin"
  initialMode?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, initialType = "user", initialMode = "login" }: AuthModalProps) {
  const [authType, setAuthType] = useState<"user" | "admin">(initialType)

  if (!isOpen) return null

  if (authType === "admin") {
    return <AdminAuthModal isOpen={isOpen} onClose={onClose} />
  }

  return <UserAuthModal isOpen={isOpen} onClose={onClose} initialMode={initialMode} />
}
