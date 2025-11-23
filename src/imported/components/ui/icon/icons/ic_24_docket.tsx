import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Docket({ className, ...props }: IconProps) {
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
      
      <path d="M8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 8.11018 15.3325 9.11147 14.3077 9.53846L7.23077 12.4872C6.48548 12.7977 6 13.5259 6 14.3333V21C6 22.1046 6.89543 23 8 23H16C17.1046 23 18 22.1046 18 21V7C18 3.68629 15.3137 1 12 1C8.68629 1 6 3.68629 6 7V7.6C6 7.82091 6.17909 8 6.4 8H7.6C7.82091 8 8 7.82091 8 7.6V7Z" fill="currentColor"/>
      
    </svg>
  )
}
