import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function TwoCardsTriangleRight({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1 4C1 3.44772 1.44772 3 2 3H17C17.5523 3 18 3.44772 18 4V14C18 14.5523 17.5523 15 17 15H2C1.44772 15 1 14.5523 1 14V4ZM9.35153 6.13192C8.84248 5.6458 7.99902 6.00661 7.99902 6.71048V11.2661C7.99902 11.97 8.84249 12.3308 9.35153 11.8447L11.7368 9.56688C12.0668 9.25175 12.0668 8.72488 11.7368 8.40975L9.35153 6.13192Z" fill="currentColor"/>
      <path d="M5 17V20C5 20.5523 5.44772 21 6 21H21C22.1046 21 23 20.1046 23 19V9C23 8.44772 22.5523 8 22 8H20V14C20 15.6569 18.6569 17 17 17H5Z" fill="currentColor"/>
      
    </svg>
  )
}
