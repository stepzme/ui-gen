import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function AirbarSetting({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 6.02832C1.89543 6.02832 1 6.92375 1 8.02832V15.9722C1 17.0767 1.89543 17.9722 3 17.9722H21C22.1046 17.9722 23 17.0767 23 15.9722V8.02832C23 6.92375 22.1046 6.02832 21 6.02832H3ZM4.9 10.5C4.67909 10.5 4.5 10.6791 4.5 10.9V13.1C4.5 13.3209 4.67909 13.5 4.9 13.5H7.1C7.32091 13.5 7.5 13.3209 7.5 13.1V10.9C7.5 10.6791 7.32091 10.5 7.1 10.5H4.9ZM10.5 10.9C10.5 10.6791 10.6791 10.5 10.9 10.5H13.1C13.3209 10.5 13.5 10.6791 13.5 10.9V13.1C13.5 13.3209 13.3209 13.5 13.1 13.5H10.9C10.6791 13.5 10.5 13.3209 10.5 13.1V10.9ZM16.9 10.5C16.6791 10.5 16.5 10.6791 16.5 10.9V13.1C16.5 13.3209 16.6791 13.5 16.9 13.5H19.1C19.3209 13.5 19.5 13.3209 19.5 13.1V10.9C19.5 10.6791 19.3209 10.5 19.1 10.5H16.9Z" fill="currentColor"/>
      
    </svg>
  )
}
