"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { User, LogOut, Settings, ChevronDown } from "lucide-react"

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAdmin, signOut } = useAuth()

  if (!user && !isAdmin) return null

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  const displayName = isAdmin ? "AlgoTrek Admin" : user?.user_metadata?.name || user?.email || "User"

  const displayEmail = isAdmin ? "admin@algotrek.com" : user?.email || ""

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 bg-algotrek-aqua rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{displayName}</p>
          <p className="text-xs text-gray-500">{displayEmail}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{displayName}</p>
              <p className="text-xs text-gray-500">{displayEmail}</p>
              {isAdmin && (
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-algotrek-dark-blue text-white rounded">
                  Admin
                </span>
              )}
            </div>
            <div className="py-1">
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
