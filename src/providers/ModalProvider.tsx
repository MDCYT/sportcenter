"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import CreateProductModal from "@/components/CreateProductModal";
import EditProductModal from "@/components/EditProductModal";
import CreateEmployeeModal from "@/components/CreateEmployeeModal";
import EditEmployeeModal from "@/components/EditEmployeeModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted){
        return null;
    }

    return ( 
        <>
            <AuthModal/>
            <CreateProductModal/>
            <EditProductModal/>
            <CreateEmployeeModal/>
            <EditEmployeeModal/>
        </>
     );
}
 
export default ModalProvider;