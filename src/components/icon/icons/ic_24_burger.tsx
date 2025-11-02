import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Burger({ className, ...props }: IconProps) {
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
      
      <path d="M2 7C2 3.68629 4.68629 1 8 1H16C19.3137 1 22 3.68629 22 7V8.12602C21.6804 8.04375 21.3453 8 21 8H3C2.6547 8 2.31962 8.04375 2 8.12602V7Z" fill="currentColor"/>
      <path d="M21 16C21.3453 16 21.6804 15.9562 22 15.874V17C22 20.3137 19.3137 23 16 23H8C4.68629 23 2 20.3137 2 17V15.874C2.31962 15.9562 2.6547 16 3 16H21Z" fill="currentColor"/>
      <path d="M3 10C1.89543 10 1 10.8954 1 12C1 13.1046 1.89543 14 3 14H21C22.1046 14 23 13.1046 23 12C23 10.8954 22.1046 10 21 10H3Z" fill="currentColor"/>
      
    </svg>
  )
}
