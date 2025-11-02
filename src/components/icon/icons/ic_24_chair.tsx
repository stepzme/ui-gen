import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Chair({ className, ...props }: IconProps) {
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
      
      <path d="M3 7C3 7.55228 3.44772 8 4 8H6C6.55228 8 7 8.44772 7 9V13C7 13.5523 7.44772 14 8 14H16C16.5523 14 17 13.5523 17 13V9C17 8.44772 17.4477 8 18 8H20C20.5523 8 21 7.55228 21 7V3C21 1.89543 20.1046 1 19 1H5C3.89543 1 3 1.89543 3 3V7Z" fill="currentColor"/>
      <path d="M1 11V16C1 17.8638 2.27477 19.4299 4 19.874V22.6C4 22.8209 4.17909 23 4.4 23H5.6C5.82091 23 6 22.8209 6 22.6V20H18V22.6C18 22.8209 18.1791 23 18.4 23H19.6C19.8209 23 20 22.8209 20 22.6V19.874C21.7252 19.4299 23 17.8638 23 16V11C23 10.4477 22.5523 10 22 10H20C19.4477 10 19 10.4477 19 11V15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15V11C5 10.4477 4.55228 10 4 10H2C1.44772 10 1 10.4477 1 11Z" fill="currentColor"/>
      
    </svg>
  )
}
