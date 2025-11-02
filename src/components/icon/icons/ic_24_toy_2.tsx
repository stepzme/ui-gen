import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Toy2({ className, ...props }: IconProps) {
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
      
      <path d="M5 15.6699C5 14.5654 5.89543 13.6699 7 13.6699H17C18.1046 13.6699 19 14.5654 19 15.6699C19 16.7745 18.1046 17.6699 17 17.6699H7C5.89543 17.6699 5 16.7745 5 15.6699Z" fill="currentColor"/>
      <path d="M15 4C15 5.65685 13.6569 7 12 7C10.3431 7 9 5.65685 9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4Z" fill="currentColor"/>
      <path d="M7 10.3398C7 9.23527 7.89543 8.33984 9 8.33984H15C16.1046 8.33984 17 9.23527 17 10.3398C17 11.4444 16.1046 12.3398 15 12.3398H9C7.89543 12.3398 7 11.4444 7 10.3398Z" fill="currentColor"/>
      <path d="M4 20C4 19.4477 4.44772 19 5 19H19C19.5523 19 20 19.4477 20 20C20 21.6569 18.6569 23 17 23H7C5.34315 23 4 21.6569 4 20Z" fill="currentColor"/>
      
    </svg>
  )
}
