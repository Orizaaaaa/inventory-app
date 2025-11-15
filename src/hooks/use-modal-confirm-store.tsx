import { useModalConfirmStoreImpl } from "@/stores/modal-confirm-store";

export const useModalConfirmStore = (key: string) => {
  const store = useModalConfirmStoreImpl();

  const modal = store.modals[key] ?? {
    visible: false,
    loading: false,
    options: {
      heading: "Confirm",
      message: "Are you sure?",
      btnText: "Confirm",
    },
  };

  const handleConfirm = (options: typeof modal.options) => {
    store.handleConfirm(key, options);
  };

  const hideModal = () => store.hideModal(key);
  const openModal = () => store.openModal(key);

  const onConfirm = async () => {
    if (!modal.options?.onSubmit) return;

    try {
      store.setIsload(key, true);
      await modal.options.onSubmit?.();
    } finally {
      store.setIsload(key, false);
      store.hideModal(key);
    }
  };

  return {
    visible: modal.visible,
    loading: modal.loading,
    options: modal.options,
    onConfirm,
    openModal,
    hideModal,
    handleConfirm,
  };
};