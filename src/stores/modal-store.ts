import { create } from "zustand";

type ModalState = {
  visible: boolean;
  message: string;
  onClose?: () => void;
};

type ModalStore = {
  modals: Record<string, ModalState>;
  hideModal: (key: string) => void;
  openModal: (key: string, message?: string, onClose?: () => void) => void;
};

export const useModalStoreImpl = create<ModalStore>((set) => ({
  modals: {},
  hideModal: (key) =>
    set((state) => {
      const modal = state.modals[key];
      modal?.onClose?.();
      return {
        modals: {
          ...state.modals,
          [key]: { ...modal, visible: false, onClose: undefined },
        },
      };
    }),
  openModal: (key, message = "", onClose) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: { ...state.modals[key], visible: true, message, onClose },
      },
    })),
}));