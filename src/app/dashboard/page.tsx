import Sidebar from "@/components/Sidebar";
import Image from "next/image";

const Dashboard = () => {

    return ( 
        <Sidebar>
            <div className="w-full h-full flex items-center justify-center text-black mt-8 flex-col">
                <h1 className=" text-3xl font-bold">Bienvenido a la intranet de Sport Center</h1>
                <p className="mx-24 my-12">Como nuevo administrador, tienes acceso a una amplia gama de herramientas y funciones que te permitirán gestionar el contenido de la intranet. Estas son algunas de las tareas que puedes realizar:</p>
                <div className="flex flex-row justify-center items-center px-24 gap-8">
                    <Image src={"/images/paquete.png"} width={100} height={100} alt="Imagen"/>
                    <div className="bg-[#0063C124] rounded-md p-8">
                        <p>Ver, editar, agregar y eliminar productos: Puedes gestionar el catálogo de productos de la empresa, desde la creación de nuevos productos hasta la actualización de información existente.</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center px-24 gap-8">
                    
                <div className="bg-[#0063C124] rounded-md p-8 my-8">
                        <p>Añadir y eliminar usuarios: Puedes gestionar los permisos y accesos de los usuarios de la intranet, desde la creación de nuevos usuarios hasta la eliminación de usuarios existentes.</p>
                    </div>
                    <Image src={"/images/usuario.png"} width={100} height={100} alt="Imagen"/>
                </div>

                <p className="text-[#0063C1]">
                ¡Te deseamos mucho éxito en tu nuevo rol!
                </p>
            </div>

        </Sidebar>
     );
}
 
export default Dashboard;