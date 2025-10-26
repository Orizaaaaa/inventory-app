import { useState, useCallback } from "react";

export const useTextareaInput = (maxAmount: number = 500) => {
  const [text, setText] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxAmount) {
      setText(value);
    }
  }, [maxAmount]);

  const reset = useCallback(() => {
    setText("");
  }, []);

  return {
    text,
    handleChange,
    reset,
    isMaxLength: text.length >= maxAmount,
    remainingChars: maxAmount - text.length,
  };
};
