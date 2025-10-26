import { create } from "zustand";

interface ModalState {
  visible: boolean;
  openModal: () => void;
  closeModal: () => void;
  hideModal: () => void;
}

export const useModalStore = (modalName: string) => {
  const store = create<ModalState>((set) => ({
    visible: false,
    openModal: () => set({ visible: true }),
    closeModal: () => set({ visible: false }),
    hideModal: () => set({ visible: false }),
  }));

  return store();
};
