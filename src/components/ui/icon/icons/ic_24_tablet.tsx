import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Tablet({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M21 3C21 1.89543 20.1046 1 19 1H5C3.89543 1 3 1.89543 3 3V21C3 22.1046 3.89543 23 5 23H19C20.1046 23 21 22.1046 21 21V3ZM12 18.0278C11.1716 18.0278 10.5 18.6994 10.5 19.5278C10.5 20.3563 11.1716 21.0278 12 21.0278C12.8284 21.0278 13.5 20.3563 13.5 19.5278C13.5 18.6994 12.8284 18.0278 12 18.0278Z" fill="currentColor"/>
      
    </svg>
  )
}
