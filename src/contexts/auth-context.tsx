"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  adminSignIn: (email: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock admin credentials
const ADMIN_CREDENTIALS = {
  email: "admin@algotrek.com",
  password: "admin123",
  userData: {
    id: "admin-001",
    email: "admin@algotrek.com",
    name: "AlgoTrek Admin",
    role: "admin",
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)

      // Check if admin is logged in from localStorage
      const adminSession = localStorage.getItem("admin_session")
      if (adminSession) {
        const adminData = JSON.parse(adminSession)
        if (adminData.email === ADMIN_CREDENTIALS.email) {
          setIsAdmin(true)
        }
      }

      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    })

    // If signup is successful and user is confirmed, create profile
    if (data.user && !error) {
      try {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            email: data.user.email,
            name: userData?.name || data.user.email,
          },
        ])

        if (profileError) {
          console.error("Error creating profile:", profileError)
        }
      } catch (err) {
        console.error("Profile creation failed:", err)
      }
    }

    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    // Clear admin session if exists
    localStorage.removeItem("admin_session")
    setIsAdmin(false)

    // Sign out from Supabase
    await supabase.auth.signOut()
  }

  const adminSignIn = async (email: string, password: string): Promise<boolean> => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Store admin session in localStorage
      localStorage.setItem("admin_session", JSON.stringify(ADMIN_CREDENTIALS.userData))
      setIsAdmin(true)
      return true
    }
    return false
  }

  const value = {
    user,
    session,
    loading,
    isAdmin,
    signUp,
    signIn,
    signOut,
    adminSignIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
