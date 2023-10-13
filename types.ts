export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
}

export interface ProductDetails {
    id: number;
    name: string;
    description?: string;
    large_description?: string;
    price: number;
    reduced_price?: number;
    size?: string;
    stock: number;
    category?: number;
    image_url?: string;
}

export interface ProfileDetails {
    id: number;
    avatar_url?: string;
    name: string
    last_name_1: string;
    last_name_2?: string;
    type_document: string;
    document_id: string;
    role: number
}