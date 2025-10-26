import * as React from "react";
import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { SiFacebook, SiX } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';

const socialButtonVariants = cva(
  [
    "cursor-pointer inline-flex items-center justify-center font-semibold whitespace-nowrap rounded-md transition-all duration-200",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-7 disabled:text-neutral-1 disabled:shadow-none",
    "border hover:shadow-sm active:shadow-none",
    "outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      provider: {
        google: "bg-neutral-1 text-neutral-9 hover:bg-neutral-3 active:bg-neutral-3 active:border-neutral-9 border-gray-300",
        facebook: "bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600 hover:border-blue-300",
        twitter: "bg-neutral-9 text-white hover:bg-neutral-9 active:bg-neutral-9 hover:border-neutral-8",
      },
      size: {
        sm: "h-[32px] p-3 text-sm gap-2 [&_svg]:size-4",
        md: "h-[44px] px-3 text-xs gap-2 [&_svg]:size-5",
        lg: "h-[52px] px-6 text-base gap-2.5 [&_svg]:size-5",
      },
      variant: {
        default: "",
        secondary: [
          "bg-neutral-1 text-neutral-9 border-grey-100",
          "hover:bg-neutral-3",
          "active:border-neutral-9",
          "disabled:bg-grey-100 disabled:text-neutral-7",
        ].join(" "),
        facebookSecondary: [
          "bg-neutral-1 text-neutral-9 border-grey-100",
          "hover:bg-neutral-3",
          "active:bg-blue-50 active:border-blue-500 active:text-blue-500",
          "disabled:bg-grey-100 disabled:text-neutral-7",
        ].join(" "),
      },
    },
    defaultVariants: {
      provider: "google",
      size: "md",
      variant: "default",
    },
  }
)

type SocialButtonProps = React.ComponentProps<"button"> & VariantProps<typeof socialButtonVariants> & {
  asChild?: boolean;
  children?: React.ReactNode;
};

const socialIcons = {
  google: () => <FcGoogle />,
  facebook: () => <SiFacebook />,
  twitter: () => <SiX />
};

const defaultLabels = {
  google: "Sign in with Google",
  facebook: "Sign in with Facebook", 
  twitter: "Sign in with Twitter",
};

const ButtonSocial = ({
  provider = "google",
  size,
  variant,
  className,
  asChild = false,
  children,
  ...props
}: SocialButtonProps) => {
  const Comp = asChild ? Slot : "button";
  const IconComponent = socialIcons[provider!];
  const defaultLabel = defaultLabels[provider!];

  return (
    <Comp
      data-slot="social-button"
      className={cn(socialButtonVariants({ provider, size, variant, className }))}
      {...props}
    >
      <IconComponent />
      {children || defaultLabel}
    </Comp>
  );
};

export { ButtonSocial, socialButtonVariants };