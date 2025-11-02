import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function TwoCardsCheckmark({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1 4C1 3.44772 1.44772 3 2 3H17C17.5523 3 18 3.44772 18 4V14C18 14.5523 17.5523 15 17 15H2C1.44772 15 1 14.5523 1 14V4ZM13.496 7.34045C13.6522 7.18424 13.6522 6.93098 13.496 6.77477L12.6475 5.92624C12.4913 5.77003 12.238 5.77003 12.0818 5.92624L8.5002 9.50785L7.14075 8.14839C6.98454 7.99218 6.73127 7.99218 6.57506 8.14839L5.72653 8.99692C5.57032 9.15313 5.57032 9.4064 5.72653 9.56261L8.21736 12.0534C8.37357 12.2096 8.62684 12.2096 8.78305 12.0534L13.496 7.34045Z" fill="currentColor"/>
      <path d="M5 17V20C5 20.5523 5.44772 21 6 21H21C22.1046 21 23 20.1046 23 19V9C23 8.44772 22.5523 8 22 8H20V14C20 15.6569 18.6569 17 17 17H5Z" fill="currentColor"/>
      
    </svg>
  )
}
