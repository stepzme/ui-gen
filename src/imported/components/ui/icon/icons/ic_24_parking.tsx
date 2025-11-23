import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Parking({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM8.4 5C8.17909 5 8 5.17909 8 5.4V18.6C8 18.8209 8.17909 19 8.4 19H9.6C9.82091 19 10 18.8209 10 18.6V13H14C16.2091 13 18 11.2091 18 9C18 6.79086 16.2091 5 14 5H8.4ZM14 11H10V7H14C15.1046 7 16 7.89543 16 9C16 10.1046 15.1046 11 14 11Z" fill="currentColor"/>
      
    </svg>
  )
}
