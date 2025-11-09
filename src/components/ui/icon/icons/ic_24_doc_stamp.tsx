import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function DocStamp({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M20 3C20 1.89543 19.1046 1 18 1L6 1C4.89543 1 4 1.89543 4 3L4 21C4 22.1046 4.89543 23 6 23H18C19.1046 23 20 22.1046 20 21V3ZM16.6 7C16.8209 7 17 6.82091 17 6.6V5.4C17 5.17909 16.8209 5 16.6 5H7.4C7.17909 5 7 5.17909 7 5.4V6.6C7 6.82091 7.17909 7 7.4 7H16.6ZM16.6 11C16.8209 11 17 10.8209 17 10.6V9.4C17 9.17909 16.8209 9 16.6 9H7.4C7.17909 9 7 9.17909 7 9.4V10.6C7 10.8209 7.17909 11 7.4 11H16.6ZM17 18.5C17 19.3284 16.3284 20 15.5 20C14.6716 20 14 19.3284 14 18.5C14 17.6716 14.6716 17 15.5 17C16.3284 17 17 17.6716 17 18.5Z" fill="currentColor"/>
      
    </svg>
  )
}
