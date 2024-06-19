import { create } from "zustand";

interface UploadmodalStore {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
}; 

const useUploadmodal = create<UploadmodalStore>((set) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true}),
   onClose: () => set({ isOpen: false}),
}));

export default useUploadmodal;