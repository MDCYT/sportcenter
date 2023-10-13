import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ProductDetails } from '../../types';

const useLoadImage = (product: ProductDetails) => {
    const supabaseClient = useSupabaseClient();

    if (!product) {
        return null
    }

    if(!product.image_url) {
        return "/images/template.png"
    }

    const { data: imageData } = supabaseClient
        .storage
        .from('products')
        .getPublicUrl(product.image_url)

    return imageData.publicUrl
}

export default useLoadImage