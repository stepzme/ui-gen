import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function JarCross({ className, ...props }: IconProps) {
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
      
      <path d="M7 2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H7V2Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M4 9C4 7.89543 4.89543 7 6 7H18C19.1046 7 20 7.89543 20 9V21C20 22.1046 19.1046 23 18 23H6C4.89543 23 4 22.1046 4 21V9ZM11.4 18.5C11.1791 18.5 11 18.3209 11 18.1V15.75H8.65C8.42909 15.75 8.25 15.5709 8.25 15.35V14.15C8.25 13.9291 8.42909 13.75 8.65 13.75H11V11.4C11 11.1791 11.1791 11 11.4 11H12.6C12.8209 11 13 11.1791 13 11.4V13.75H15.35C15.5709 13.75 15.75 13.9291 15.75 14.15V15.35C15.75 15.5709 15.5709 15.75 15.35 15.75H13V18.1C13 18.3209 12.8209 18.5 12.6 18.5H11.4Z" fill="currentColor"/>
      
    </svg>
  )
}
