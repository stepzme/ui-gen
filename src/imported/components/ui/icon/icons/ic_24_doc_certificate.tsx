import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function DocCertificate({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M20 3C20 1.89543 19.1046 1 18 1L6 1C4.89543 1 4 1.89543 4 3L4 21C4 22.1046 4.89543 23 6 23H18C19.1046 23 20 22.1046 20 21V3ZM17 6.6C17 6.82091 16.8209 7 16.6 7H7.4C7.17909 7 7 6.82091 7 6.6V5.4C7 5.17909 7.17909 5 7.4 5H16.6C16.8209 5 17 5.17909 17 5.4V6.6ZM17 10.6C17 10.8209 16.8209 11 16.6 11H7.4C7.17909 11 7 10.8209 7 10.6V9.4C7 9.17909 7.17909 9 7.4 9H16.6C16.8209 9 17 9.17909 17 9.4V10.6ZM10.6 19C10.8209 19 11 18.8209 11 18.6V17.4C11 17.1791 10.8209 17 10.6 17H7.4C7.17909 17 7 17.1791 7 17.4V18.6C7 18.8209 7.17909 19 7.4 19H10.6ZM17 17.5C17 18.3284 16.3284 19 15.5 19C14.6716 19 14 18.3284 14 17.5C14 16.6716 14.6716 16 15.5 16C16.3284 16 17 16.6716 17 17.5Z" fill="currentColor"/>
      
    </svg>
  )
}
