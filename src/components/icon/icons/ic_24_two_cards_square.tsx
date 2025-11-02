import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function TwoCardsSquare({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M2 3C1.44772 3 1 3.44772 1 4V14C1 14.5523 1.44772 15 2 15H17C17.5523 15 18 14.5523 18 14V4C18 3.44772 17.5523 3 17 3H2ZM3.93906 5.59863C3.71815 5.59863 3.53906 5.77772 3.53906 5.99863V8.20889C3.53906 8.4298 3.71815 8.60889 3.93906 8.60889H6.14932C6.37023 8.60889 6.54932 8.4298 6.54932 8.20889V5.99863C6.54932 5.77772 6.37023 5.59863 6.14932 5.59863H3.93906Z" fill="currentColor"/>
      <path d="M5 20V17H17C18.6569 17 20 15.6569 20 14V8H22C22.5523 8 23 8.44772 23 9V19C23 20.1046 22.1046 21 21 21H6C5.44772 21 5 20.5523 5 20Z" fill="currentColor"/>
      
    </svg>
  )
}
