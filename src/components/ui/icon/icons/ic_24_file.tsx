import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function File({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M18 23C19.1046 23 20 22.1046 20 21V8H16C14.3431 8 13 6.65685 13 5V1H6C4.89543 1 4 1.89543 4 3V21C4 22.1046 4.89543 23 6 23H18Z" fill="currentColor"/>
      <path d="M15 1V5C15 5.55228 15.4477 6 16 6H20L15 1Z" fill="currentColor"/>
      
    </svg>
  )
}
