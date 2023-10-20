"use client";

import Image from "next/image";
import { ProfileDetails } from "../../../../../types";
import useLoadImage from "@/hooks/useLoadImage"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import "./style.css"

import { useState } from "react";
interface EmployeeProps {
    employee: ProfileDetails;
}
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import EditEmployeeButton from "./EditEmployeeButton";

const Employee: React.FC<EmployeeProps> = ({ employee }) => {

    const [loading, setLoading] = useState(false);

    const supabaseClient = useSupabaseClient();

    const router = useRouter();

    async function deleteEmployee() {
        setLoading(true)
        //Delete Employee 
        const { error } = await supabaseClient
            .from("profiles")
            .update({
                role: 1
            })
            .eq("id", employee.id)

        if (error) {
            console.log(error)
            setLoading(false);
            return toast.error("Error al borrar al empleado");
        }

        router.refresh()
        toast.success("Empleado eliminado exitosamente");
        await wait();
        setOpen(false);
    }

    const [open, setOpen] = useState(false);

    return (


        <tr key={employee.id} className="text-center">
            <td className="w-1/3 py-3 px-4">{employee.id}</td>
            <td className="py-3 px-4">{employee.name}</td>
            <td className="py-3 px-4">{employee.last_name_1}</td>
            <td className="py-3 px-4">{employee.last_name_2}</td>
            <td className="py-3 px-4 flex flex-row justify-center items-center">
                <EditEmployeeButton id={employee.id}/>
                <AlertDialog.Root open={open} onOpenChange={setOpen}>
                    <AlertDialog.Trigger asChild>
                        <button className="Button red">Borrar Empleado</button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Overlay className="AlertDialogOverlay" />
                        <AlertDialog.Content className="AlertDialogContent">
                            <AlertDialog.Title className="AlertDialogTitle">¿Estas completamente seguro?</AlertDialog.Title>
                            <AlertDialog.Description className="AlertDialogDescription">
                                Esta accion es permanente y no se puede deshacer.
                            </AlertDialog.Description>
                            <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                                <AlertDialog.Cancel asChild>
                                    <button className="Button mauve" disabled={loading}>Cancelar</button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    <button className="Button red" disabled={loading} onClick={(e) => {
                                        e.preventDefault()
                                        deleteEmployee()
                                    }}>Si, borrar empleado</button>
                                </AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>

            </td>
        </tr>
    );
}

export default Employee;