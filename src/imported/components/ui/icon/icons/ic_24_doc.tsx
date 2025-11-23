import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Doc({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M20 3C20 1.89543 19.1046 1 18 1L6 1C4.89543 1 4 1.89543 4 3L4 21C4 22.1046 4.89543 23 6 23H18C19.1046 23 20 22.1046 20 21V3ZM7.4 7C7.17909 7 7 6.82091 7 6.6V5.4C7 5.17909 7.17909 5 7.4 5H16.6C16.8209 5 17 5.17909 17 5.4V6.6C17 6.82091 16.8209 7 16.6 7H7.4ZM7.4 11C7.17909 11 7 10.8209 7 10.6V9.4C7 9.17909 7.17909 9 7.4 9H13.6C13.8209 9 14 9.17909 14 9.4V10.6C14 10.8209 13.8209 11 13.6 11H7.4Z" fill="currentColor"/>
      
    </svg>
  )
}
