import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function TwoCardsArrowRight({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1 4C1 3.44772 1.44772 3 2 3H17C17.5523 3 18 3.44772 18 4V14C18 14.5523 17.5523 15 17 15H2C1.44772 15 1 14.5523 1 14V4ZM11.3545 6.74788C11.3545 6.04401 12.198 5.6832 12.707 6.16932L15.0923 8.44714C15.4223 8.76227 15.4223 9.28915 15.0923 9.60428L12.707 11.8821C12.198 12.3682 11.3545 12.0074 11.3545 11.3035V10L4.4 10C4.17909 10 4 9.82091 4 9.6V8.4C4 8.17909 4.17909 8 4.4 8L11.3545 8V6.74788Z" fill="currentColor"/>
      <path d="M5 17V20C5 20.5523 5.44772 21 6 21H21C22.1046 21 23 20.1046 23 19V9C23 8.44772 22.5523 8 22 8H20V14C20 15.6569 18.6569 17 17 17H5Z" fill="currentColor"/>
      
    </svg>
  )
}
