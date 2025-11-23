import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardRectanglePlus({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V17.9902C1 19.0948 1.89543 19.9902 3 19.9902H21C22.1046 19.9902 23 19.0948 23 17.9902V6C23 4.89543 22.1046 4 21 4H3ZM11.4 16C11.1791 16 11 15.8209 11 15.6V13.0049H8.4C8.17909 13.0049 8 12.8258 8 12.6049V11.4049C8 11.184 8.17909 11.0049 8.4 11.0049H11V8.4C11 8.17909 11.1791 8 11.4 8H12.6C12.8209 8 13 8.17909 13 8.4V11.0049H15.6C15.8209 11.0049 16 11.184 16 11.4049V12.6049C16 12.8258 15.8209 13.0049 15.6 13.0049H13V15.6C13 15.8209 12.8209 16 12.6 16H11.4Z" fill="currentColor"/>
      
    </svg>
  )
}
