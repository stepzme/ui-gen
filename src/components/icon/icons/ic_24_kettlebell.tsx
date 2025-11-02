import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Kettlebell({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M5 5V8.82957C3.14864 10.6261 2 13.1295 2 15.8986C2 18.8929 3.61037 21.3001 4.47976 22.3816C4.81056 22.7931 5.31765 23 5.84562 23H18.1544C18.6824 23 19.1894 22.7931 19.5202 22.3816C20.3896 21.3001 22 18.8929 22 15.8986C22 13.1295 20.8514 10.6261 19 8.82957V5C19 2.79086 17.2091 1 15 1H9C6.79086 1 5 2.79086 5 5ZM9 3C7.89543 3 7 3.89543 7 5V7.32425C8.47087 6.48203 10.1786 6 12 6C13.8214 6 15.5291 6.48203 17 7.32425V5C17 3.89543 16.1046 3 15 3H9Z" fill="currentColor"/>
      
    </svg>
  )
}
