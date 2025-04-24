import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const buttonVariants = cva(
    "disabled:pointer-events-none disabled:opacity-50 disabled:bg-slate-500 hover:opacity-90 active:opacity-100",
    {
        variants: {
            variant: {
                default: "text-sm",
            },
            sizeVariant: {
                default: "h-10 px-4",
                md:"w-full h-10"
            },
            colorVariant: {
                primary: "bg-primary text-primary-foreground",
            },
            cornerVariant: {
                default: "rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            sizeVariant: "default",
            colorVariant:"primary",
            cornerVariant:"default"
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, sizeVariant, colorVariant, cornerVariant, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, sizeVariant, colorVariant, cornerVariant, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
