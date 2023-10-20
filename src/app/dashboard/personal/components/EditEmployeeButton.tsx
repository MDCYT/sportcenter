"use client";

import useEditEmployeeModal from "@/hooks/useEditEmployeeModal";

import Button from "@/components/Button";

interface interfaceEmployeeButton {
    id: number;
}

const EditEmployeeButton: React.FC<interfaceEmployeeButton> = ({id}) => {
    const EditEmployeeModal = useEditEmployeeModal()

    return ( 
        <Button onClick={(e) => {
            EditEmployeeModal.changeID(id);
            EditEmployeeModal.onOpen()
        }} className="Button violet">Editar Empleado</Button>
     );
}
 
export default EditEmployeeButton;