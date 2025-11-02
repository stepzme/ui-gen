import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Passport({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M18 1C19.1046 1 20 1.89543 20 3V21C20 22.1046 19.1046 23 18 23H5C4.44771 23 4 22.5523 4 22V2C4 1.44772 4.44771 1 5 1H18ZM7.4 17C7.17909 17 7 16.8209 7 16.6V15.4C7 15.1791 7.17909 15 7.4 15H16.6C16.8209 15 17 15.1791 17 15.4V16.6C17 16.8209 16.8209 17 16.6 17H7.4ZM12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" fill="currentColor"/>
      
    </svg>
  )
}
