import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function VideocameraDots({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V14C1 15.1046 1.89543 16 3 16H4.50129L5.54521 19.896C5.77293 20.7458 6.90806 20.9086 7.36542 20.157L9.89487 16H17C18.1046 16 19 15.1046 19 14V11.964L21.3094 14.1694C21.9457 14.7771 23.0001 14.3261 23.0001 13.4462L23.0001 6.55424C23.0001 5.6744 21.9457 5.22338 21.3094 5.83103L19 8.03645V6C19 4.89543 18.1046 4 17 4H3ZM6 11C6.55228 11 7 10.5523 7 10C7 9.44771 6.55228 9 6 9C5.44772 9 5 9.44771 5 10C5 10.5523 5.44772 11 6 11ZM11 10C11 10.5523 10.5523 11 10 11C9.44771 11 9 10.5523 9 10C9 9.44771 9.44771 9 10 9C10.5523 9 11 9.44771 11 10ZM14 11C14.5523 11 15 10.5523 15 10C15 9.44771 14.5523 9 14 9C13.4477 9 13 9.44771 13 10C13 10.5523 13.4477 11 14 11Z" fill="currentColor"/>
      
    </svg>
  )
}
