import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva(
  "text-foreground",
  {
    variants: {
      size: {
        h1: "text-4xl font-bold leading-tight tracking-tight",
        h2: "text-3xl font-bold leading-tight tracking-tight",
        h3: "text-2xl font-semibold leading-snug tracking-tight",
        h4: "text-xl font-semibold leading-snug tracking-tight",
        h5: "text-lg font-semibold leading-snug tracking-tight",
        h6: "text-base font-semibold leading-snug tracking-tight",
        body: "text-base leading-relaxed",
        caption: "text-sm leading-relaxed",
        footnote: "text-xs leading-relaxed",
      },
      weight: {
        thin: "font-thin",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
      textColor: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive",
        accent: "text-accent-foreground",
      },
    },
    defaultVariants: {
      size: "body",
      weight: "normal",
      textColor: "default",
    },
  }
)

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType
  bPadding?: number
  tPadding?: number
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ 
    className, 
    size, 
    weight, 
    textColor, 
    as, 
    bPadding, 
    tPadding, 
    style,
    ...props 
  }, ref) => {
    const Component = as || (size?.startsWith('h') ? size : 'p') as React.ElementType
    
    const customStyle = {
      ...style,
      ...(bPadding !== undefined && { paddingBottom: `${bPadding}px` }),
      ...(tPadding !== undefined && { paddingTop: `${tPadding}px` }),
    }

    return (
      <Component
        ref={ref as any}
        className={cn(textVariants({ size, weight, textColor, className }))}
        style={customStyle}
        {...props}
      />
    )
  }
)

Text.displayName = "Text"

export { Text, textVariants }
