import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardLock({ className, ...props }: IconProps) {
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
      
      <path d="M1 4C1 2.89543 1.89543 2 3 2H20C21.1046 2 22 2.89543 22 4V10.9996C21.1643 10.3719 20.1256 10 19 10C16.3194 10 14.1316 12.1094 14.0057 14.7588C13.3886 15.3083 13 16.1087 13 17V18H3C1.89543 18 1 17.1046 1 16V4Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M19 12C20.6569 12 22 13.3431 22 15V16C22.5523 16 23 16.4477 23 17V21C23 21.5523 22.5523 22 22 22H16C15.4477 22 15 21.5523 15 21V17C15 16.4477 15.4477 16 16 16V15C16 13.3431 17.3431 12 19 12ZM19 14C18.4477 14 18 14.4477 18 15V16H20V15C20 14.4477 19.5523 14 19 14Z" fill="currentColor"/>
      
    </svg>
  )
}
