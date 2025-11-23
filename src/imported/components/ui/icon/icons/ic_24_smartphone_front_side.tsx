import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function SmartphoneFrontSide({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M19 3C19 1.89543 18.1046 1 17 1H7C5.89543 1 5 1.89543 5 3V21C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21L19 3ZM13.6 20C13.8209 20 14 19.8209 14 19.6V18.4C14 18.1791 13.8209 18 13.6 18H10.4C10.1791 18 10 18.1791 10 18.4V19.6C10 19.8209 10.1791 20 10.4 20H13.6Z" fill="currentColor"/>
      
    </svg>
  )
}
