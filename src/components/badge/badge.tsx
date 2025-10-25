import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      semantic: {
        default: "",
        accent: "",
        success: "",
        warning: "",
        info: "",
        critical: "",
      },
      active: {
        true: "",
        false: "",
      },
      interactive: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Default semantic variants - active
      {
        semantic: "default",
        active: true,
        interactive: true,
        class: [
          "border-transparent bg-background-inverted text-foreground-inverted",
          "hover:bg-background-inverted/80 hover:border-border-inverted/0",
          "active:bg-background-inverted/95 active:border-border-inverted/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "default",
        active: true,
        interactive: false,
        class: "border-transparent bg-background-inverted text-foreground-inverted",
      },
      // Default semantic variants - inactive
      {
        semantic: "default",
        active: false,
        interactive: true,
        class: [
          "border-transparent bg-background-secondary/50 text-foreground-primary",
          "hover:bg-background-secondary hover:border-border-secondary/0",
          "active:bg-background-secondary/95 active:border-border-secondary/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "default",
        active: false,
        interactive: false,
        class: "border-transparent bg-background-secondary/50 text-foreground-primary",
      },
      // Accent semantic variants - active
      {
        semantic: "accent",
        active: true,
        interactive: true,
        class: [
          "border-transparent bg-background-brand text-white",
          "hover:bg-background-brand/80 hover:border-border-brand/0",
          "active:bg-background-brand/95 active:border-border-brand/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "accent",
        active: true,
        interactive: false,
        class: "border-transparent bg-background-brand text-white",
      },
      // Accent semantic variants - inactive
      {
        semantic: "accent",
        active: false,
        interactive: true,
        class: [
          "border-transparent bg-background-brand/10 text-foreground-brand",
          "hover:bg-background-brand/20 hover:border-border-brand/0",
          "active:bg-background-brand/40 active:border-border-brand/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "accent",
        active: false,
        interactive: false,
        class: "border-transparent bg-background-brand/10 text-foreground-brand",
      },
      // Success semantic variants - active
      {
        semantic: "success",
        active: true,
        interactive: true,
        class: [
          "border-transparent bg-background-success text-white",
          "hover:bg-background-success/80 hover:border-border-success/0",
          "active:bg-background-success/95 active:border-border-success/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "success",
        active: true,
        interactive: false,
        class: "border-transparent bg-background-success text-white",
      },
      // Success semantic variants - inactive
      {
        semantic: "success",
        active: false,
        interactive: true,
        class: [
          "border-transparent bg-background-success/10 text-foreground-success",
          "hover:bg-background-success/20 hover:border-border-success/0",
          "active:bg-background-success/40 active:border-border-success/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "success",
        active: false,
        interactive: false,
        class: "border-transparent bg-background-success/10 text-foreground-success",
      },
      // Warning semantic variants - active
      {
        semantic: "warning",
        active: true,
        interactive: true,
        class: [
          "border-transparent bg-background-warning text-black",
          "hover:bg-background-warning/80 hover:border-border-warning/0",
          "active:bg-background-warning/95 active:border-border-warning/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "warning",
        active: true,
        interactive: false,
        class: "border-transparent bg-background-warning text-black",
      },
      // Warning semantic variants - inactive
      {
        semantic: "warning",
        active: false,
        interactive: true,
        class: [
          "border-transparent bg-background-warning/10 text-foreground-warning",
          "hover:bg-background-warning/20 hover:border-border-warning/0",
          "active:bg-background-warning/40 active:border-border-warning/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "warning",
        active: false,
        interactive: false,
        class: "border-transparent bg-background-warning/10 text-foreground-warning",
      },
      // Info semantic variants - active
      {
        semantic: "info",
        active: true,
        interactive: true,
        class: [
          "border-transparent bg-background-info text-white",
          "hover:bg-background-info/80 hover:border-border-info/0",
          "active:bg-background-info/95 active:border-border-info/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "info",
        active: true,
        interactive: false,
        class: "border-transparent bg-background-info text-white",
      },
      // Info semantic variants - inactive
      {
        semantic: "info",
        active: false,
        interactive: true,
        class: [
          "border-transparent bg-background-info/10 text-foreground-info",
          "hover:bg-background-info/20 hover:border-border-info/0",
          "active:bg-background-info/40 active:border-border-info/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "info",
        active: false,
        interactive: false,
        class: "border-transparent bg-background-info/10 text-foreground-info",
      },
      // Critical semantic variants - active
      {
        semantic: "critical",
        active: true,
        interactive: true,
        class: [
          "border-transparent bg-background-critical text-white",
          "hover:bg-background-critical/80 hover:border-border-critical/0",
          "active:bg-background-critical/95 active:border-border-critical/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "critical",
        active: true,
        interactive: false,
        class: "border-transparent bg-background-critical text-white",
      },
      // Critical semantic variants - inactive
      {
        semantic: "critical",
        active: false,
        interactive: true,
        class: [
          "border-transparent bg-background-critical/10 text-foreground-critical",
          "hover:bg-background-critical/20 hover:border-border-critical/0",
          "active:bg-background-critical/40 active:border-border-critical/0",
          "transition-colors duration-300 ease-in-out"
        ].join(" "),
      },
      {
        semantic: "critical",
        active: false,
        interactive: false,
        class: "border-transparent bg-background-critical/10 text-foreground-critical",
      },
    ],
    defaultVariants: {
      semantic: "default",
      active: true,
      interactive: false,
    },
  }
)

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean
  interactive?: boolean
  onActiveChange?: (active: boolean) => void
}

function Badge({
  className,
  semantic,
  active = true,
  interactive = false,
  asChild = false,
  onActiveChange,
  onClick,
  ...props
}: BadgeProps) {
  const [internalActive, setInternalActive] = React.useState(active)
  
  const isActive = interactive ? internalActive : active

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLSpanElement>) => {
    if (interactive) {
      const newActive = !isActive
      setInternalActive(newActive)
      onActiveChange?.(newActive)
    }
    onClick?.(event)
  }, [interactive, isActive, onActiveChange, onClick])

  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ semantic, active: isActive, interactive }), 
        interactive && "cursor-pointer",
        className
      )}
      onClick={interactive ? handleClick : onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          handleClick(event as any)
        }
      } : undefined}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
