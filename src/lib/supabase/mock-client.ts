// Mock Supabase client with admin/user separation
// In a real application, you would use the actual @supabase/supabase-js package

export interface User {
  id: string
  email?: string
  role: "admin" | "user"
  user_metadata?: {
    full_name?: string
    [key: string]: any
  }
}

export interface Session {
  user: User
  access_token: string
}

export interface AuthResponse {
  data?: {
    user?: User | null
    session?: Session | null
  }
  error?: {
    message: string
  } | null
}

class MockSupabaseClient {
  private users: Map<string, { email: string; password: string; role: "admin" | "user"; user_metadata: any }> =
    new Map()
  private currentUser: User | null = null
  private currentSession: Session | null = null
  private listeners: Array<(event: string, session: Session | null) => void> = []
  private regularUserExists = false

  constructor() {
    // Pre-populate with admin user
    this.users.set("admin@algotrek.com", {
      email: "admin@algotrek.com",
      password: "admin123",
      role: "admin",
      user_metadata: { full_name: "Admin User" },
    })

    // Add a test regular user for demo
    this.users.set("user@algotrek.com", {
      email: "user@algotrek.com",
      password: "user123",
      role: "user",
      user_metadata: { full_name: "Test User" },
    })

    this.regularUserExists = true // Since we have a test user

    // Add console log for debugging
    console.log("Mock client initialized with users:", Array.from(this.users.keys()))
  }

  auth = {
    getSession: async (): Promise<{ data: { session: Session | null } }> => {
      return { data: { session: this.currentSession } }
    },

    signUp: async ({
      email,
      password,
      options,
    }: {
      email: string
      password: string
      options?: { data?: any; userType?: "admin" | "user" }
    }): Promise<AuthResponse> => {
      const userType = options?.userType || "user"

      if (this.users.has(email)) {
        return { error: { message: "User already exists" } }
      }

      // Check if trying to create a regular user when one already exists
      if (userType === "user" && this.regularUserExists) {
        return { error: { message: "Only one regular user is allowed. Please contact admin." } }
      }

      // Prevent non-admin email from creating admin account
      if (userType === "admin" && !email.includes("admin")) {
        return { error: { message: "Invalid admin credentials" } }
      }

      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role: userType,
        user_metadata: options?.data || {},
      }

      this.users.set(email, {
        email,
        password,
        role: userType,
        user_metadata: options?.data || {},
      })

      if (userType === "user") {
        this.regularUserExists = true
      }

      const session: Session = {
        user,
        access_token: "mock-token",
      }

      this.currentUser = user
      this.currentSession = session

      // Notify listeners
      this.listeners.forEach((listener) => listener("SIGNED_IN", session))

      return { data: { user, session } }
    },

    signInWithPassword: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }): Promise<AuthResponse> => {
      console.log("Attempting login with:", { email, password })

      const userData = this.users.get(email)
      console.log("Found user data:", userData)

      if (!userData) {
        console.log("User not found")
        return { error: { message: "User not found" } }
      }

      if (userData.password !== password) {
        console.log("Password mismatch:", { expected: userData.password, provided: password })
        return { error: { message: "Invalid password" } }
      }

      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role: userData.role,
        user_metadata: userData.user_metadata,
      }

      const session: Session = {
        user,
        access_token: "mock-token",
      }

      this.currentUser = user
      this.currentSession = session

      console.log("Login successful:", { user, session })

      // Notify listeners
      this.listeners.forEach((listener) => listener("SIGNED_IN", session))

      return { data: { user, session } }
    },

    signOut: async (): Promise<{ error: null }> => {
      this.currentUser = null
      this.currentSession = null

      // Notify listeners
      this.listeners.forEach((listener) => listener("SIGNED_OUT", null))

      return { error: null }
    },

    resetPasswordForEmail: async (email: string, options?: any): Promise<AuthResponse> => {
      if (!this.users.has(email)) {
        return { error: { message: "User not found" } }
      }

      // In a real app, this would send an email
      console.log(`Password reset email would be sent to: ${email}`)
      return { data: {} }
    },

    updateUser: async ({ password }: { password: string }): Promise<AuthResponse> => {
      if (!this.currentUser?.email) {
        return { error: { message: "No user logged in" } }
      }

      const userData = this.users.get(this.currentUser.email)
      if (userData) {
        userData.password = password
        this.users.set(this.currentUser.email, userData)
      }

      return { data: { user: this.currentUser } }
    },

    onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
      this.listeners.push(callback)

      return {
        data: {
          subscription: {
            unsubscribe: () => {
              const index = this.listeners.indexOf(callback)
              if (index > -1) {
                this.listeners.splice(index, 1)
              }
            },
          },
        },
      }
    },

    // Helper method to check if regular user exists
    checkUserExists: async (): Promise<boolean> => {
      return this.regularUserExists
    },

    // Helper method to get all users (admin only)
    getAllUsers: async (): Promise<Array<{ email: string; role: string; user_metadata: any }>> => {
      if (this.currentUser?.role !== "admin") {
        throw new Error("Unauthorized")
      }
      return Array.from(this.users.values())
    },
  }
}

export function createClient(url: string, key: string) {
  return new MockSupabaseClient()
}

// Create and export the mock client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "mock-url"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "mock-key"

let supabaseClient: MockSupabaseClient | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey) as MockSupabaseClient
  }
  return supabaseClient
}

export const supabase = getSupabaseClient()
