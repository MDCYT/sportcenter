"use client";

import Image from "next/image";
import { ProductDetails } from "../../../../../types";
import useLoadImage from "@/hooks/useLoadImage"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import "./style.css"

import { useState } from "react";
interface ProductProps {
    product: ProductDetails;
}
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import EditProductButton from "./EditProductButton";

const Product: React.FC<ProductProps> = ({ product }) => {

    const [loading, setLoading] = useState(false);

    const supabaseClient = useSupabaseClient();

    const imagePath = useLoadImage(product);

    const router = useRouter();

    async function deleteProduct() {
        setLoading(true)
        //Delete product 
        const { error } = await supabaseClient
            .from("product")
            .delete()
            .eq("id", product.id)
            .single();

        if (error) {
            console.log(error)
            setLoading(false);
            return toast.error("Error al borrar el producto");
        }

        router.refresh()
        toast.success("Producto eliminado exitosamente");
        await wait();
        setOpen(false);
    }

    const [open, setOpen] = useState(false);

    return (


        <tr key={product.id} className="text-center">
            <td className="w-1/3 py-3 px-4">{product.id}</td>
            <td className="w-1/3 py-3 px-4">
                <Image src={imagePath || "/images/template.png"} width={50} height={50} alt="Template" className="rounded-xl" />
            </td>
            <td className="py-3 px-4">{product.name}</td>
            <td className="py-3 px-4 flex flex-row justify-center items-center">
                <EditProductButton id={product.id}/>
                <AlertDialog.Root open={open} onOpenChange={setOpen}>
                    <AlertDialog.Trigger asChild>
                        <button className="Button red">Borrar Producto</button>
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
                                        deleteProduct()
                                    }}>Si, borrar producto</button>
                                </AlertDialog.Action>
                            </div>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>

            </td>
        </tr>
    );
}

export default Product;