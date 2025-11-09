"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

interface SelectContextValue {
  value: string | undefined
  open: boolean
  setOpen: (open: boolean) => void
  onValueChange: (value: string) => void
  selectedItem: React.ReactNode
  setSelectedItem: (item: React.ReactNode) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  focusedIndex: number
  setFocusedIndex: (index: number) => void
  listboxId: string
  triggerId: string
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within Select")
  }
  return context
}

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

function Select({ value: controlledValue, defaultValue, onValueChange, children }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState<React.ReactNode>(null)
  const [focusedIndex, setFocusedIndex] = React.useState(-1)
  
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  
  // Generate unique IDs for ARIA relationships
  const listboxId = React.useId()
  const triggerId = React.useId()
  
  const value = controlledValue !== undefined ? controlledValue : internalValue
  
  const handleValueChange = React.useCallback((newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
    setFocusedIndex(-1)
    // Restore focus to trigger after selection
    setTimeout(() => {
      triggerRef.current?.focus()
    }, 0)
  }, [controlledValue, onValueChange])

  // Close on outside click
  React.useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current?.contains(event.target as Node) ||
        contentRef.current?.contains(event.target as Node)
      ) {
        return
      }
      setOpen(false)
      setFocusedIndex(-1)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        setFocusedIndex(-1)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [open])

  // Position content
  React.useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return

    const trigger = triggerRef.current
    const content = contentRef.current
    
    const updatePosition = () => {
      const rect = trigger.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth
      const contentHeight = content.offsetHeight
      const contentWidth = content.offsetWidth
      
      // Default: position below
      let top = rect.bottom + 4
      let left = rect.left
      
      // Check if fits below
      if (top + contentHeight > viewportHeight) {
        // Position above if doesn't fit below
        top = rect.top - contentHeight - 4
      }
      
      // Check horizontal overflow
      if (left + contentWidth > viewportWidth) {
        left = viewportWidth - contentWidth - 8
      }
      if (left < 8) {
        left = 8
      }
      
      content.style.top = `${top}px`
      content.style.left = `${left}px`
      content.style.width = `${Math.max(rect.width, contentWidth)}px`
    }

    updatePosition()
    window.addEventListener("scroll", updatePosition, true)
    window.addEventListener("resize", updatePosition)
    
    return () => {
      window.removeEventListener("scroll", updatePosition, true)
      window.removeEventListener("resize", updatePosition)
    }
  }, [open])

  const contextValue: SelectContextValue = {
    value,
    open,
    setOpen,
    onValueChange: handleValueChange,
    selectedItem,
    setSelectedItem,
    triggerRef,
    contentRef,
    focusedIndex,
    setFocusedIndex,
    listboxId,
    triggerId,
  }

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  const { open, setOpen, triggerRef, selectedItem, listboxId, triggerId, focusedIndex } = useSelectContext()
  const activeItemId = focusedIndex >= 0 ? `${listboxId}-item-${focusedIndex}` : undefined

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " " || e.key === "Home" || e.key === "End") {
      e.preventDefault()
      if (!open) {
        setOpen(true)
      }
    }
  }

  return (
    <button
      ref={triggerRef}
      id={triggerId}
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={open ? listboxId : undefined}
      aria-activedescendant={open ? activeItemId : undefined}
      aria-autocomplete="list"
      className={cn(
        "w-full min-w-0 h-x12 rounded-x2 bg-background1-secondary px-x3 py-x2 text-sm text-foreground-primary outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ring-brand",
        open && "ring-2 ring-ring-brand",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "flex items-center justify-between gap-x2 whitespace-nowrap",
        "h-9",
        className
      )}
      onClick={() => setOpen(!open)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="flex items-center gap-x2 flex-1 min-w-0 text-left">
        {children || selectedItem}
      </span>
      <Icon variant="chevron_down" className={cn("size-4 opacity-50 transition-transform shrink-0", open && "rotate-180")} />
    </button>
  )
}

interface SelectValueProps {
  placeholder?: string
  children?: React.ReactNode
}

