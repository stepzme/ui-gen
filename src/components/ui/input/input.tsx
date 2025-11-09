import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label/label"

interface InputProps extends React.ComponentProps<"input"> {
  placeholder?: string
  label?: string
}

function Input({ className, type, placeholder = "Enter text...", label, ...props }: InputProps) {
  return (
    <div>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <input
        type={type}
        data-slot="input"
        placeholder={placeholder}
        className={cn(
          "file:text-foreground-primary placeholder:text-foreground-secondary selection:bg-background-secondary selection:text-foreground-primary h-9 w-full rounded-md bg-background-secondary/50 px-3 py-1 text-base transition-[color] file:inline-flex file:h-9 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-foreground-primary",
          "aria-invalid:ring-ring-error dark:aria-invalid:ring-ring-error aria-invalid:border-border-error",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
