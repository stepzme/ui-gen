"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Icon, getRegisteredIcons } from "@/components/ui/icon"

interface SelectIconProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}

function SelectIcon({
  value,
  onValueChange,
  placeholder = "Select icon...",
  className,
}: SelectIconProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const iconNames = React.useMemo(() => getRegisteredIcons(), [])
  
  const filteredIcons = React.useMemo(() => {
    if (!searchQuery) return iconNames
    
    const query = searchQuery.toLowerCase()
    return iconNames.filter(name => name.toLowerCase().includes(query))
  }, [searchQuery, iconNames])

  const selectedIcon = value && iconNames.includes(value) ? value : undefined

  const handleValueChange = React.useCallback((newValue: string) => {
    onValueChange?.(newValue)
    setSearchQuery("")
    setOpen(false)
  }, [onValueChange])

  // Фокус на инпут при открытии
  React.useEffect(() => {
    if (open && searchInputRef.current) {
      // Небольшая задержка для корректной работы Portal
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [open])

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) {
          // Очищаем поле поиска при закрытии
          setSearchQuery("")
        }
      }}
    >
      <SelectPrimitive.Trigger
        data-slot="select-icon-trigger"
        className={cn(
          "file:text-foreground-primary placeholder:text-foreground-secondary selection:bg-background-primary selection:text-foreground-primary h-9 w-full min-w-0 rounded-md bg-background-secondary/50 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-foreground",
          "aria-invalid:ring-ring-error/20 aria-invalid:border-border-error",
          "flex items-center justify-between gap-2 whitespace-nowrap",
          "data-[placeholder]:text-foreground-secondary [&_svg:not([class*='text-'])]:text-foreground-secondary",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedIcon ? (
            <>
              <Icon variant={selectedIcon} className="size-4" />
              <SelectPrimitive.Value className="truncate">{selectedIcon}</SelectPrimitive.Value>
            </>
          ) : (
            <SelectPrimitive.Value placeholder={placeholder} />
          )}
        </div>
        <SelectPrimitive.Icon asChild>
          <Icon variant="chevron_down" className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          data-slot="select-icon-content"
          className={cn(
            "bg-background-primary text-foreground-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border-secondary shadow-md",
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
          )}
          position="popper"
          align="start"
        >
          {/* Поиск */}
          <div className="p-2 border-b border-border-secondary">
            <div className="relative">
              <Icon variant="magnifier" className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-foreground-secondary pointer-events-none" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => {
                  e.stopPropagation()
                  setSearchQuery(e.target.value)
                }}
                onFocus={(e) => {
                  e.stopPropagation()
                }}
                onBlur={(e) => {
                  // Предотвращаем потерю фокуса - восстанавливаем в следующем кадре
                  e.stopPropagation()
                  requestAnimationFrame(() => {
                    if (open && searchInputRef.current) {
                      searchInputRef.current.focus()
                    }
                  })
                }}
                className="pl-8 h-8 text-sm"
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onKeyDown={(e) => {
                  e.stopPropagation()
                  // При нажатии Escape закрываем меню
                  if (e.key === "Escape") {
                    setOpen(false)
                  }
                  // Предотвращаем закрытие меню при нажатии Enter
                  if (e.key === "Enter") {
                    e.preventDefault()
                  }
                }}
                autoFocus
              />
            </div>
          </div>

          <SelectPrimitive.Viewport
            className={cn(
              "p-1 max-h-[20rem] overflow-y-auto",
              "w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            )}
          >
            {filteredIcons.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-foreground-muted">
                No icons found
              </div>
            ) : (
              filteredIcons.map((iconName) => (
                <SelectPrimitive.Item
                  key={iconName}
                  value={iconName}
                  className={cn(
                    "hover:bg-background-secondary focus:bg-background-secondary/50 focus:text-foreground-primary [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  )}
                >
                  <Icon variant={iconName} container={true} />
                  <SelectPrimitive.ItemText className="flex-1">{iconName}</SelectPrimitive.ItemText>
                  <div className="absolute right-2 flex size-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <Icon variant="circle_checkmark" className="size-4" />
                    </SelectPrimitive.ItemIndicator>
                  </div>
                </SelectPrimitive.Item>
              ))
            )}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export { SelectIcon }

