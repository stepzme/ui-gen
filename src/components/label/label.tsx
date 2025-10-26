"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Text } from "@/components/text"
import { cn } from "@/lib/utils"

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  children: React.ReactNode
  className?: string
}

function Label({ className, children, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 pb-2 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Text 
        as="span"
        size="caption" 
        weight="medium" 
        textColor="default"
        className="leading-none"
      >
        {children}
      </Text>
    </LabelPrimitive.Root>
  )
}

export { Label }
