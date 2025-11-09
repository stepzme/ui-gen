import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardZigzag({ className, ...props }: IconProps) {
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
      
      <path d="M3 4C1.89543 4 1 4.89543 1 6V17.9731C1 18.2583 1.05966 18.5295 1.16719 18.7749L7.43314 12.5089C7.58935 12.3527 7.84262 12.3527 7.99883 12.5089L11.0295 15.5396L18.2362 8.33265C18.3924 8.17644 18.6457 8.17644 18.8019 8.33264L19.6504 9.18116C19.8066 9.33736 19.8066 9.59063 19.6504 9.74684L11.3123 18.0852C11.1561 18.2414 10.9028 18.2414 10.7466 18.0852L7.71598 15.0545L2.8066 19.9639C2.87025 19.97 2.93476 19.9731 3 19.9731H20.9999C22.1045 19.9731 22.9999 19.0777 22.9999 17.9731V6C22.9999 4.89543 22.1045 4 20.9999 4H3Z" fill="currentColor"/>
      
    </svg>
  )
}
