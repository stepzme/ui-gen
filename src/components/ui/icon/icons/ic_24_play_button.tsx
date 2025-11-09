import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PlayButton({ className, ...props }: IconProps) {
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
      
      <path d="M14.5741 12.8167C15.1377 12.4182 15.1377 11.5821 14.5741 11.1836L4.57732 4.11541C3.91498 3.6471 3 4.12075 3 4.93193V19.0684C3 19.8796 3.91498 20.3532 4.57732 19.8849L14.5741 12.8167Z" fill="currentColor"/>
      <path d="M17.4 4.00016C17.1791 4.00016 17 4.17925 17 4.40016V19.6002C17 19.8211 17.1791 20.0002 17.4 20.0002H20.6C20.8209 20.0002 21 19.8211 21 19.6002V4.40016C21 4.17925 20.8209 4.00016 20.6 4.00016H17.4Z" fill="currentColor"/>
      
    </svg>
  )
}
