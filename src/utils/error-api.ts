interface ParseErrorApiProps {
  defaultMessage?: string;
}

export const parseErrorApi = (
  error: any,
  { defaultMessage = "Unexpected error occurred" }: ParseErrorApiProps = {}
) => {
  return (
    error?.response?.data?.error?.details ||
    error?.response?.data?.message ||
    error.message ||
    defaultMessage
  );
};
