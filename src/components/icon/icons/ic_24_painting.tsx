import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Painting({ className, ...props }: IconProps) {
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
      
      <path d="M16 11C17.1046 11 18 10.1046 18 9C18 7.89543 17.1046 7 16 7C14.8954 7 14 7.89543 14 9C14 10.1046 14.8954 11 16 11Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 3C1.89543 3 1 3.89543 1 5V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V5C23 3.89543 22.1046 3 21 3H3ZM21 5H3L3 13.6155L7.53986 10.1233C8.36496 9.4886 9.53894 9.59294 10.2392 10.3632L18.0908 19H21V5Z" fill="currentColor"/>
      
    </svg>
  )
}
