import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Ounce({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M18 1C19.1046 1 20 1.89543 20 3V21C20 22.1046 19.1046 23 18 23H6C4.89543 23 4 22.1046 4 21V3C4 1.89543 4.89543 1 6 1H18ZM17 8C17 10.2091 14.7614 12 12 12C9.23858 12 7 10.2091 7 8C7 5.79086 9.23858 4 12 4C14.7614 4 17 5.79086 17 8ZM13.5 19C13.5 19.5523 12.8284 20 12 20C11.1716 20 10.5 19.5523 10.5 19C10.5 18.4477 11.1716 18 12 18C12.8284 18 13.5 18.4477 13.5 19ZM7 14.4C7 14.1791 7.17909 14 7.4 14H16.6C16.8209 14 17 14.1791 17 14.4V15.6C17 15.8209 16.8209 16 16.6 16H7.4C7.17909 16 7 15.8209 7 15.6V14.4Z" fill="currentColor"/>
      
    </svg>
  )
}
