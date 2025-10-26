import { CircleAlert, Loader2Icon } from "lucide-react";
import { Button } from "../button";
import { Dialog, DialogContent, DialogTitle } from "../dialog";

export default function ModalConfirm({
  visible,
  loading,
  heading = "Confirm!",
  message = "Are you sure about the data entered?",
  btnText = "Confirm",
  onSubmit = () => { },
  onCancel = () => { },
}: Readonly<{
  visible: boolean;
  loading: boolean;
  heading?: string;
  message?: string;
  btnText?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}>) {
  return (
    <Dialog open={visible}>
      <DialogTitle className="hidden">{heading}</DialogTitle>
      <DialogContent className="flex flex-col items-center gap-6 min-w-[480px] h-auto px-4 py-6 rounded-t-xl bg-white sm:p-6 sm:rounded-xl" aria-describedby={undefined} showCloseButton={false}>
        <div className="flex flex-row items-center justify-center w-[64px] h-[64px] rounded-full bg-orange-50">
          <CircleAlert color="#F79009" className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <p className="font-semibold text-[20px] text-[#1F1F1F] sm:text-[24px]">{heading}</p>
          <p className="font-normal text-[14px] text-[#595959] sm:text-[16px]">{message}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full justify-center">
          <>
            <Button
              type="button"
              text="Cancel"
              variant="red"
              onClick={onCancel}
              disabled={loading}
              className="h-[52px] text-[16px] border border-red-500"
            />
            <Button
              type="button"
              variant="gradien"
              text={loading ? <Loader2Icon className="animate-spin text-black" /> : btnText}
              onClick={onSubmit}
              disabled={loading}
              className="h-[52px] text-[16px]"
            />
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
}