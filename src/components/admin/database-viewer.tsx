"use client"

import { useState, useEffect } from "react"
import { Database, Table, Users, Building2, RefreshCw, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

interface Profile {
  id: string
  email: string
  name: string | null
  role: string
  created_at: string
  updated_at: string
}

interface Company {
  id: number
  name: string
  industry: string
  size: string
  location: string
  description: string | null
  created_at: string
}

export function DatabaseViewer() {
  const [activeTab, setActiveTab] = useState<"profiles" | "companies">("profiles")
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfiles = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setProfiles(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profiles")
    } finally {
      setLoading(false)
    }
  }

  const fetchCompanies = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.from("companies").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setCompanies(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch companies")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === "profiles") {
      fetchProfiles()
    } else {
      fetchCompanies()
    }
  }, [activeTab])

  const handleRefresh = () => {
    if (activeTab === "profiles") {
      fetchProfiles()
    } else {
      fetchCompanies()
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Database className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-xl font-semibold text-white">Database Viewer</h3>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mt-4 bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("profiles")}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "profiles" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-600"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Profiles ({profiles.length})
          </button>
          <button
            onClick={() => setActiveTab("companies")}
            className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "companies" ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white hover:bg-gray-600"
            }`}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Companies ({companies.length})
          </button>
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/20 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 text-blue-400 animate-spin mr-2" />
            <span className="text-gray-400">Loading data...</span>
          </div>
        ) : (
          <>
            {activeTab === "profiles" && (
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <Table className="w-5 h-5 text-gray-400 mr-2" />
                  <h4 className="text-lg font-medium text-white">User Profiles</h4>
                </div>

                {profiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">No profiles found in the database.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-300">ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Email</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Role</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profiles.map((profile) => (
                          <tr key={profile.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                            <td className="py-3 px-4 text-gray-400 font-mono text-xs">{profile.id.slice(0, 8)}...</td>
                            <td className="py-3 px-4 text-white">{profile.email}</td>
                            <td className="py-3 px-4 text-gray-300">{profile.name || "N/A"}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  profile.role === "admin"
                                    ? "bg-red-900/20 text-red-400"
                                    : "bg-blue-900/20 text-blue-400"
                                }`}
                              >
                                {profile.role}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-400">
                              {new Date(profile.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "companies" && (
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <Table className="w-5 h-5 text-gray-400 mr-2" />
                  <h4 className="text-lg font-medium text-white">Companies</h4>
                </div>

                {companies.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">No companies found in the database.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-300">ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Industry</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Size</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Location</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-300">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies.map((company) => (
                          <tr key={company.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                            <td className="py-3 px-4 text-gray-400 font-mono">{company.id}</td>
                            <td className="py-3 px-4 text-white font-medium">{company.name}</td>
                            <td className="py-3 px-4 text-gray-300">{company.industry}</td>
                            <td className="py-3 px-4 text-gray-300">{company.size}</td>
                            <td className="py-3 px-4 text-gray-300">{company.location}</td>
                            <td className="py-3 px-4 text-gray-400">
                              {new Date(company.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
