import * as React from "react"

import { cn } from "../../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const horizontalLoadingBarVariants = cva(
  "h-1 w-full overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
      },
      sizeVariant: {
        default: "h-1",
      },
      colorVariant: {
        primary: "bg-foreground-2",
      },
      cornerVariant: {
        none: "",
      },
      borderSizeVariant: {
        none: "",
      }
    },
    defaultVariants: {
      variant: "default",
      sizeVariant: "default",
      colorVariant: "primary",
      cornerVariant: "none",
      borderSizeVariant: "none"
    },
  }
)

const barVariants = cva(
    "",
    {
      variants: {
        colorVariant: {
          primary: "bg-primary",
        },
        cornerVarient: {
          none: "",
        },
      },
      defaultVariants: {
        colorVariant: "primary",
        cornerVarient: "none"
      },
    }
  );

interface HorizontalLoadingBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof horizontalLoadingBarVariants> {}

const HorizontalLoadingBar = React.forwardRef<HTMLDivElement, HorizontalLoadingBarProps>(
  ({ className, variant, sizeVariant, colorVariant, cornerVariant, borderSizeVariant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(horizontalLoadingBarVariants({ variant, sizeVariant, colorVariant, cornerVariant, borderSizeVariant }), className,"p-0")}
      {...props}
    />
  )
)
HorizontalLoadingBar.displayName = "HorizontalLoadingBar"


interface BarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof barVariants> {}

const Bar = React.forwardRef<HTMLDivElement, BarProps>(
  ({ className, colorVariant, cornerVarient, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(barVariants({ colorVariant, cornerVarient }),className,"w-3/5 h-full opacity-90 animate-indeterminate border-0 p-0 m-0")}
      {...props}
    />
  )
);
Bar.displayName = "Bar";

export { HorizontalLoadingBar, Bar }