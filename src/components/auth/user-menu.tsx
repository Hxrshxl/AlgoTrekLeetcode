"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut, Settings, BarChart3, Calendar } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  if (!user) return null

  const userInitials =
    user.user_metadata?.full_name
      ?.split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase() || user.email?.[0].toUpperCase()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-algotrek-aqua/10 text-algotrek-aqua font-semibold hover:bg-algotrek-aqua/20 transition-colors flex items-center justify-center"
      >
        {userInitials}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-12 z-20 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-algotrek-dark-blue">{user.user_metadata?.full_name || "User"}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-gray-700">
                  <BarChart3 className="w-4 h-4 mr-3" />
                  Dashboard
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-3" />
                  My Schedule
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-gray-700">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </button>
              </div>

              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
