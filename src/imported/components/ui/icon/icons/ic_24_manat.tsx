import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Manat({ className, ...props }: IconProps) {
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
      
      <path d="M10.5 21.4C10.5 21.7314 10.7686 22 11.1 22H12.9C13.2314 22 13.5 21.7314 13.5 21.4V11.5H15C15.8284 11.5 16.5 12.1716 16.5 13V21.4C16.5 21.7314 16.7686 22 17.1 22H18.9C19.2314 22 19.5 21.7314 19.5 21.4V13C19.5 10.5147 17.4853 8.5 15 8.5H13.5V2.6C13.5 2.26863 13.2314 2 12.9 2H11.1C10.7686 2 10.5 2.26863 10.5 2.6V8.5H9C6.51472 8.5 4.5 10.5147 4.5 13V21.4C4.5 21.7314 4.76863 22 5.1 22H6.9C7.23137 22 7.5 21.7314 7.5 21.4V13C7.5 12.1716 8.17157 11.5 9 11.5H10.5V21.4Z" fill="currentColor"/>
      
    </svg>
  )
}
