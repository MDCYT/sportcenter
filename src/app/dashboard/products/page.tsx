import Sidebar from "@/components/Sidebar";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import CreateProductButton from "./components/CreateProductButton";

import Product from "./components/Product";

const Dashboard = async () => {


    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    let { data: products } = await supabase.from("product").select("*")

    if (!products) products = []

    return (
        <Sidebar>
            <div className="w-full h-full flex items-center justify-center text-black mt-8 flex-col">
                <h1 className=" text-3xl font-bold">Bienvenido a productos de Sport Center</h1>
                <p className=" text-neutral-700">En esta parte prodras tener todo el control de los productos</p>
                <CreateProductButton />
                <div className="shadow overflow-hidden rounded border-b border-gray-200">

                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Codigo</th>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Imagen</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombre</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {products.map((product) => {
                                return (
                                    <Product product={product} key={product.id} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Sidebar>
    );
}

export default Dashboard;