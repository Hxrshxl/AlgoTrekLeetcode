"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Shield, Users, BarChart3, Settings, Activity } from "lucide-react"

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, loading, isAdmin, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="font-bold text-2xl mb-4">
            <span className="text-algotrek-aqua">Algo</span>
            <span className="text-algotrek-pink">Trek</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-algotrek-dark-blue">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage AlgoTrek platform and users</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
                <div className="text-3xl font-bold text-red-600 mt-2">1</div>
                <p className="text-gray-600 text-sm">Active user account</p>
              </div>
              <Users className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Problems Solved</h3>
                <div className="text-3xl font-bold text-algotrek-aqua mt-2">245</div>
                <p className="text-gray-600 text-sm">Total across platform</p>
              </div>
              <BarChart3 className="w-8 h-8 text-algotrek-aqua" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
                <div className="text-3xl font-bold text-green-600 mt-2">1</div>
                <p className="text-gray-600 text-sm">Current active users</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
                <div className="text-lg font-bold text-green-600 mt-2">Healthy</div>
                <p className="text-gray-600 text-sm">All systems operational</p>
              </div>
              <Settings className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Regular User</div>
                  <div className="text-sm text-gray-600">1 account allowed</div>
                </div>
                <div className="text-sm text-green-600 font-medium">Active</div>
              </div>
              <div className="text-sm text-gray-600">
                Only one regular user account is permitted on the platform. Contact system administrator to modify this
                limit.
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div className="text-sm">
                  <div className="font-medium">User logged in</div>
                  <div className="text-gray-600">2 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div className="text-sm">
                  <div className="font-medium">Problem solved</div>
                  <div className="text-gray-600">15 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-algotrek-aqua rounded-full mr-3"></div>
                <div className="text-sm">
                  <div className="font-medium">Schedule generated</div>
                  <div className="text-gray-600">1 hour ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
