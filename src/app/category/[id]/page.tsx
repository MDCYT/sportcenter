import Navbar from "@/components/Navbar";

import Image from "next/image";
import CustomImage from "./components/Image"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { convertToFloatWithTwoDecimals, stringToArray } from "@/utils/utils";
import Select from "@/components/Select"

import Product from "@/components/Product";
import Footer from "@/components/Footer";


const ProductPage = async ({ params }: { params: { id: string } }) => {

    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    // Get Category
    let { data: categoryData, error: categoryError } = await supabase.from("category").select("*").eq("id", params.id).single()

    if (categoryError) location.replace("/")

    //Get all products with that id
    let { data: productsData, error: productsError } = await supabase.from("product").select("*").eq("category", categoryData.id)

    if (!productsData) productsData = []

    return (
        <div className="bg-white rounded-lg h-full w-full text-black">
            <Navbar activeItem="Productos" />
            <div className="py-8 px-8">
                <h3 className="font-bold text-5xl">
                    {categoryData.name}
                </h3>
                <p style={
                    {
                        whiteSpace: "pre-line",
                    }
                }>
                    {categoryData.description}
                </p>
                <br />
                <div className="py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                    {productsData.map((product) => (
                        <Product key={product.id} product={product} name={product.name} price={product.price} url={('/product/' + product.id)} reduced_price={product.reduced_price} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductPage;
