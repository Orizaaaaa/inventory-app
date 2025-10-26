import { create } from "zustand";

type Options = {
  heading?: string;
  message?: string;
  btnText?: string;
  onCancel?: () => void;
  onSubmit?: () => Promise<void>;
};

type ModalData = {
  visible: boolean;
  loading: boolean;
  options: Options;
};

type ModalStore = {
  modals: Record<string, ModalData>;
  openModal: (key: string) => void;
  hideModal: (key: string) => void;
  setIsload: (key: string, loading: boolean) => void;
  handleConfirm: (key: string, options: Options) => void;
};

export const useModalConfirmStoreImpl = create<ModalStore>((set) => ({
  modals: {},
  handleConfirm: (key, options) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: {
          visible: true,
          loading: false,
          options: {
            message: options.message ?? "Are you sure?",
            heading: options.heading ?? "Confirm",
            btnText: options.btnText ?? "Confirm",
            onCancel: options.onCancel,
            onSubmit: options.onSubmit,
          },
        },
      },
    })),
  setIsload: (key, loading) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [key]: { ...state.modals[key], loading },
      },
    })),
  openModal: (key) =>
    set((state) => {
      let modal = state.modals[key];
      if(!modal) return state;
      return {
        modals: {
          ...state.modals,
          [key]: { ...modal, visible: true },
        },
      };
    }),
  hideModal: (key) =>
    set((state) => {
      let modal = state.modals[key];
      if(!modal) return state;
      return {
        modals: {
          ...state.modals,
          [key]: { ...modal, visible: false },
        },
      };
    }),
}));