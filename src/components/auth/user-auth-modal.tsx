"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, AlertTriangle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase/client"

interface UserAuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "signin" | "signup"
}

export function UserAuthModal({ isOpen, onClose, initialMode = "signin" }: UserAuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [userExists, setUserExists] = useState(false)

  const { signIn, signUp } = useAuth()

  useEffect(() => {
    // Check if a regular user already exists
    const checkUserExists = async () => {
      try {
        const exists = await supabase.auth.checkUserExists()
        setUserExists(exists)
      } catch (err) {
        console.error("Error checking user existence:", err)
      }
    }

    if (isOpen) {
      checkUserExists()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (mode === "signin") {
        const { error } = await signIn(email, password, "user")
        if (error) {
          setError(error.message)
        } else {
          onClose()
        }
      } else if (mode === "signup") {
        if (userExists) {
          setError("Only one user account is allowed. Please contact admin if you need access.")
          setLoading(false)
          return
        }

        const { error } = await signUp(email, password, fullName, "user")
        if (error) {
          setError(error.message)
        } else {
          setSuccess("Account created successfully! You can now sign in.")
          setTimeout(() => {
            setMode("signin")
            setSuccess("")
          }, 2000)
        }
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setFullName("")
    setError("")
    setSuccess("")
    setShowPassword(false)
  }

  const switchMode = (newMode: "signin" | "signup") => {
    setMode(newMode)
    resetForm()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-algotrek-dark-blue">
                    {mode === "signin" ? "User Login" : "Create User Account"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {mode === "signin" ? "Sign in to your account" : "Join AlgoTrek as a user"}
                  </p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {userExists && mode === "signup" && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 text-sm font-medium">User Account Limit Reached</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      Only one user account is allowed. Please contact the administrator if you need access.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-algotrek-aqua focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                        disabled={userExists}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-algotrek-aqua focus:border-transparent"
                      placeholder="Enter your email"
                      required
                      disabled={userExists && mode === "signup"}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-algotrek-aqua focus:border-transparent"
                      placeholder="Enter your password"
                      required
                      minLength={6}
                      disabled={userExists && mode === "signup"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || (userExists && mode === "signup")}
                  className="w-full bg-algotrek-aqua text-algotrek-dark-blue py-3 rounded-lg font-semibold hover:bg-algotrek-aqua/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>{mode === "signin" ? "Sign In" : "Create Account"}</>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                {mode === "signin" && !userExists && (
                  <p className="text-gray-600 text-sm">
                    {"Don't have an account?"}{" "}
                    <button
                      onClick={() => switchMode("signup")}
                      className="text-algotrek-aqua hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                )}

                {mode === "signup" && (
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <button
                      onClick={() => switchMode("signin")}
                      className="text-algotrek-aqua hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
