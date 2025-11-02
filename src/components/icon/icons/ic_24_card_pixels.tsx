import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardPixels({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V12.4C23 12.1791 22.8209 12 22.6 12H19V8H22.6C22.8209 8 23 7.82091 23 7.6V4.4C23 4.17909 22.8209 4 22.6 4H19.4C19.1791 4 19 4.17909 19 4.4V8H15V4.4C15 4.17909 14.8209 4 14.6 4H3ZM19 12V15.6C19 15.8209 18.8209 16 18.6 16H15.4C15.1791 16 15 15.8209 15 15.6V12.4C15 12.1791 15.1791 12 15.4 12H19Z" fill="currentColor"/>
      
    </svg>
  )
}
