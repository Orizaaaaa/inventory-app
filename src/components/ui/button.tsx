import * as React from "react";
import { cn } from "@/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button-variants";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    text?: React.ReactNode;
    icon?: React.ReactNode;
    load?: boolean;
    asChild?: boolean;
    iconPosition?: "left" | "right";
    href?: string;
  };

const Button = ({
  icon,
  size,
  text,
  children,
  className,
  variant,
  load = false,
  asChild = false,
  iconPosition = "left",
  href,
  ...props
}: ButtonProps) => {
  let Comp: React.ElementType;

  if (href) {
    Comp = Link;
  } else if (asChild) {
    Comp = Slot;
  } else {
    Comp = "button";
  }

  const linkProps = href ? { to: href } : {};

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ size, variant, className }))}
      {...linkProps}
      {...props}
    >
      {load ? (
        <Loader2 className="w-7 h-7 animate-spin text-white" />
      ) : children ? (
        children
      ) : iconPosition === "right" ? (
        <>
          {text}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </Comp>
  );
};

export { Button };
