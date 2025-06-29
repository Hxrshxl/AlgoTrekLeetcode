// Mock client for development
import { supabase as mockSupabase } from "./mock-client"

export type User = {
  id: string
  email?: string
  role?: "admin" | "user"
  user_metadata?: {
    full_name?: string
    [key: string]: any
  }
}

export type Session = {
  user: User
  access_token: string
}

// Always use mock client for demo purposes
export const supabase = mockSupabase
