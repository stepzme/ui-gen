import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CoinAlt1({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M22.9688 11.9219C22.9688 17.997 18.0439 22.9219 11.9688 22.9219C5.89362 22.9219 0.96875 17.997 0.96875 11.9219C0.96875 5.84674 5.89362 0.921875 11.9688 0.921875C18.0439 0.921875 22.9688 5.84674 22.9688 11.9219ZM11.9688 4.14062C11.1403 4.14062 10.4688 4.8122 10.4688 5.64062C10.4688 6.46905 11.1403 7.14062 11.9688 7.14062C14.6094 7.14062 16.75 9.28126 16.75 11.9219C16.75 12.7503 17.4216 13.4219 18.25 13.4219C19.0784 13.4219 19.75 12.7503 19.75 11.9219C19.75 7.62441 16.2662 4.14062 11.9688 4.14062Z" fill="currentColor"/>
      
    </svg>
  )
}
