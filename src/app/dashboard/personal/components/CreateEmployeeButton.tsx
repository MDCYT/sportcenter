"use client";

import useCreateProductModal from "@/hooks/useCreateProductModal";

import Button from "@/components/Button";

const CreateProductButton = () => {
    const createProductModal = useCreateProductModal()

    return ( 
        <Button onClick={createProductModal.onOpen} className="p-4 rounded-2xl bg-[#343434] hover:bg-black text-white transition duration-200 my-8 w-64 text-center">Añadir producto</Button>
     );
}
 
export default CreateProductButton;