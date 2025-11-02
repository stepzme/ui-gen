import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function GiftCard({ className, ...props }: IconProps) {
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
      
      <path d="M13.8569 6C13.0604 5.36387 12.8265 4.22417 13.3517 3.31444C13.9307 2.31149 15.2132 1.96786 16.2162 2.54691C16.8958 2.93932 17.6028 4.45948 17.9879 5.39866C18.373 4.45948 19.0799 2.93932 19.7596 2.54691C20.7625 1.96786 22.045 2.31149 22.6241 3.31444C23.1022 4.14256 22.9256 5.63105 21.8615 6.19466C22.5348 6.51673 23 7.20462 23 8.00122V10H19V6.00006H17V10L1 10V8.00122C1 6.89598 1.89543 6 3 6H13.8569Z" fill="currentColor"/>
      <path d="M1 12V19.9988C1 21.104 1.89543 22 3 22H17V12L1 12Z" fill="currentColor"/>
      <path d="M21 22H19V12H23V19.9988C23 21.104 22.1046 22 21 22Z" fill="currentColor"/>
      
    </svg>
  )
}
