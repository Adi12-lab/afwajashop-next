import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "text-white inline-block text-sm leading-[14px] transition-all duration-[0.3s] ease-[ease] transition-all duration-[0.3s] ease-[ease] p-0 rounded-none outline-0 cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-[#222] hover:bg-primary disabled:bg-[#222]/60",
        success: "bg-primary hover:bg-primary/60 disabled:bg-primary/60",
        warning: "bg-yellow-400 hover:bg-yellow-400/60 disabled:bg-yellow-400/60",
        destructive: "bg-red-400 hover:bg-red-400/60 disabled:bg-red-400/60",
        outlineDark: "bg-white border-[#222] text-[#222] shadow-none hover:bg-[#222] hover:text-white disabled:bg-[#222]/60"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "px-[30px] py-[15px] md:px-[45px] md:py-[22px]",
        long: "w-60 h-[42px] leading-[42px] text-base min-[992px]:w-[285px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
