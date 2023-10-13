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
        Relationships: []
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
          document_id: number | null
          id: string
          last_name_1: string | null
          last_name_2: string | null
          name: string | null
          role: number
          type_document: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          document_id?: number | null
          id: string
          last_name_1?: string | null
          last_name_2?: string | null
          name?: string | null
          role?: number
          type_document?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          document_id?: number | null
          id?: string
          last_name_1?: string | null
          last_name_2?: string | null
          name?: string | null
          role?: number
          type_document?: number | null
          updated_at?: string | null
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
