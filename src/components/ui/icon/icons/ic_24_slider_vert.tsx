import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function SliderVert({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M8 19.874L8 21.6C8 21.8209 7.82091 22 7.6 22H6.4C6.17909 22 6 21.8209 6 21.6V19.874C4.27477 19.4299 3 17.8638 3 16C3 14.1362 4.27477 12.5701 6 12.126L6 2.4C6 2.17909 6.17909 2 6.4 2L7.6 2C7.82091 2 8 2.17909 8 2.4L8 12.126C9.72523 12.5701 11 14.1362 11 16C11 17.8638 9.72523 19.4299 8 19.874ZM7 18C5.89543 18 5 17.1046 5 16C5 14.8954 5.89543 14 7 14C8.10457 14 9 14.8954 9 16C9 17.1046 8.10457 18 7 18Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18 4.12602V2.4C18 2.17909 17.8209 2 17.6 2L16.4 2C16.1791 2 16 2.17909 16 2.4V4.12602C14.2748 4.57006 13 6.13616 13 8C13 9.86384 14.2748 11.4299 16 11.874V21.6C16 21.8209 16.1791 22 16.4 22H17.6C17.8209 22 18 21.8209 18 21.6V11.874C19.7252 11.4299 21 9.86384 21 8C21 6.13616 19.7252 4.57006 18 4.12602ZM17 10C15.8954 10 15 9.10457 15 8C15 6.89543 15.8954 6 17 6C18.1046 6 19 6.89543 19 8C19 9.10457 18.1046 10 17 10Z" fill="currentColor"/>
      
    </svg>
  )
}
