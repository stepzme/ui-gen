import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function StopButton({ className, ...props }: IconProps) {
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
      
      <path d="M14 4.4C14 4.17909 14.1791 4 14.4 4H17.6C17.8209 4 18 4.17909 18 4.4V19.6C18 19.8209 17.8209 20 17.6 20H14.4C14.1791 20 14 19.8209 14 19.6V4.4Z" fill="currentColor"/>
      <path d="M6 4.4C6 4.17909 6.17909 4 6.4 4H9.6C9.82091 4 10 4.17909 10 4.4V19.6C10 19.8209 9.82091 20 9.6 20H6.4C6.17909 20 6 19.8209 6 19.6V4.4Z" fill="currentColor"/>
      
    </svg>
  )
}
