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

    let { data: product } = await supabase.from("product").select("*").eq("id", params.id).single()

    if (!product) product = {}

    let sizes = stringToArray(product.size)

    let { data: products } = await supabase.from("product").select("*").eq("category", product.category)

    if (!products) products = []

    return (
        <div className="bg-white rounded-lg h-full w-full text-black">
            <Navbar activeItem="Productos" />
            <div className="grid grid-cols-2 gap-2 py-8">
                    <CustomImage product={product}/>
                <div className="pr-16">
                    <div className="flex flex-row items-center">
                        <h1 className="text-2xl font-extrabold">{product.name}</h1>
                        <div className={"px-2 py-1 ml-2 bg-[#0063C11A]" + (product.stock > 0 ? "" : "hidden")}>
                            En Stock
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="flex items-center justify-center gap-4">
                        <p className="text-sm">Compartir Producto</p>

                        <a href={"https://www.facebook.com/sharer/sharer.php?u=" + process.env.VERCEL_URL + "/product/" + params.id} className="hover:bg-[#0063C1CC] w-8 h-8 flex justify-center items-center rounded-full invert hover:filter-none transition duration-200" target="_blank">
                            <Image src={"/images/facebook.png"} width={15} height={15} alt="Facebook Logo" className="transition duration-200" />
                        </a>
                        <a href={"https://twitter.com/intent/tweet?text=%C2%A1Ey,%20encontr%C3%A9%20este%20producto%20genial!%0A%0A" + process.env.VERCEL_URL + "/product/" + params.id} className="hover:bg-[#1DA1F2] w-8 h-8 flex justify-center items-center rounded-full group" target="_blank">
                            <Image src={"/images/twitter.png"} width={15} height={15} alt="Twitter Logo" className="group-hover:invert transition duration-200" />
                        </a>
                        <a href={"https://www.instagram.com/?url=" + process.env.VERCEL_URL + "/product/" + params.id} className="hover:bg-[#E1306C] w-8 h-8 flex justify-center items-center rounded-full group" target="_blank">
                            <Image src={"/images/instagram.png"} width={15} height={15} alt="Instagram Logo" className="group-hover:invert transition duration-200" />
                        </a>
                    </div>
                    <p className="text-neutral-600 text-sm py-4">{product.description}</p>
                    <div className="flex flex-row justify-between">
                        <p className="font-medium">Precio</p>
                        <div className={product.reduced_price ? "flex flex-row gap-1" : ""}>
                            <p className={(product.reduced_price ? " text-red-700 line-through" : "")}>S/ {convertToFloatWithTwoDecimals(product.price)}</p><p className={product.reduced_price ? "font-bold" : "hidden"}> {product.reduced_price ? "S/ " + product.reduced_price : ""}</p>
                        </div>
                    </div>
                    {
                        sizes.length > 1 ? (
                            <div className="py-4">
                                <Select sizes={sizes} />
                            </div>
                        ) : ""
                    }
                    <div className="py-4 flex justify-between">
                        <div className="flex justify-center items-center text-center">
                            <input min={1} max={10} type="number" className="border-[#0063C1] border-2 rounded-xl text-center py-2" placeholder="1" required />
                        </div>
                        <a className="flex flex-row gap-4 border-2 border-[#0063C1] rounded-xl text-center px-8 py-2 hover:bg-[#0063C1] hover:text-white group transition duration-200" href="#">
                            <Image src={"/images/cart.png"} width={25} height={25} alt="Cart Logo" className="group-hover:invert transition duration-200" />
                            <p>Añadir al carrito</p>
                        </a>
                    </div>
                </div>
            </div>
            <hr className="mx-4" />
            <div className="py-8 px-8">
                <h3 className="font-bold">
                    Descripción
                </h3>
                <p style={
                    {
                        whiteSpace: "pre-line",
                    }
                }>
                    {product.large_description}
                </p>
                <br />
                <div className="py-4 grid grid-cols-5 gap-5">
                    {products.map((product) => (
                        <Product key={product.id} product={product} name={product.name} price={product.price} url={('/product/' + product.id)} reduced_price={product.reduced_price} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductPage;