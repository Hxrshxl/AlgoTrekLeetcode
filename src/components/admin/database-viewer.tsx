"use client"

import { useState, useEffect } from "react"
import { Database, Users, RefreshCw, Calendar, Mail, User, Shield } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "@/contexts/auth-context"

interface UserRecord {
  id: string
  email: string
  role: "admin" | "user"
  user_metadata: {
    full_name?: string
    [key: string]: any
  }
  created_at: string
  last_sign_in: string
  status: "active" | "inactive"
}

export function DatabaseViewer() {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTable, setSelectedTable] = useState("auth.users")
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (isAdmin()) {
      fetchUsers()
    }
  }, [isAdmin])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      // Get all users from mock client
      const allUsers = await supabase.auth.getAllUsers()

      // Transform to match Supabase format
      const userRecords: UserRecord[] = allUsers.map((user, index) => ({
        id: `user_${index + 1}`,
        email: user.email,
        role: user.role,
        user_metadata: user.user_metadata,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        last_sign_in: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: "active",
      }))

      setUsers(userRecords)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getRoleColor = (role: string) => {
    return role === "admin" ? "text-red-600 bg-red-50" : "text-blue-600 bg-blue-50"
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "text-green-600 bg-green-50" : "text-gray-600 bg-gray-50"
  }

  if (!isAdmin()) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-600">Only administrators can view the database.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Database className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Database Viewer</h3>
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Table Selector */}
        <div className="mt-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTable("auth.users")}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                selectedTable === "auth.users" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              auth.users
            </button>
            <button
              onClick={() => setSelectedTable("public.profiles")}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                selectedTable === "public.profiles" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              public.profiles
            </button>
            <button
              onClick={() => setSelectedTable("public.user_progress")}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                selectedTable === "public.user_progress"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              public.user_progress
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading database records...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Sign In
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                    >
                      {user.role === "admin" ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.user_metadata?.full_name || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-1 ${user.status === "active" ? "bg-green-400" : "bg-gray-400"}`}
                      ></div>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {formatDate(user.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      {formatDate(user.last_sign_in)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{users.length} records found</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              <span>Admin ({users.filter((u) => u.role === "admin").length})</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              <span>User ({users.filter((u) => u.role === "user").length})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
