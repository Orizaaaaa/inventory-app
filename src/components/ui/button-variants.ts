import { cva } from "class-variance-authority";

const buttonVariants = cva(
  [
    "cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-sm whitespace-nowrap rounded-lg transition-all disabled:pointer-events-none disabled:border-0 disabled:bg-grey-100 disabled:text-neutral-7",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:border-ring focus-visible:ring-black focus-visible:ring-[1.5px]",
    "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
    "disabled:!pointer-events-none disabled:!border-0 disabled:!bg-grey-100 disabled:!text-neutral-7 disabled:!bg-none",
  ].join(" "),
  {
    variants: {
      variant: {
        download: "bg-green-50 text-green-500",
        ghost:
          "bg-transparent text-neutral-6 hover:bg-neutral-4/50 active:bg-neutral-5/50",
        default: "bg-neutral-3",
        outline: "border hover:bg-neutral-4/50 active:bg-neutral-5/50",
        dangers: "text-red-500 bg-red-50 rounded-[8px] py-3 px-4 gap-2",
        primary: "text-primary-500 bg-blue-50 rounded-[8px] py-3 px-4 gap-2",
        newPrimary:
          "text-neutral-1 bg-primary-500 rounded-[8px] py-3 px-4 gap-2",
        success: "text-white bg-green-50 text-green-500",
        warning: "text-orange-500 bg-orange-50 rounded-[8px] py-3 px-4 gap-2",
        softDangers: "text-white bg-red-50",
        boldWarning: "text-white bg-orange-500",
        primaryPagination:
          "text-white bg-blue-50 text-blue-500 border border-blue-100 border-[1px]",
        plain: "text-black bg-grey-50",
        red: "text-neutral-1 bg-red-500 rounded-[8px] py-3 px-4 gap-2",
        grey: "text-neutral-9 bg-grey-100",
        greyDark: "text-white bg-grey-500",
        greenDark: "text-white bg-green-500",
        blueBca: "text-white bg-[#5385D3]",
        purple: "text-purple-500 bg-purple-50",
        bluelight: [
          "bg-neutral-1",
          "justify-start",
          "hover:bg-primary-50",
        ].join(" "),
        gradien: [
          "text-white",
          "bg-[linear-gradient(90deg,#1874A5,#A31AF2)]",
          "hover:bg-[linear-gradient(0deg,#ffffff33_0%,#ffffff33_100%),linear-gradient(283deg,#A31AF2_6%,#1874A5_97%)]",
          "active:bg-[linear-gradient(0deg,#00000033_0%,#00000033_100%),linear-gradient(283deg,#A31AF2_6%,#1874A5_97%)]",
        ].join(" "),
        gradienHover: [
          "text-black",
          "bg-white",
          "hover:bg-[linear-gradient(0deg,#ffffff33_0%,#ffffff33_100%),linear-gradient(283deg,#A31AF2_6%,#1874A5_97%)] hover:text-white",
          "active:bg-[linear-gradient(0deg,#00000033_0%,#00000033_100%),linear-gradient(283deg,#A31AF2_6%,#1874A5_97%)]",
        ].join(" "),
        blue: "bg-blue-500 hover:bg-blue-600 text-neutral-1 rounded-lg",
        lightBlue: "bg-primary-50 text-primary-500",
        yellow: [
          "text-white",
          "bg-[linear-gradient(90deg,#ffb300,#ffdd32)]",
          "hover:bg-[linear-gradient(0deg,#ffffff33_0%,#ffffff33_100%),linear-gradient(283deg,#ffdd32_6%,#ffb300_97%)]",
          "active:bg-[linear-gradient(0deg,#00000033_0%,#00000033_100%),linear-gradient(283deg,#ffdd32_6%,#ffb300_97%)]",
        ].join(" "),
      },
      size: {
        xs: "h-[32px] text-[12px]",
        sm: "h-[32px] text-[12px]",
        md: "h-[44px] text-[14px]",
        lg: "h-[52px] text-[16px]",
        iconSm: "size-[32px]",
        iconMd: "size-[44px]",
        iconLg: "size-[52px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export { buttonVariants };