function SelectValue({ placeholder, children }: SelectValueProps) {
  const { value, selectedItem } = useSelectContext()
  
  if (selectedItem) {
    return null
  }
  
  return <span className="text-foreground-secondary">{children || placeholder}</span>
}

interface SelectContentProps {
  className?: string
  children: React.ReactNode
}

function SelectContent({ className, children }: SelectContentProps) {
  const { open, contentRef, setFocusedIndex, focusedIndex, listboxId, triggerId } = useSelectContext()
  const itemsRef = React.useRef<(HTMLDivElement | null)[]>([])
  const typeaheadQuery = React.useRef("")
  const typeaheadTimeout = React.useRef<NodeJS.Timeout | null>(null)

  // Clone children to inject refs and count only SelectItem for navigation
  // Skip disabled items in navigation
  const childrenWithRefs = React.useMemo(() => {
    if (!open) return null
    
    let itemIndex = 0
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && (child.type as any)?.name === "SelectItem") {
        const props = child.props as SelectItemProps
        const isDisabled = props.disabled
        const currentIndex = isDisabled ? -1 : itemIndex++
        return React.cloneElement(child as React.ReactElement<any>, {
          _index: currentIndex,
          _registerRef: (ref: HTMLDivElement | null) => {
            if (currentIndex >= 0) {
              itemsRef.current[currentIndex] = ref
            }
          },
        })
      }
      return child
    })
  }, [children, open])

  // Initialize focused index to selected item after refs are registered
  React.useEffect(() => {
    if (!open) {
      // Clear refs when closed
      itemsRef.current = []
      return
    }
    
    // Use setTimeout to ensure refs are registered
    const timer = setTimeout(() => {
      const selectedIndex = itemsRef.current.findIndex((item) => {
        if (!item) return false
        return item.getAttribute("aria-selected") === "true"
      })
      if (selectedIndex >= 0) {
        setFocusedIndex(selectedIndex)
      } else if (itemsRef.current.length > 0) {
        setFocusedIndex(0)
      }
    }, 0)
    
    return () => clearTimeout(timer)
  }, [open, setFocusedIndex])

  // Focus management: move focus to listbox when opened
  React.useEffect(() => {
    if (open && contentRef.current) {
      // Focus the listbox container for keyboard navigation
      contentRef.current.focus()
    }
  }, [open])

  // Keyboard navigation with type-ahead search
  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Type-ahead search (single character)
      if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        e.preventDefault()
        typeaheadQuery.current += e.key.toLowerCase()
        
        // Clear timeout
        if (typeaheadTimeout.current) {
          clearTimeout(typeaheadTimeout.current)
        }
        
        // Find matching item
        const query = typeaheadQuery.current
        const matchIndex = itemsRef.current.findIndex((item, index) => {
          if (!item) return false
          const text = item.textContent?.toLowerCase() || ""
          return text.startsWith(query) && index > focusedIndex
        })
        
        if (matchIndex >= 0) {
          setFocusedIndex(matchIndex)
          itemsRef.current[matchIndex]?.scrollIntoView({ block: "nearest" })
        } else {
          // Try from beginning
          const firstMatch = itemsRef.current.findIndex((item) => {
            if (!item) return false
            const text = item.textContent?.toLowerCase() || ""
            return text.startsWith(query)
          })
          if (firstMatch >= 0) {
            setFocusedIndex(firstMatch)
            itemsRef.current[firstMatch]?.scrollIntoView({ block: "nearest" })
          }
        }
        
        // Reset query after delay
        typeaheadTimeout.current = setTimeout(() => {
          typeaheadQuery.current = ""
        }, 1000)
        return
      }
      
      if (e.key === "ArrowDown") {
        e.preventDefault()
        const next = focusedIndex < itemsRef.current.length - 1 ? focusedIndex + 1 : 0
        setFocusedIndex(next)
        itemsRef.current[next]?.scrollIntoView({ block: "nearest" })
        typeaheadQuery.current = ""
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const next = focusedIndex > 0 ? focusedIndex - 1 : itemsRef.current.length - 1
        setFocusedIndex(next)
        itemsRef.current[next]?.scrollIntoView({ block: "nearest" })
        typeaheadQuery.current = ""
      } else if (e.key === "Home") {
        e.preventDefault()
        setFocusedIndex(0)
        itemsRef.current[0]?.scrollIntoView({ block: "nearest" })
        typeaheadQuery.current = ""
      } else if (e.key === "End") {
        e.preventDefault()
        const lastIndex = itemsRef.current.length - 1
        setFocusedIndex(lastIndex)
        itemsRef.current[lastIndex]?.scrollIntoView({ block: "nearest" })
        typeaheadQuery.current = ""
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (focusedIndex >= 0 && itemsRef.current[focusedIndex]) {
          itemsRef.current[focusedIndex]?.click()
        }
        typeaheadQuery.current = ""
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      if (typeaheadTimeout.current) {
        clearTimeout(typeaheadTimeout.current)
      }
    }
  }, [open, focusedIndex, setFocusedIndex, contentRef])

  if (!open || !childrenWithRefs) return null

  // Render in portal to avoid z-index and overflow issues
  // Check for SSR
  if (typeof document === "undefined") return null

  return createPortal(
    <div
      ref={contentRef}
      id={listboxId}
      role="listbox"
      tabIndex={-1}
      aria-labelledby={triggerId}
      className={cn(
        "fixed z-50 bg-background1-secondary text-foreground-primary rounded-x2 shadow-md",
        "p-x1 max-h-[300px] overflow-y-auto",
        "animate-in fade-in-0 zoom-in-95",
        "outline-none",
        className
      )}
    >
      <div className="flex flex-col gap-x1">
        {childrenWithRefs}
      </div>
    </div>,
    document.body
  )
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
  textValue?: string
  disabled?: boolean
  _index?: number
  _registerRef?: (ref: HTMLDivElement | null) => void
}

