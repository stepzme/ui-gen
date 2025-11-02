import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Cleaning({ className, ...props }: IconProps) {
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
      
      <path d="M6 1.4C6 1.17909 6.17909 1 6.4 1H7.6C7.82091 1 8 1.17909 8 1.4V14H10.6667C11.403 14 12 14.597 12 15.3333C12 15.7015 11.7015 16 11.3333 16H2.66667C2.29848 16 2 15.7015 2 15.3333C2 14.597 2.59695 14 3.33333 14H6V1.4Z" fill="currentColor"/>
      <path d="M3 17C3 18.86 2.432 22.1306 1 23H6C7 23 8.47852 21.5 8.47852 20.5V23H10C10.5523 23 11 22.5523 11 22V17H3Z" fill="currentColor"/>
      <path d="M15.5 19C16.3284 19 17 18.3284 17 17.5C17 16.6716 16.3284 16 15.5 16C14.6716 16 14 16.6716 14 17.5C14 18.3284 14.6716 19 15.5 19Z" fill="currentColor"/>
      <path d="M23 14.5C23 15.8807 21.8807 17 20.5 17C19.1193 17 18 15.8807 18 14.5C18 13.1193 19.1193 12 20.5 12C21.8807 12 23 13.1193 23 14.5Z" fill="currentColor"/>
      <path d="M15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5C13.567 5 12 6.567 12 8.5C12 10.433 13.567 12 15.5 12Z" fill="currentColor"/>
      
    </svg>
  )
}
