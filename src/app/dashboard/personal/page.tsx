import Sidebar from "@/components/Sidebar";
import Image from "next/image";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Dashboard = async () => {

    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    let { data: empleados } = await supabase.from("employee").select("*")

    if (!empleados) empleados = []

    return (
        <Sidebar>
            <div className="w-full h-full flex items-center justify-center text-black mt-8 flex-col">
                <h1 className=" text-3xl font-bold">Bienvenido a empleados de Sport Center</h1>
                <p className=" text-neutral-700">En esta parte prodras tener todo el control de los empleados</p>
                <a href="/dashboard/personal/new" className="p-4 rounded-2xl bg-[#343434] hover:bg-black text-white transition duration-200 my-8">Añadir empleado</a>
                <div className="shadow overflow-hidden rounded border-b border-gray-200">

                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Codigo</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nombres</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Apellidos</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">DNI</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {empleados.map((empleado) => {
                                return (
                                    <tr key={empleado.id} className="text-center">
                                        <td className="w-1/3 py-3 px-4">{empleado.id}</td>
                                        <td className="py-3 px-4">{empleado.name}</td>
                                        <td className="py-3 px-4">{empleado.last_name_1} {empleado.last_name_2}</td>
                                        <td className="py-3 px-4">{empleado.name}</td>

                                        <td className="py-3 px-4 flex flex-row justify-center items-center">
                                            <a href={"/dashboard/personal/" + empleado.id + "/edit"}><Image src={"/images/edit.png"} width={20} height={20} alt="Edit logo" /></a><a href={"/dashboard/personal/" + empleado.id + "/delete"}><Image src={"/images/delete.png"} width={20} height={20} alt="Delete logo" /></a>
                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Sidebar>
    );
}

export default Dashboard;