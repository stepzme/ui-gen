import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Delivery({ className, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      
      <path d="M22 4C22 3.44775 21.5522 3 21 3H3C2.44769 3 2 3.44775 2 4V6H22V4Z" fill="currentColor"/>
      <path d="M21 8H7.48596L20.286 16H21V8Z" fill="currentColor"/>
      <path d="M22 18H2V20C2 20.5522 2.44769 21 3 21H21C21.5522 21 22 20.5522 22 20V18Z" fill="currentColor"/>
      <path d="M3 16H16.5123L3.7124 8H3V16Z" fill="currentColor"/>
      
    </svg>
  )
}
