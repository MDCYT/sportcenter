"use client";

import useEditProductModal from "@/hooks/useEditProductModal";

import Button from "@/components/Button";

interface interfaceEditProductButton {
    id: number;
}

const EditProductButton: React.FC<interfaceEditProductButton> = ({id}) => {
    const EditProductModal = useEditProductModal()

    return ( 
        <Button onClick={(e) => {
            EditProductModal.changeID(id);
            EditProductModal.onOpen()
        }} className="Button violet">Editar Producto</Button>
     );
}
 
export default EditProductButton;