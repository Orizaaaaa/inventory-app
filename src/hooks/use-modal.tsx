import { useState, useCallback } from "react";

export const useModal = () => {
  const [visible, setVisible] = useState(false);

  const openModal = useCallback(() => {
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    visible,
    openModal,
    closeModal,
    hideModal,
  };
};
