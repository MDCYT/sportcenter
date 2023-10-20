import Sidebar from "@/components/Sidebar";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import CreateEmployeeButton from "./components/CreateEmployeeButton";

import Employee from "./components/Employee";

const Dashboard = async () => {


    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    let { data: profiles } = await supabase.from("profiles").select("*").eq("role", 2)

    if (!profiles) profiles = []

    return (
        <Sidebar>
            <div className="w-full h-full flex items-center justify-center text-black mt-8 flex-col">
                <h1 className=" text-3xl font-bold">Bienvenido a empleados de Sport Center</h1>
                <p className=" text-neutral-700">En esta parte prodras tener todo el control de los empleados</p>
                <CreateEmployeeButton/>
                <div className="shadow overflow-hidden rounded border-b border-gray-200">

                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-3/12 text-left py-3 px-4 uppercase font-semibold text-sm">Codigo</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">Nombres</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">A. Paterno</th>
                                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">A. Materno</th>
                                <th className="w-3/12 text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {profiles.map((profile) => {
                                return (
                                    <Employee employee={profile} key={profile.id} />
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