import * as React from "react"
import { cn } from "@/lib/utils"

export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  title?: string
  description?: string
  titleSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption" | "footnote"
  descriptionSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption" | "footnote"
  titleWeight?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"
  descriptionWeight?: "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"
  titleColor?: "default" | "muted" | "primary" | "secondary" | "destructive" | "accent"
  descriptionColor?: "default" | "muted" | "primary" | "secondary" | "destructive" | "accent"
  iconColor?: "default" | "muted" | "primary" | "secondary" | "destructive" | "accent" | "success" | "warning" | "info"
  children?: React.ReactNode
}

const Cell = React.forwardRef<HTMLDivElement, CellProps>(
  ({ 
    className,
    leftIcon,
    rightIcon,
    title,
    description,
    titleSize = "body",
    descriptionSize = "caption",
    titleWeight = "medium",
    descriptionWeight = "normal",
    titleColor = "default",
    descriptionColor = "muted",
    iconColor = "default",
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 w-full",
          className
        )}
        {...props}
      >
        {/* Left Icon Container */}
        {leftIcon && (
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-md flex-shrink-0",
            iconColor === "default" && "bg-background-secondary text-foreground-success",
            iconColor === "muted" && "bg-muted/30 text-muted-foreground",
            iconColor === "primary" && "bg-primary/10 text-primary",
            iconColor === "secondary" && "bg-secondary/10 text-secondary-foreground",
            iconColor === "destructive" && "bg-destructive/10 text-destructive",
            iconColor === "accent" && "bg-accent/10 text-accent-foreground",
            iconColor === "success" && "bg-[var(--colors-background0-success)] dark:bg-[var(--colors-success8)] text-[var(--colors-text-success)] dark:text-[var(--colors-icon-success)]",
            iconColor === "warning" && "bg-[var(--colors-background0-warning)] dark:bg-[var(--colors-warning8)] text-[var(--colors-text-warning)] dark:text-[var(--colors-icon-warning)]",
            iconColor === "info" && "bg-[var(--colors-background0-info)] dark:bg-[var(--colors-info8)] text-[var(--colors-text-info)] dark:text-[var(--colors-icon-info)]"
          )}>
            {leftIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {children ? (
            children
          ) : (
            <div>
              {title && (
                <div 
                  className={cn(
                    "font-medium",
                    titleSize === "h1" && "text-4xl font-bold leading-tight tracking-tight",
                    titleSize === "h2" && "text-3xl font-bold leading-tight tracking-tight",
                    titleSize === "h3" && "text-2xl font-semibold leading-snug tracking-tight",
                    titleSize === "h4" && "text-xl font-semibold leading-snug tracking-tight",
                    titleSize === "h5" && "text-lg font-semibold leading-snug tracking-tight",
                    titleSize === "h6" && "text-base font-semibold leading-snug tracking-tight",
                    titleSize === "body" && "text-base leading-relaxed",
                    titleSize === "caption" && "text-sm leading-relaxed",
                    titleSize === "footnote" && "text-xs leading-relaxed",
                    titleWeight === "thin" && "font-thin",
                    titleWeight === "light" && "font-light",
                    titleWeight === "normal" && "font-normal",
                    titleWeight === "medium" && "font-medium",
                    titleWeight === "semibold" && "font-semibold",
                    titleWeight === "bold" && "font-bold",
                    titleWeight === "extrabold" && "font-extrabold",
                    titleWeight === "black" && "font-black",
                    titleColor === "default" && "text-foreground",
                    titleColor === "muted" && "text-muted-foreground",
                    titleColor === "primary" && "text-primary",
                    titleColor === "secondary" && "text-secondary-foreground",
                    titleColor === "destructive" && "text-destructive",
                    titleColor === "accent" && "text-accent-foreground"
                  )}
                >
                  {title}
                </div>
              )}
              {description && (
                <div 
                  className={cn(
                    descriptionSize === "h1" && "text-4xl font-bold leading-tight tracking-tight",
                    descriptionSize === "h2" && "text-3xl font-bold leading-tight tracking-tight",
                    descriptionSize === "h3" && "text-2xl font-semibold leading-snug tracking-tight",
                    descriptionSize === "h4" && "text-xl font-semibold leading-snug tracking-tight",
                    descriptionSize === "h5" && "text-lg font-semibold leading-snug tracking-tight",
                    descriptionSize === "h6" && "text-base font-semibold leading-snug tracking-tight",
                    descriptionSize === "body" && "text-base leading-relaxed",
                    descriptionSize === "caption" && "text-sm leading-relaxed",
                    descriptionSize === "footnote" && "text-xs leading-relaxed",
                    descriptionWeight === "thin" && "font-thin",
                    descriptionWeight === "light" && "font-light",
                    descriptionWeight === "normal" && "font-normal",
                    descriptionWeight === "medium" && "font-medium",
                    descriptionWeight === "semibold" && "font-semibold",
                    descriptionWeight === "bold" && "font-bold",
                    descriptionWeight === "extrabold" && "font-extrabold",
                    descriptionWeight === "black" && "font-black",
                    descriptionColor === "default" && "text-foreground",
                    descriptionColor === "muted" && "text-muted-foreground",
                    descriptionColor === "primary" && "text-primary",
                    descriptionColor === "secondary" && "text-secondary-foreground",
                    descriptionColor === "destructive" && "text-destructive",
                    descriptionColor === "accent" && "text-accent-foreground"
                  )}
                >
                  {description}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Icon Container */}
        {rightIcon && (
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)

Cell.displayName = "Cell"

export { Cell }
