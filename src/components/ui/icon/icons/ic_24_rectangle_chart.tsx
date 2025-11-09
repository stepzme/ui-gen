import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function RectangleChart({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M21 3C21 1.89543 20.1046 1 19 1H5C3.89543 1 3 1.89543 3 3V21C3 22.1046 3.89543 23 5 23H19C20.1046 23 21 22.1046 21 21V3ZM16.4 9C16.1791 9 16 9.17909 16 9.4V19.6C16 19.8209 16.1791 20 16.4 20H17.6C17.8209 20 18 19.8209 18 19.6V9.4C18 9.17909 17.8209 9 17.6 9H16.4ZM11.4 20C11.1791 20 11 19.8209 11 19.6V12.4C11 12.1791 11.1791 12 11.4 12H12.6C12.8209 12 13 12.1791 13 12.4V19.6C13 19.8209 12.8209 20 12.6 20H11.4ZM6.4 15C6.17909 15 6 15.1791 6 15.4V19.6C6 19.8209 6.17909 20 6.4 20H7.6C7.82091 20 8 19.8209 8 19.6V15.4C8 15.1791 7.82091 15 7.6 15H6.4Z" fill="currentColor"/>
      
    </svg>
  )
}
