import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "motion/react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"

const buttonIconVariants = cva(
  "inline-flex items-center justify-center size-9 rounded-md disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-border-primary focus-visible:ring-ring-primary/50 focus-visible:ring-[3px] aria-invalid:ring-critical/20 dark:aria-invalid:ring-critical/40 aria-invalid:border-border-critical",
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
    },
    compoundVariants: [
      // Primary variant combinations
      {
        variant: "primary",
        semantic: "default",
        class: [
          "bg-background-inverted border border-border-inverted text-foreground-inverted",
          "hover:bg-background-inverted/80 hover:border-border-inverted/0",
          "active:bg-background-inverted/95 active:border-border-inverted/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "primary",
        semantic: "accent",
        class: [
          "bg-background-brand border border-border-brand text-white",
          "hover:bg-background-brand/80 hover:border-border-brand/0",
          "active:bg-background-brand/95 active:border-border-brand/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "primary",
        semantic: "success",
        class: [
          "bg-background-success border border-border-success text-white",
          "hover:bg-background-success/80 hover:border-border-success/0",
          "active:bg-background-success/95 active:border-border-success/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "primary",
        semantic: "warning",
        class: [
          "bg-background-warning border border-border-warning text-black",
          "hover:bg-background-warning/80 hover:border-border-warning/0",
          "active:bg-background-warning/95 active:border-border-warning/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "primary",
        semantic: "info",
        class: [
          "bg-background-info border border-border-info text-white",
          "hover:bg-background-info/80 hover:border-border-info/0",
          "active:bg-background-info/95 active:border-border-info/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "primary",
        semantic: "critical",
        class: [
          "bg-background-critical border border-border-critical text-white",
          "hover:bg-background-critical/80 hover:border-border-critical/0",
          "active:bg-background-critical/95 active:border-border-critical/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      // Secondary variant combinations
      {
        variant: "secondary",
        semantic: "default",
        class: [
          "bg-background-secondary/50 border border-border-secondary/50 text-foreground-primary",
          "hover:bg-background-secondary hover:border-border-secondary/0",
          "active:bg-background-secondary/95 active:border-border-secondary/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "secondary",
        semantic: "accent",
        class: [
          "bg-background-brand/10 border border-border-brand/0 text-foreground-brand",
          "hover:bg-background-brand/20 hover:border-border-brand/0",
          "active:bg-background-brand/40 active:border-border-brand/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "secondary",
        semantic: "success",
        class: [
          "bg-background-success/10 border border-border-success/0 text-foreground-success",
          "hover:bg-background-success/20 hover:border-border-success/0",
          "active:bg-background-success/40 active:border-border-success/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "secondary",
        semantic: "warning",
        class: [
          "bg-background-warning/10 border border-border-warning/0 text-foreground-warning",
          "hover:bg-background-warning/20 hover:border-border-warning/0",
          "active:bg-background-warning/40 active:border-border-warning/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "secondary",
        semantic: "info",
        class: [
          "bg-background-info/10 border border-border-info/0 text-foreground-info",
          "hover:bg-background-info/20 hover:border-border-info/0",
          "active:bg-background-info/40 active:border-border-info/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "secondary",
        semantic: "critical",
        class: [
          "bg-background-critical/10 border border-border-critical/0 text-foreground-critical",
          "hover:bg-background-critical/20 hover:border-border-critical/0",
          "active:bg-background-critical/40 active:border-border-critical/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      // Tertiary variant combinations
      {
        variant: "tertiary",
        semantic: "default",
        class: [
          "bg-transparent border border-border-primary text-foreground-primary",
          "hover:bg-background-secondary/80 hover:border-border-secondary/0",
          "active:bg-background-secondary/95 active:border-border-secondary/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "tertiary",
        semantic: "accent",
        class: [
          "bg-transparent border border-border-brand/70 text-foreground-primary",
          "hover:bg-background-brand/40 hover:border-border-brand/0",
          "active:bg-background-brand/60 active:border-border-brand/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "tertiary",
        semantic: "success",
        class: [
          "bg-transparent border border-border-success/70 text-foreground-primary",
          "hover:bg-background-success/40 hover:border-border-success/0",
          "active:bg-background-success/60 active:border-border-success/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "tertiary",
        semantic: "warning",
        class: [
          "bg-transparent border border-border-warning/70 text-foreground-primary",
          "hover:bg-background-warning/40 hover:border-border-warning/0",
          "active:bg-background-warning/60 active:border-border-warning/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "tertiary",
        semantic: "info",
        class: [
          "bg-transparent border border-border-info/70 text-foreground-primary",
          "hover:bg-background-info/40 hover:border-border-info/0",
          "active:bg-background-info/60 active:border-border-info/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "tertiary",
        semantic: "critical",
        class: [
          "bg-transparent border border-border-critical/70 text-foreground-primary",
          "hover:bg-background-critical/40 hover:border-border-critical/0",
          "active:bg-background-critical/60 active:border-border-critical/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      // Text variant combinations
      {
        variant: "text",
        semantic: "default",
        class: [
          "bg-transparent border-0 rounded-none text-foreground-secondary",
          "hover:text-foreground-primary",
          "active:text-foreground-primary",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "text",
        semantic: "accent",
        class: [
          "bg-transparent border-0 rounded-none text-foreground-brand",
          "hover:text-foreground-brand/80",
          "active:text-foreground-brand/60",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "text",
        semantic: "success",
        class: [
          "bg-transparent border-0 rounded-none text-foreground-success",
          "hover:text-foreground-success/80",
          "active:text-foreground-success/60",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "text",
        semantic: "warning",
        class: [
          "bg-transparent border-0 rounded-none text-foreground-warning",
          "hover:text-foreground-warning/80",
          "active:text-foreground-warning/60",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "text",
        semantic: "info",
        class: [
          "bg-transparent border-0 rounded-none text-foreground-info",
          "hover:text-foreground-info/80",
          "active:text-foreground-info/60",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        variant: "text",
        semantic: "critical",
        class: [
          "bg-transparent border-0 rounded-none text-foreground-critical",
          "hover:text-foreground-critical/80",
          "active:text-foreground-critical/60",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
    ],
    defaultVariants: {
      variant: "primary",
      semantic: "default",
    },
  }
)

interface ButtonIconProps extends 
  Omit<HTMLMotionProps<"button">, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd">,
  VariantProps<typeof buttonIconVariants> {
  asChild?: boolean
  icon: string
}

function ButtonIcon({
  className,
  variant,
  semantic,
  asChild = false,
  icon,
  children,
  ...props
}: ButtonIconProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="buttonIcon"
        className={cn(buttonIconVariants({ variant, semantic }), className)}
        {...(props as React.ComponentProps<typeof Slot>)}
      >
        <Icon variant={icon} {...(semantic ? { semantic } : {})} />
      </Slot>
    )
  }

  return (
    <motion.button
      data-slot="buttonIcon"
      className={cn(buttonIconVariants({ variant, semantic }), className)}
      whileTap={{ 
        scale: 0.75,
        transition: { duration: 0.1, ease: "easeIn" }
      }}
      initial={{ scale: 1 }}
      transition={{ 
        duration: 0.2,
        ease: "easeInOut"
      }}
      {...props}
    >
      <Icon variant={icon} {...(semantic ? { semantic } : {})} />
    </motion.button>
  )
}

export { ButtonIcon, buttonIconVariants, type ButtonIconProps }

