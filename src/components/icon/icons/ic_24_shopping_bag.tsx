import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ShoppingBag({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M20 3C20 1.89543 19.1046 1 18 1L6 1C4.89543 1 4 1.89543 4 3L4 21C4 22.1046 4.89543 23 6 23H18C19.1046 23 20 22.1046 20 21V3ZM7 4.4V6C7 8.76142 9.23858 11 12 11C14.7614 11 17 8.76142 17 6V4.4C17 4.17909 16.8209 4 16.6 4H15.4C15.1791 4 15 4.17909 15 4.4V6C15 7.65685 13.6569 9 12 9C10.3431 9 9 7.65685 9 6V4.4C9 4.17909 8.82091 4 8.6 4H7.4C7.17909 4 7 4.17909 7 4.4Z" fill="currentColor"/>
      
    </svg>
  )
}
