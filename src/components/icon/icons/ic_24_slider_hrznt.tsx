import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function SliderHrznt({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M4.12602 8H2.4C2.17909 8 2 7.82091 2 7.6V6.4C2 6.17909 2.17909 6 2.4 6H4.12602C4.57006 4.27477 6.13616 3 8 3C9.86384 3 11.4299 4.27477 11.874 6H21.6C21.8209 6 22 6.17909 22 6.4V7.6C22 7.82091 21.8209 8 21.6 8H11.874C11.4299 9.72523 9.86384 11 8 11C6.13616 11 4.57006 9.72523 4.12602 8ZM6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.874 18H21.6C21.8209 18 22 17.8209 22 17.6V16.4C22 16.1791 21.8209 16 21.6 16H19.874C19.4299 14.2748 17.8638 13 16 13C14.1362 13 12.5701 14.2748 12.126 16H2.4C2.17909 16 2 16.1791 2 16.4V17.6C2 17.8209 2.17909 18 2.4 18H12.126C12.5701 19.7252 14.1362 21 16 21C17.8638 21 19.4299 19.7252 19.874 18ZM14 17C14 15.8954 14.8954 15 16 15C17.1046 15 18 15.8954 18 17C18 18.1046 17.1046 19 16 19C14.8954 19 14 18.1046 14 17Z" fill="currentColor"/>
      
    </svg>
  )
}
