"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { UserMenu } from "@/components/auth/user-menu"
import { useAuth } from "@/contexts/auth-context"
import { BarChart2, Calendar, Target, TrendingUp, Award, Clock } from "lucide-react"

export default function UserDashboard() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-bold text-2xl">
                <span className="text-algotrek-aqua">Algo</span>
                <span className="text-algotrek-pink">Trek</span>
              </div>
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.user_metadata?.name || "User"}!
            </h1>
            <p className="text-gray-600">Continue your coding interview preparation journey.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Problems Solved</p>
                  <p className="text-2xl font-bold text-algotrek-aqua">245</p>
                </div>
                <BarChart2 className="w-8 h-8 text-algotrek-aqua" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-algotrek-pink">15 days</p>
                </div>
                <TrendingUp className="w-8 h-8 text-algotrek-pink" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">85%</p>
                </div>
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Spent</p>
                  <p className="text-2xl font-bold text-blue-600">42h</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today's Schedule */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-algotrek-aqua" />
                  Today's Schedule
                </h2>
                <span className="text-sm text-gray-500">Nov 25, 2024</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-algotrek-aqua/5 rounded-lg border border-algotrek-aqua/20">
                  <div className="w-3 h-3 bg-algotrek-aqua rounded-full mr-4"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Dynamic Programming - Medium</h3>
                    <p className="text-sm text-gray-600">Complete 3 problems • Est. 45 min</p>
                  </div>
                  <button className="bg-algotrek-aqua text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Start
                  </button>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Trees & Graphs - Hard</h3>
                    <p className="text-sm text-gray-600">Complete 2 problems • Est. 60 min</p>
                  </div>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                    Later
                  </button>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Mock Interview</h3>
                    <p className="text-sm text-gray-600">Google-style interview • Est. 45 min</p>
                  </div>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                    Schedule
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-algotrek-pink" />
                  Progress Overview
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>61%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-algotrek-aqua h-2 rounded-full" style={{ width: "61%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Easy Problems</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Medium Problems</span>
                      <span>58%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "58%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hard Problems</span>
                      <span>26%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "26%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Company Readiness</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Google</span>
                    <span className="text-sm font-medium text-algotrek-aqua">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Amazon</span>
                    <span className="text-sm font-medium text-algotrek-pink">72%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Microsoft</span>
                    <span className="text-sm font-medium text-blue-600">68%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
