import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardSquare({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V17.9902C1 19.0948 1.89543 19.9902 3 19.9902H21C22.1046 19.9902 23 19.0948 23 17.9902V6C23 4.89543 22.1046 4 21 4H3ZM4.4 6.99023C4.17909 6.99023 4 7.16932 4 7.39023V10.5902C4 10.8111 4.17909 10.9902 4.4 10.9902H7.6C7.82091 10.9902 8 10.8111 8 10.5902V7.39023C8 7.16932 7.82091 6.99023 7.6 6.99023H4.4Z" fill="currentColor"/>
      
    </svg>
  )
}
