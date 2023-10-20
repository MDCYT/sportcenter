import { create } from "zustand";

interface EditEmployeeModalStore {
    isOpen: boolean;
    id: number;
    onOpen: () => void;
    onClose: () => void;
    changeID: (id: number) => void;
}

const useEditEmployeeModal = create<EditEmployeeModalStore>((set) => ({
    isOpen: false,
    id: 1,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
    changeID: (id: number) => set({id: id}),
}))

export default useEditEmployeeModal