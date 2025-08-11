export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          role: 'user' | 'facility_owner' | 'admin'
          status: 'active' | 'banned'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          avatar_url?: string | null
          role?: 'user' | 'facility_owner' | 'admin'
          status?: 'active' | 'banned'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role?: 'user' | 'facility_owner' | 'admin'
          status?: 'active' | 'banned'
          created_at?: string
          updated_at?: string
        }
      }
      facilities: {
        Row: {
          id: string
          name: string
          description: string
          address: string
          owner_id: string
          sports: string[]
          amenities: string[]
          photos: string[]
          rating: number
          review_count: number
          status: 'pending' | 'approved' | 'rejected'
          price_min: number
          price_max: number
          latitude: number
          longitude: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          address: string
          owner_id: string
          sports?: string[]
          amenities?: string[]
          photos?: string[]
          rating?: number
          review_count?: number
          status?: 'pending' | 'approved' | 'rejected'
          price_min: number
          price_max: number
          latitude: number
          longitude: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          address?: string
          owner_id?: string
          sports?: string[]
          amenities?: string[]
          photos?: string[]
          rating?: number
          review_count?: number
          status?: 'pending' | 'approved' | 'rejected'
          price_min?: number
          price_max?: number
          latitude?: number
          longitude?: number
          created_at?: string
          updated_at?: string
        }
      }
      courts: {
        Row: {
          id: string
          facility_id: string
          name: string
          sport_type: string
          price_per_hour: number
          operating_hours_start: string
          operating_hours_end: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          facility_id: string
          name: string
          sport_type: string
          price_per_hour: number
          operating_hours_start: string
          operating_hours_end: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          facility_id?: string
          name?: string
          sport_type?: string
          price_per_hour?: number
          operating_hours_start?: string
          operating_hours_end?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          facility_id: string
          court_id: string
          booking_date: string
          start_time: string
          end_time: string
          status: 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          payment_status: 'pending' | 'paid' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          facility_id: string
          court_id: string
          booking_date: string
          start_time: string
          end_time: string
          status?: 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          payment_status?: 'pending' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          facility_id?: string
          court_id?: string
          booking_date?: string
          start_time?: string
          end_time?: string
          status?: 'confirmed' | 'cancelled' | 'completed'
          total_price?: number
          payment_status?: 'pending' | 'paid' | 'refunded'
          created_at?: string
          updated_at?: string
        }
      }
      time_slots: {
        Row: {
          id: string
          court_id: string
          slot_date: string
          start_time: string
          end_time: string
          is_available: boolean
          is_blocked: boolean
          block_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          court_id: string
          slot_date: string
          start_time: string
          end_time: string
          is_available?: boolean
          is_blocked?: boolean
          block_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          court_id?: string
          slot_date?: string
          start_time?: string
          end_time?: string
          is_available?: boolean
          is_blocked?: boolean
          block_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          facility_id: string
          rating: number
          comment: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          facility_id: string
          rating: number
          comment: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          facility_id?: string
          rating?: number
          comment?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'user' | 'facility_owner' | 'admin'
      user_status: 'active' | 'banned'
      facility_status: 'pending' | 'approved' | 'rejected'
      booking_status: 'confirmed' | 'cancelled' | 'completed'
      payment_status: 'pending' | 'paid' | 'refunded'
    }
  }
}