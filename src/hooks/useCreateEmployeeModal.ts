import { create } from "zustand";

interface CreateProductModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateProductModal = create<CreateProductModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useCreateProductModal