import Carousel from "@/components/Carousel";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavbarComponent";
import Product from "@/components/Product";
import { EmblaOptionsType } from 'embla-carousel-react'

import Image from "next/image";

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Shop = async () => {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    let { data: products } = await supabase.from("product").select("*")

    if(!products) products = []

    return (
        <div className="bg-white rounded-lg h-full w-full text-black">
            <Navbar activeItem="Productos" />
            <Carousel slides={SLIDES} options={OPTIONS} />
            <div className="px-8 w-full">
                <h3 className="py-4 font-medium text-lg">Productos mas vendidos</h3>
                <hr className="border-[#0063C1] border-4 w-64 rounded-md" />
                <div className="py-4 grid grid-cols-5 gap-5">
                    <Product name="Nike Dri-FIT Miler" price={250} url="/product/1" image="/images/template.png" />
                    <Product name="Nike Dri-FIT Miler" price={250} url="/product/1" image="/images/template.png" />
                    <Product name="Nike Dri-FIT Miler" price={250} url="/product/1" image="/images/template.png" />
                    <Product name="Nike Dri-FIT Miler" price={250} url="/product/1" image="/images/template.png" />
                    <Product name="Nike Dri-FIT Miler" price={250} url="/product/1" image="/images/template.png" />
                </div>
            </div>
            <br />
            <div className="px-8 w-full">
                <h3 className="py-4 font-medium text-lg">Todos los productos</h3>
                <hr className="border-[#0063C1] border-4 w-64 rounded-md" />
                <div className="py-4 grid grid-cols-5 gap-5"> 
                    {products.map((product) => (
                        <Product key={product.id} image={product.image || "/images/template.png"} name={product.name} price={product.price} url={('/product/' + product.id)} reduced_price={product.reduced_price} />
                    ))}
                </div>
            </div>
            <div
                className="flex flex-col items-center justify-center bg-[url('/images/bg.png')] bg-no-repeat bg-auto bg-center bg-[#0063C1] text-white py-10 h-[75vh]">
                <div className="w-2/6 items-center flex flex-col">
                    <h2 className="text-4xl font-bold text-center">¿Estás interesado en comprar nuestra ropa deportiva al por mayor?</h2>
                    <p className="text-center text-sm py-4">
                        Contáctanos por WhatsApp para obtener más información sobre nuestros precios y descuentos especiales para empresas.
                    </p>
                    <a href={"/contact"}
                        className={'bg-white text-black hover:bg-gray-700 hover:text-white rounded-3xl px-8 py-2 font-medium transition-color duration-200 text-center mt-4 flex flex-row items-center justify-center group'
                        }
                    >
                        <Image src={'/images/whatsapp.svg'} width={20} height={20} alt="WhatsApp Logo" className="text-black invert group-hover:filter-none" color="black" />
                        <p className="px-3">Contactanos via WhatsApp</p>
                    </a>
                </div>
            </div>
            <div className="bg-white h-96 min-w-full flex items-center content-center justify-center text-center">
                <div className="flex flex-col">
                    <h3 className="w-full text-center text-slate-600 text-2xl font-bold">Marcas que nos respaldan</h3>
                    <div className="grid grid-cols-4 gap-4 py-8">
                        <Image src={"/images/adidas.png"} alt="Logo" width={200} height={200}/>
                        <Image src={"/images/nike.png"} alt="Logo" width={200} height={200}/>
                        <Image src={"/images/puma.png"} alt="Logo" width={200} height={200}/>
                        <Image src={"/images/reebok.png"} alt="Logo" width={200} height={200}/>

                    </div>
                </div>
            </div>
            <Contact />
            <Footer />
        </div>
    );
}

export default Shop;