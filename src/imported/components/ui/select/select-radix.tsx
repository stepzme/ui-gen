"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Icon } from "@/imported/components/ui/icon";

interface SelectContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within Select");
  }
  return context;
};

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value: controlledValue, onValueChange, children, defaultValue }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "");
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState<{
      top: number;
      left: number;
      width: number;
    } | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
        setOpen(false);
      },
      [isControlled, onValueChange]
    );

    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }, []);

    React.useEffect(() => {
      if (open) {
        updatePosition();
        const handleScroll = () => updatePosition();
        const handleResize = () => updatePosition();

        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("scroll", handleScroll, true);
          window.removeEventListener("resize", handleResize);
        };
      }
    }, [open, updatePosition]);

    React.useEffect(() => {
      if (open) {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            triggerRef.current?.contains(event.target as Node) ||
            contentRef.current?.contains(event.target as Node)
          ) {
            return;
          }
          setOpen(false);
        };

        const handleEscape = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          document.removeEventListener("keydown", handleEscape);
        };
      }
    }, [open]);

    const contextValue: SelectContextValue = React.useMemo(
      () => ({
        value,
        onValueChange: handleValueChange,
        open,
        setOpen,
        triggerRef,
      }),
      [value, handleValueChange, open]
    );

    // Extract SelectContent from children
    const selectContentChildren = React.useMemo(() => {
      const content = React.Children.toArray(children).find(
        (child) =>
          React.isValidElement(child) &&
          (child.type as any)?.displayName === "SelectContent"
      );
      return content && React.isValidElement(content)
        ? content.props.children
        : null;
    }, [children]);

    return (
      <SelectContext.Provider value={contextValue}>
        <div ref={ref}>{children}</div>
        {open &&
          typeof document !== "undefined" &&
          position &&
          selectContentChildren &&
          createPortal(
            <div
              ref={contentRef}
              className="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-elevation0-borderNormal bg-background1-primary p-1 shadow-md"
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${position.width}px`,
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {selectContentChildren}
            </div>,
            document.body
          )}
      </SelectContext.Provider>
    );
  }
);

Select.displayName = "Select";


interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ children, className, ...props }, ref) => {
  const context = useSelectContext();

  return (
    <button
      ref={(node) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;
        }
        context.triggerRef.current = node;
      }}
      type="button"
      role="combobox"
      aria-expanded={context.open}
      aria-haspopup="listbox"
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-elevation0-borderNormal bg-background0-primary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => context.setOpen(!context.open)}
      {...props}
    >
      <div className="flex-1 min-w-0 flex items-center">{children}</div>
      <Icon
        variant="chevron_down"
        className={cn(
          "h-4 w-4 opacity-50 shrink-0 transition-transform",
          context.open && "rotate-180"
        )}
      />
    </button>
  );
});

SelectTrigger.displayName = "SelectTrigger";

interface SelectContentProps {
  children: React.ReactNode;
}

export const SelectContent = ({ children }: SelectContentProps) => {
  // This is a marker component - actual rendering happens via portal in Select
  return null;
};

SelectContent.displayName = "SelectContent";

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  textValue?: string;
  disabled?: boolean;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, className, disabled = false, ...props }, ref) => {
    const context = useSelectContext();
    const isSelected = context.value === value;

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-8 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          isSelected && "bg-neutral-8",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        onClick={() => !disabled && context.onValueChange(value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            context.onValueChange(value);
          }
        }}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";

export const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-elevation0-borderNormal", className)}
      {...props}
    />
  );
});

SelectSeparator.displayName = "SelectSeparator";

export { useSelectContext };

