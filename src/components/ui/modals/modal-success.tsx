import { Dialog, DialogContent, DialogTitle } from "../dialog";
import { Button } from "../button";
import { CheckCheck } from "lucide-react";

type ModalSuccessProps = {
  visible: boolean;
  btnText?: string;
  heading?: string;
  message?: React.ReactNode;
  onClose: () => void;
}

export default function ModalSuccess({
  visible,
  message,
  heading = "Success!!",
  btnText = "Close",
  onClose,
}: ModalSuccessProps) {
  return (
    <Dialog open={visible}>
      <DialogTitle className="hidden">{heading}</DialogTitle>
      <DialogContent className="flex flex-col items-center gap-6 w-full px-4 py-6 rounded-t-xl bg-white sm:w-[480px] sm:p-6 sm:rounded-xl" aria-describedby={undefined} showCloseButton={false}>
        <div className="flex flex-row items-center justify-center w-[64px] h-[64px] rounded-full bg-green-50">
          <CheckCheck color="#12B569" className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <p className="font-[600] text-[20px] text-[#1F1F1F] sm:text-[24px]">{heading}</p>
          <p className="font-[400] text-[14px] text-[#595959] sm:text-[16px]">{message}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 w-full justify-center">
          <Button variant="gradien" text={btnText} onClick={onClose} className="h-[52px] sm:text-[16px]" />
        </div>
      </DialogContent>
    </Dialog>
  );
}