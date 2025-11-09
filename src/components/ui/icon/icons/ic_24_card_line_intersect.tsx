import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardLineIntersect({ className, ...props }: IconProps) {
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
      
      <path d="M3 4C1.89543 4 1 4.89543 1 6V8.0332H23L23 6C23 4.89543 22.1046 4 21 4H3Z" fill="currentColor"/>
      <path d="M23 10.0332H1V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18L23 10.0332Z" fill="currentColor"/>
      
    </svg>
  )
}
