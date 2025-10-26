import React from "react";
import { useTextareaInput } from "@/hooks/use-textarea-input";
import { cn } from "@/utils/cn";

type TextareaProps = {
    label?: string;
    maxAmount?: number;
    disabled?: boolean;
    error?: boolean;
    className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement> ;

const TextareaInput = ({ label, maxAmount = 500, disabled = false, error = false, className, ...props }: TextareaProps) => {

    const { text, handleChange} = useTextareaInput(maxAmount);

    const isError = error || text.length >= maxAmount;

    return (
        <div className="flex flex-col gap-y-2">
            <textarea
                placeholder="Type your message..."
                value={text}
                onChange={handleChange}
                disabled={disabled}
                className={cn(
                    `text-sm bg-neutral-3 p-3 rounded-lg w-full focus:outline-none`,
                    disabled ? "bg-grey-100" : "bg-neutral-3",
                    isError ? "border-red-500 border bg-transparent" : null,
                    className
                )}
                {...props}
            />
            <div 
                className={cn(
                    "flex justify-between",
                    disabled ? 'text-neutral-9' : text ? "text-neutral-9" : "text-neutral-6"
                )}
            >
                <p className="text-sm">{label}</p>
                <p
                    className={`text-sm`}
                >
                    {text.length}/{maxAmount}
                </p>
            </div>
        </div>
    );
};

export default TextareaInput;
