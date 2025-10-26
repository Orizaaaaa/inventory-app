import { Loader2Icon, Upload } from "lucide-react";
import { Button } from "../button";
import { Dialog, DialogContent, DialogTitle } from "../dialog";

export default function ModalUpload({
    visible,
    loading,
    heading = "Confirm!!",
    message = "Are you sure about the data entered?",
    btnText = "Confirm",
    onSubmit = () => {},
    onCancel = () => {},
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
            <DialogContent className="flex flex-col items-center gap-6 w-full px-4 py-6 rounded-t-xl bg-white sm:w-[480px] sm:p-6 sm:rounded-xl" aria-describedby={undefined} showCloseButton={false}>
                <div className="flex flex-row items-center justify-center w-[64px] h-[64px] rounded-full bg-blue-50 ">
                    <Upload className="w-[32px] h-[32px] text-blue-500" />
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <p className="font-[600] text-[20px] text-[#1F1F1F] sm:text-[24px]">{heading}</p>
                    <p className="font-[400] text-[14px] text-[#595959] sm:text-[16px]">{message}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full justify-center">
                    <>
                        <Button
                        type="button" 
                        text="Cancel"
                        onClick={onCancel}
                        disabled={loading}
                        className="bg-red-500 text-white"
                        />
                        <Button 
                        type="button" 
                        text={loading ? <Loader2Icon className="animate-spin text-black" /> : btnText} 
                        onClick={onSubmit}
                        disabled={loading}
                        variant={"gradien"}
                        />
                    </>
                </div>
            </DialogContent>
        </Dialog>
    );
}