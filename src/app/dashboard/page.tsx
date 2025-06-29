"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="font-bold text-2xl mb-4">
            <span className="text-algotrek-aqua">Algo</span>
            <span className="text-algotrek-pink">Trek</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-algotrek-aqua mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-algotrek-dark-blue">
            Welcome back, {user.user_metadata?.full_name || "Developer"}!
          </h1>
          <p className="text-gray-600 mt-2">Continue your coding interview preparation journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-algotrek-dark-blue mb-4">Your Progress</h3>
            <div className="text-3xl font-bold text-algotrek-aqua mb-2">245</div>
            <p className="text-gray-600">Problems Solved</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-algotrek-dark-blue mb-4">Current Streak</h3>
            <div className="text-3xl font-bold text-algotrek-pink mb-2">15</div>
            <p className="text-gray-600">Days</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-algotrek-dark-blue mb-4">Interview Ready</h3>
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <p className="text-gray-600">Overall Score</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-algotrek-dark-blue mb-4">Today's Schedule</h3>
          <p className="text-gray-600">Your personalized AI schedule will appear here once you complete the setup.</p>
        </div>
      </div>
    </div>
  )
}
