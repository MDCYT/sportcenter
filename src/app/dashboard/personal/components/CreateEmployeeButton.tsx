"use client";

import UseCreateEmployeeModal from "@/hooks/useCreateEmployeeModal";

import Button from "@/components/Button";

const createEmployeeModal = () => {
    const createEmployeeModal = UseCreateEmployeeModal()

    return ( 
        <Button onClick={createEmployeeModal.onOpen} className="p-4 rounded-2xl bg-[#343434] hover:bg-black text-white transition duration-200 my-8 w-64 text-center">Añadir empleado</Button>
     );
}
 
export default createEmployeeModal;