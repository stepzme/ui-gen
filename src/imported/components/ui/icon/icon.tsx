import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Реестр иконок - будет заполнен при добавлении SVG компонентов
const iconRegistry: Record<string, React.ComponentType<{ className?: string }>> = {}

const iconVariants = cva("", {
  variants: {
    semantic: {
      default: "text-foreground-primary",
      accent: "text-foreground-brand",
      success: "text-foreground-success",
      warning: "text-foreground-warning",
      info: "text-foreground-info",
      critical: "text-foreground-critical",
    },
    container: {
      true: "w-10 h-10 rounded-md flex items-center justify-center",
      false: "",
    },
  },
  compoundVariants: [
    // Container с семантическими цветами фона
    {
      container: true,
      semantic: "default",
      class: "bg-background-secondary/50",
    },
    {
      container: true,
      semantic: "accent",
      class: "bg-background-brand/10",
    },
    {
      container: true,
      semantic: "success",
      class: "bg-background-success/10",
    },
    {
      container: true,
      semantic: "warning",
      class: "bg-background-warning/10",
    },
    {
      container: true,
      semantic: "info",
      class: "bg-background-info/10",
    },
    {
      container: true,
      semantic: "critical",
      class: "bg-background-critical/10",
    },
  ],
  defaultVariants: {
    semantic: "default",
    container: false,
  },
})

// Тип для вариантов иконок - будет расширяться при добавлении иконок
export type IconVariant = string

interface IconProps extends Omit<VariantProps<typeof iconVariants>, 'semantic' | 'container'> {
  variant: IconVariant
  semantic?: "default" | "accent" | "success" | "warning" | "info" | "critical"
  container?: boolean
  className?: string
}

function Icon({
  variant,
  semantic,
  container = false,
  className,
}: IconProps) {
  const effectiveSemantic = semantic ?? "default"
  const IconComponent = iconRegistry[variant]

  if (!IconComponent) {
    // Fallback для несуществующих иконок
    return (
      <div
        className={cn(
          iconVariants({ semantic: effectiveSemantic, container }),
          "bg-background-secondary rounded flex items-center justify-center",
          className
        )}
        title={`Icon "${variant}" not found`}
      >
        <span className="text-xs text-foreground-muted">?</span>
      </div>
    )
  }

  // Если есть контейнер, оборачиваем в div
  if (container) {
    return (
      <div className={cn(iconVariants({ semantic: effectiveSemantic, container }), className)}>
        <IconComponent className={cn(iconVariants({ semantic: effectiveSemantic, container: false }), "text-current")} />
      </div>
    )
  }

  // Без контейнера - просто иконка, размер наследуется от родителя
  return (
    <IconComponent
      className={cn(iconVariants({ semantic: effectiveSemantic, container: false }), "text-current", className)}
    />
  )
}

// Функция для регистрации иконок (будет использоваться в icons/index.ts)
export function registerIcon(name: string, component: React.ComponentType<{ className?: string }>) {
  iconRegistry[name] = component
}

// Функция для получения списка всех зарегистрированных иконок
export function getRegisteredIcons(): string[] {
  return Object.keys(iconRegistry).sort()
}
export { Icon, iconVariants }


