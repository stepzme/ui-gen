import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function HeatPanel({ className, ...props }: IconProps) {
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
      
      <path d="M8 2H6C4.89543 2 4 2.89543 4 4V6H1.4C1.17909 6 1 6.17909 1 6.4V7.6C1 7.82091 1.17909 8 1.4 8H4V20C4 21.1046 4.89543 22 6 22H8V2Z" fill="currentColor"/>
      <path d="M10 22H14V2H10V22Z" fill="currentColor"/>
      <path d="M18 22H16V2H18C19.1046 2 20 2.89543 20 4V16H22.6C22.8209 16 23 16.1791 23 16.4V17.6C23 17.8209 22.8209 18 22.6 18H20V20C20 21.1046 19.1046 22 18 22Z" fill="currentColor"/>
      
    </svg>
  )
}
