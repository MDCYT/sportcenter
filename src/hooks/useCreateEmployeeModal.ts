import { create } from "zustand";

interface CreateEmployeeModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateEmployeeModal = create<CreateEmployeeModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useCreateEmployeeModal