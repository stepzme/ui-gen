import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Printer({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M6 7V4C6 2.34315 7.34315 1 9 1H15C16.6569 1 18 2.34315 18 4V7H21C22.1046 7 23 7.89543 23 9V19C23 19.5523 22.5523 20 22 20H18V15H20.6C20.8209 15 21 14.8209 21 14.6V13.4C21 13.1791 20.8209 13 20.6 13H3.4C3.17909 13 3 13.1791 3 13.4V14.6C3 14.8209 3.17909 15 3.4 15H6V20H2C1.44772 20 1 19.5523 1 19V9C1 7.89543 1.89543 7 3 7H6ZM8 4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V7H8V4Z" fill="currentColor"/>
      <path d="M8 15H16V22C16 22.5523 15.5523 23 15 23H9C8.44772 23 8 22.5523 8 22V15Z" fill="currentColor"/>
      
    </svg>
  )
}
