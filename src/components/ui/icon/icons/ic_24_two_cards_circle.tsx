import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function TwoCardsCircle({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M2 3C1.44772 3 1 3.44772 1 4V14C1 14.5523 1.44772 15 2 15H17C17.5523 15 18 14.5523 18 14V4C18 3.44772 17.5523 3 17 3H2ZM9.50049 11.2056C10.7186 11.2056 11.7061 10.2181 11.7061 9C11.7061 7.7819 10.7186 6.79443 9.50049 6.79443C8.28239 6.79443 7.29492 7.7819 7.29492 9C7.29492 10.2181 8.28239 11.2056 9.50049 11.2056Z" fill="currentColor"/>
      <path d="M5 20V17H17C18.6569 17 20 15.6569 20 14V8H22C22.5523 8 23 8.44772 23 9V19C23 20.1046 22.1046 21 21 21H6C5.44772 21 5 20.5523 5 20Z" fill="currentColor"/>
      
    </svg>
  )
}