function SelectItem({ className, value, children, textValue, _index, _registerRef, disabled, ...props }: SelectItemProps) {
  const { value: selectedValue, onValueChange, setSelectedItem, setOpen, focusedIndex, setFocusedIndex, listboxId } = useSelectContext()
  const itemRef = React.useRef<HTMLDivElement>(null)
  const index = _index ?? -1
  const itemId = `${listboxId}-item-${index}`

  const isSelected = selectedValue === value
  const isFocused = focusedIndex === index

  React.useEffect(() => {
    if (isSelected) {
      // Use textValue for trigger if provided, otherwise use children
      // This allows custom trigger content without duplicating full item content
      setSelectedItem(textValue ? <span>{textValue}</span> : children)
    }
  }, [isSelected, children, textValue, setSelectedItem])

  React.useEffect(() => {
    if (_registerRef && itemRef.current) {
      _registerRef(itemRef.current)
    }
  }, [_registerRef])

  React.useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.scrollIntoView({ block: "nearest" })
    }
  }, [isFocused])

  return (
    <div
      ref={itemRef}
      id={itemId}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-disabled={disabled}
      className={cn(
        "relative flex w-full cursor-default items-center gap-x2 rounded-x1 py-2 pr-x8 pl-x2 text-sm text-foreground-primary select-none transition-colors",
        "hover:bg-background1-primary focus:bg-background1-secondary focus:text-foreground-primary",
        disabled && "pointer-events-none opacity-50",
        (isSelected || isFocused) && "bg-background1-secondary",
        className
      )}
      onClick={() => {
        if (!disabled) {
          onValueChange(value)
          setSelectedItem(children)
        }
      }}
      onMouseEnter={() => {
        if (!disabled) {
          setFocusedIndex(index)
        }
      }}
      {...props}
    >
      <span className="w-full">{children}</span>
      {isSelected && (
        <span className="absolute right-x2 flex size-3.5 items-center justify-center" aria-hidden="true">
          <Icon variant="circle_checkmark" className="size-4" />
        </span>
      )}
    </div>
  )
}

function SelectGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}

function SelectLabel({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-foreground-secondary px-x2 py-x1.5 text-xs block", className)}
      {...props}
    />
  )
}

function SelectSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn("bg-border-secondary pointer-events-none -mx-x1 my-x1 h-px border-0", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  useSelectContext,
}
