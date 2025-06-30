"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Shield, Users, BarChart3, Settings, Activity, Lock } from "lucide-react"
import { DatabaseViewer } from "@/components/admin/database-viewer"

export default function SecureAdminDashboard() {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, loading, isAdmin, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="font-bold text-2xl mb-4 text-white">
            <span className="text-red-400">Admin</span>
            <span className="text-gray-300"> Portal</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">Secure Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Protected Route: /admin/8530085300/dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-white font-medium">
                  {isAdmin ? "AlgoTrek Admin" : user?.user_metadata?.full_name || "Admin"}
                </div>
                <div className="text-gray-400 text-sm">{isAdmin ? "admin@algotrek.com" : user?.email}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 font-semibold flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Total Users</h3>
                <div className="text-3xl font-bold text-red-400 mt-2">1</div>
                <p className="text-gray-400 text-sm">Active user account</p>
              </div>
              <Users className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Problems Solved</h3>
                <div className="text-3xl font-bold text-blue-400 mt-2">245</div>
                <p className="text-gray-400 text-sm">Total across platform</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Active Sessions</h3>
                <div className="text-3xl font-bold text-green-400 mt-2">1</div>
                <p className="text-gray-400 text-sm">Current active users</p>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">System Status</h3>
                <div className="text-lg font-bold text-green-400 mt-2">Healthy</div>
                <p className="text-gray-400 text-sm">All systems operational</p>
              </div>
              <Settings className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">User Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-white">Regular User</div>
                  <div className="text-sm text-gray-400">1 account allowed</div>
                </div>
                <div className="text-sm text-green-400 font-medium">Active</div>
              </div>
              <div className="text-sm text-gray-400">
                Only one regular user account is permitted on the platform. Contact system administrator to modify this
                limit.
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <div className="text-sm">
                  <div className="font-medium text-white">User logged in</div>
                  <div className="text-gray-400">2 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Problem solved</div>
                  <div className="text-gray-400">15 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <div className="text-sm">
                  <div className="font-medium text-white">Schedule generated</div>
                  <div className="text-gray-400">1 hour ago</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Two-Factor Authentication</span>
                <span className="text-green-400 text-sm">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Session Timeout</span>
                <span className="text-gray-400 text-sm">30 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">IP Restrictions</span>
                <span className="text-yellow-400 text-sm">Configured</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">System Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">CPU Usage</span>
                <span className="text-green-400 text-sm">23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Memory Usage</span>
                <span className="text-blue-400 text-sm">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Disk Space</span>
                <span className="text-yellow-400 text-sm">67%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Network I/O</span>
                <span className="text-purple-400 text-sm">12 MB/s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Database Viewer */}
        <div className="mt-8">
          <DatabaseViewer />
        </div>

        {/* Admin Actions */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Admin Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Reset User Data
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Generate Reports
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Backup System
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
