import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function KettlebellPlus({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M5 5V8.82957C3.14864 10.6261 2 13.1295 2 15.8986C2 18.8929 3.61037 21.3001 4.47976 22.3816C4.81056 22.7931 5.31765 23 5.84562 23H18.1544C18.6824 23 19.1894 22.7931 19.5202 22.3816C20.3896 21.3001 22 18.8929 22 15.8986C22 13.1295 20.8514 10.6261 19 8.82957V5C19 2.79086 17.2091 1 15 1H9C6.79086 1 5 2.79086 5 5ZM9 3C7.89543 3 7 3.89543 7 5V7.32425C8.47087 6.48203 10.1786 6 12 6C13.8214 6 15.5291 6.48203 17 7.32425V5C17 3.89543 16.1046 3 15 3H9ZM11 18.6V16H8.4C8.17909 16 8 15.8209 8 15.6V14.4C8 14.1791 8.17909 14 8.4 14H11V11.4C11 11.1791 11.1791 11 11.4 11H12.6C12.8209 11 13 11.1791 13 11.4V14L15.6 14C15.8209 14 16 14.1791 16 14.4V15.6C16 15.8209 15.8209 16 15.6 16H13V18.6C13 18.8209 12.8209 19 12.6 19H11.4C11.1791 19 11 18.8209 11 18.6Z" fill="currentColor"/>
      
    </svg>
  )
}
