import { useState } from "react";

type UseConfirmOptions = {
  heading?: string;
  message?: string;
  btnText?: string;
  onCancel?: () => void;
  onSubmit?: () => Promise<void>;
};

type UseModalConfirmReturn = {
  visible: boolean;
  loading: boolean;
  options: UseConfirmOptions;
  openModal: () => void;
  hideModal: () => void;
  onConfirm: () => Promise<void>;
  handleConfirm: (options: UseConfirmOptions) => void;
};

export const useModalConfirm = (): UseModalConfirmReturn => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<UseConfirmOptions>({
    btnText: "Confirm",
    heading: "Confirm",
    message: "Are you sure?",
    onCancel: undefined,
    onSubmit: undefined,
  });

  const handleConfirm = (options: UseConfirmOptions) => {
    setOptions({...options});
    setVisible(true);
  };

  const openModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onConfirm = async () => {
    if (!options.onSubmit) return;

    try {
      setLoading(true);
      await options.onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return { 
    visible, 
    loading, 
    options, 
    onConfirm,
    openModal, 
    hideModal, 
    handleConfirm, 
  };
};