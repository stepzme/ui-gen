import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Tenge({ className, ...props }: IconProps) {
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
      
      <path d="M4 5.1C4 4.76863 4.26863 4.5 4.6 4.5H19.4C19.7314 4.5 20 4.76863 20 5.1V5.9C20 6.23137 19.7314 6.5 19.4 6.5L4.6 6.5C4.26863 6.5 4 6.23137 4 5.9V5.1Z" fill="currentColor"/>
      <path d="M4 9.1C4 8.76863 4.26863 8.5 4.6 8.5H11.0994C11.0992 8.5 11.0996 8.5 11.0994 8.5L12.9 8.5C12.8998 8.5 12.9002 8.5 12.9 8.5H19.4C19.7314 8.5 20 8.76863 20 9.1V10.9C20 11.2314 19.7314 11.5 19.4 11.5L13.5 11.5V21.4C13.5 21.7314 13.2314 22 12.9 22H11.1C10.7686 22 10.5 21.7314 10.5 21.4V11.5L4.6 11.5C4.26863 11.5 4 11.2314 4 10.9V9.1Z" fill="currentColor"/>
      
    </svg>
  )
}
