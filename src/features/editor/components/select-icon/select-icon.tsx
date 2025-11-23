"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { Icon, getRegisteredIcons } from "@/imported/components/ui/icon"

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
  const [position, setPosition] = React.useState<{ top: number; left: number; width: number } | null>(null)
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
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

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return
    
    const rect = triggerRef.current.getBoundingClientRect()
    const scrollY = window.scrollY
    const scrollX = window.scrollX
    
    setPosition({
      top: rect.bottom + scrollY + 4,
      left: rect.left + scrollX,
      width: rect.width,
    })
  }, [])

  React.useEffect(() => {
    if (open) {
      updatePosition()
      const handleScroll = () => updatePosition()
      const handleResize = () => updatePosition()
      
      window.addEventListener('scroll', handleScroll, true)
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [open, updatePosition])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
        setSearchQuery("")
      }
    }
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [open])

  // Фокус на инпут при открытии
  React.useEffect(() => {
    if (open && searchInputRef.current) {
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [open])

  const handleToggle = () => {
    setOpen(!open)
    if (!open) {
      setSearchQuery("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setSearchQuery("")
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        data-slot="select-icon-trigger"
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
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
              <span className="truncate">{selectedIcon}</span>
            </>
          ) : (
            <span className="text-foreground-secondary">{placeholder}</span>
          )}
        </div>
        <Icon variant="chevron_down" className="size-4 opacity-50" />
      </button>

      {open && typeof document !== 'undefined' && position && createPortal(
        <div
          ref={contentRef}
          data-slot="select-icon-content"
          className={cn(
            "bg-background-primary text-foreground-primary relative z-50 max-h-[20rem] min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border border-border-secondary shadow-md"
          )}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
          }}
        >
          {/* Поиск */}
          <div className="p-2 border-b border-border-secondary">
            <div className="relative">
              <Icon variant="magnifier" className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-foreground-secondary pointer-events-none" />
              <input
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
                  e.stopPropagation()
                  requestAnimationFrame(() => {
                    if (open && searchInputRef.current) {
                      searchInputRef.current.focus()
                    }
                  })
                }}
                className="pl-8 h-8 text-sm w-full rounded border border-border-secondary bg-background-secondary px-2 outline-none focus:border-border-primary"
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onKeyDown={(e) => {
                  e.stopPropagation()
                  if (e.key === "Escape") {
                    setOpen(false)
                  }
                  if (e.key === "Enter") {
                    e.preventDefault()
                  }
                }}
                autoFocus
              />
            </div>
          </div>

          <div className="p-1 max-h-[20rem] overflow-y-auto w-full">
            {filteredIcons.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-foreground-muted">
                No icons found
              </div>
            ) : (
              filteredIcons.map((iconName) => (
                <div
                  key={iconName}
                  onClick={() => handleValueChange(iconName)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleValueChange(iconName)
                    }
                  }}
                  tabIndex={0}
                  className={cn(
                    "hover:bg-background-secondary focus:bg-background-secondary/50 focus:text-foreground-primary [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                    iconName === value && "bg-background-secondary/50"
                  )}
                >
                  <Icon variant={iconName} container={true} />
                  <span className="flex-1">{iconName}</span>
                  {iconName === value && (
                    <div className="absolute right-2 flex size-3.5 items-center justify-center">
                      <Icon variant="circle_checkmark" className="size-4" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export { SelectIcon }
