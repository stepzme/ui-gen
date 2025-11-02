import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function SIMCard({ className, ...props }: IconProps) {
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
      
      <path d="M1.78144 7.44304C1.28876 7.8216 1 8.40763 1 9.02895V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4H6.94209C6.50138 4 6.07301 4.14557 5.72354 4.41409L1.78144 7.44304Z" fill="currentColor"/>
      
    </svg>
  )
}
