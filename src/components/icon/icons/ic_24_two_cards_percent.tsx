import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function TwoCardsPercent({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M2 3C1.44772 3 1 3.44772 1 4V14C1 14.5523 1.44772 15 2 15H17C17.5523 15 18 14.5523 18 14V4C18 3.44772 17.5523 3 17 3H2ZM6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8ZM12.5 12.9067C13.3284 12.9067 14 12.2352 14 11.4067C14 10.5783 13.3284 9.90674 12.5 9.90674C11.6716 9.90674 11 10.5783 11 11.4067C11 12.2352 11.6716 12.9067 12.5 12.9067ZM12.9243 6.33108C13.0806 6.48729 13.0806 6.74055 12.9243 6.89676L7.49002 12.3311C7.33381 12.4873 7.08055 12.4873 6.92434 12.3311L6.07581 11.4825C5.9196 11.3263 5.9196 11.0731 6.07581 10.9169L11.5101 5.48255C11.6663 5.32634 11.9196 5.32634 12.0758 5.48255L12.9243 6.33108Z" fill="currentColor"/>
      <path d="M5 20V17H17C18.6569 17 20 15.6569 20 14V8H22C22.5523 8 23 8.44772 23 9V19C23 20.1046 22.1046 21 21 21H6C5.44772 21 5 20.5523 5 20Z" fill="currentColor"/>
      
    </svg>
  )
}
