import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x2 whitespace-nowrap rounded-x2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-border-primary focus-visible:ring-ring-primary/50 focus-visible:ring-[3px] aria-invalid:ring-critical/20 dark:aria-invalid:ring-critical/40 aria-invalid:border-border-critical",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        tertiary: "",
        text: "",
      },
      semantic: {
        default: "",
        accent: "",
        success: "",
        warning: "",
        info: "",
        critical: "",
      },
      size: {
        default: "h-9 px-x4 py-x2 has-[>svg]:px-x3",
        sm: "h-8 rounded-x2 gap-x1 px-x3 has-[>svg]:px-x2",
        lg: "h-10 rounded-x2 px-x6 has-[>svg]:px-x4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    compoundVariants: [
      // Primary variant combinations
      {
        variant: "primary",
        semantic: "default",
        class: ["bg-button-filled-primary-bodyNormal border border-button-filled-primary-bodyNormal text-button-filled-primary-text", "hover:bg-button-filled-primary-bodyHover hover:border-button-filled-primary-bodyHover", "active:bg-button-filled-primary-bodyClick active:border-button-filled-primary-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "primary",
        semantic: "accent",
        class: ["bg-button-filled-brand-bodyNormal border border-button-filled-brand-bodyNormal text-button-filled-text", "hover:bg-button-filled-brand-bodyHover hover:border-button-filled-brand-bodyHover", "active:bg-button-filled-brand-bodyClick active:border-button-filled-brand-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "primary",
        semantic: "success",
        class: ["bg-button-filled-success-bodyNormal border border-button-filled-success-bodyNormal text-button-filled-text", "hover:bg-button-filled-success-bodyHover hover:border-button-filled-success-bodyHover", "active:bg-button-filled-success-bodyClick active:border-button-filled-success-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "primary",
        semantic: "warning",
        class: ["bg-button-filled-warning-bodyNormal border border-button-filled-warning-bodyNormal text-button-filled-text", "hover:bg-button-filled-warning-bodyHover hover:border-button-filled-warning-bodyHover", "active:bg-button-filled-warning-bodyClick active:border-button-filled-warning-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "primary",
        semantic: "info",
        class: ["bg-button-filled-info-bodyNormal border border-button-filled-info-bodyNormal text-button-filled-text", "hover:bg-button-filled-info-bodyHover hover:border-button-filled-info-bodyHover", "active:bg-button-filled-info-bodyClick active:border-button-filled-info-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "primary",
        semantic: "critical",
        class: ["bg-button-filled-critical-bodyNormal border border-button-filled-critical-bodyNormal text-button-filled-text", "hover:bg-button-filled-critical-bodyHover hover:border-button-filled-critical-bodyHover", "active:bg-button-filled-critical-bodyClick active:border-button-filled-critical-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      // Secondary variant combinations
      {
        variant: "secondary",
        semantic: "default",
        class: ["bg-transparent border border-button-outlined-primary-borderNormal text-button-outlined-primary-text", "hover:bg-button-outlined-primary-bodyHover hover:border-button-outlined-primary-borderHover", "active:bg-button-outlined-primary-bodyClick active:border-button-outlined-primary-borderClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "secondary",
        semantic: "accent",
        class: ["bg-transparent border border-button-outlined-brand-borderNormal text-button-outlined-brand-text", "hover:bg-button-outlined-brand-bodyHover hover:border-button-outlined-brand-borderHover", "active:bg-button-outlined-brand-bodyClick active:border-button-outlined-brand-borderClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "secondary",
        semantic: "success",
        class: ["bg-transparent border border-button-outlined-success-borderNormal text-button-outlined-success-text", "hover:bg-button-outlined-success-bodyHover hover:border-button-outlined-success-borderHover", "active:bg-button-outlined-success-bodyClick active:border-button-outlined-success-borderClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "secondary",
        semantic: "warning",
        class: ["bg-transparent border border-button-outlined-warning-borderNormal text-button-outlined-warning-text", "hover:bg-button-outlined-warning-bodyHover hover:border-button-outlined-warning-borderHover", "active:bg-button-outlined-warning-bodyClick active:border-button-outlined-warning-borderClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "secondary",
        semantic: "info",
        class: ["bg-transparent border border-button-outlined-info-borderNormal text-button-outlined-info-text", "hover:bg-button-outlined-info-bodyHover hover:border-button-outlined-info-borderHover", "active:bg-button-outlined-info-bodyClick active:border-button-outlined-info-borderClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "secondary",
        semantic: "critical",
        class: ["bg-transparent border border-button-outlined-critical-borderNormal text-button-outlined-critical-text", "hover:bg-button-outlined-critical-bodyHover hover:border-button-outlined-critical-borderHover", "active:bg-button-outlined-critical-bodyClick active:border-button-outlined-critical-borderClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      // Text variant combinations
      {
        variant: "text",
        semantic: "default",
        class: ["bg-transparent text-button-transparent-primary-text", "hover:bg-button-transparent-primary-bodyHover", "active:bg-button-transparent-primary-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "text",
        semantic: "accent",
        class: ["bg-transparent text-button-transparent-brand-text", "hover:bg-button-transparent-brand-bodyHover", "active:bg-button-transparent-brand-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "text",
        semantic: "success",
        class: ["bg-transparent text-button-transparent-success-text", "hover:bg-button-transparent-success-bodyHover", "active:bg-button-transparent-success-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "text",
        semantic: "warning",
        class: ["bg-transparent text-button-transparent-warning-text", "hover:bg-button-transparent-warning-bodyHover", "active:bg-button-transparent-warning-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "text",
        semantic: "info",
        class: ["bg-transparent text-button-transparent-info-text", "hover:bg-button-transparent-info-bodyHover", "active:bg-button-transparent-info-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
      {
        variant: "text",
        semantic: "critical",
        class: ["bg-transparent text-button-transparent-critical-text", "hover:bg-button-transparent-critical-bodyHover", "active:bg-button-transparent-critical-bodyClick", "transition-colors duration-300 ease-in-out"].join(" "),
      },
    ],
    defaultVariants: {
      variant: "primary",
      semantic: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends 
  Omit<HTMLMotionProps<"button">, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd">,
  VariantProps<typeof buttonVariants> {
asChild?: boolean
  label?: string
}

function Button({
  className,
  variant,
  semantic,
  size,
  asChild = false,
  label = "Button",
  children,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, semantic, size }), className)}
        {...(props as React.ComponentProps<typeof Slot>)}
      />
    )
  }

  return (
    <motion.button
      data-slot="button"
      className={cn(buttonVariants({ variant, semantic, size }), className)}
      whileTap={{ 
        scale: 0.96,
        transition: { duration: 0.1, ease: "easeIn" }
      }}
      initial={{ scale: 1 }}
      transition={{ 
        duration: 0.2,
        ease: "easeInOut"
      }}
      {...props}
    >
      {children || label}
    </motion.button>
  )
}

export { Button, buttonVariants }
