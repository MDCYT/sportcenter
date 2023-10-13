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
      category: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image: string | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string
        }
        Relationships: []
      }
      customer: {
        Row: {
          created_at: string
          id: string
          id_documentation: string
          inverted_last_name: boolean
          last_name_1: string
          last_name_2: string | null
          name: string
          type_documentation: number
        }
        Insert: {
          created_at?: string
          id: string
          id_documentation: string
          inverted_last_name?: boolean
          last_name_1?: string
          last_name_2?: string | null
          name?: string
          type_documentation?: number
        }
        Update: {
          created_at?: string
          id?: string
          id_documentation?: string
          inverted_last_name?: boolean
          last_name_1?: string
          last_name_2?: string | null
          name?: string
          type_documentation?: number
        }
        Relationships: [
          {
            foreignKeyName: "customer_id_fkey"
            columns: ["id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      employee: {
        Row: {
          created_at: string
          id: string
          id_documentation: string
          inverted_last_name: boolean
          last_name_1: string
          last_name_2: string | null
          name: string
          type_documentation: number
        }
        Insert: {
          created_at?: string
          id: string
          id_documentation: string
          inverted_last_name?: boolean
          last_name_1?: string
          last_name_2?: string | null
          name?: string
          type_documentation?: number
        }
        Update: {
          created_at?: string
          id?: string
          id_documentation?: string
          inverted_last_name?: boolean
          last_name_1?: string
          last_name_2?: string | null
          name?: string
          type_documentation?: number
        }
        Relationships: [
          {
            foreignKeyName: "employee_id_fkey"
            columns: ["id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      order: {
        Row: {
          created_at: string
          id: number
          products: number[]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          products?: number[]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          products?: number[]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "customer"
            referencedColumns: ["id"]
          }
        ]
      }
      product: {
        Row: {
          category: number | null
          created_at: string
          description: string
          id: number
          large_description: string
          name: string
          price: number
          reduced_price: number | null
          size: string | null
          stock: number
        }
        Insert: {
          category?: number | null
          created_at?: string
          description: string
          id?: number
          large_description: string
          name: string
          price: number
          reduced_price?: number | null
          size?: string | null
          stock: number
        }
        Update: {
          category?: number | null
          created_at?: string
          description?: string
          id?: number
          large_description?: string
          name?: string
          price?: number
          reduced_price?: number | null
          size?: string | null
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_category_fkey"
            columns: ["category"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
