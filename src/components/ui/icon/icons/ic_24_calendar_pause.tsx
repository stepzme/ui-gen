import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CalendarPause({ className, ...props }: IconProps) {
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
      
      <path d="M3.99902 2C2.89445 2 1.99902 2.89543 1.99902 4V5.01953L21.999 5.01953V4C21.999 2.89543 21.1036 2 19.999 2H3.99902Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.999 7.01953L1.99902 7.01953V20C1.99902 21.1046 2.89445 22 3.99902 22H19.999C21.1036 22 21.999 21.1046 21.999 20V7.01953ZM10.2826 10.5439C10.5035 10.5439 10.6826 10.723 10.6826 10.9439V16.8798C10.6826 17.1007 10.5035 17.2798 10.2826 17.2798H9.08262C8.8617 17.2798 8.68262 17.1007 8.68262 16.8798V10.9439C8.68262 10.723 8.8617 10.5439 9.08262 10.5439H10.2826ZM15.3154 10.9439C15.3154 10.723 15.1363 10.5439 14.9154 10.5439H13.7154C13.4945 10.5439 13.3154 10.723 13.3154 10.9439V16.8798C13.3154 17.1007 13.4945 17.2798 13.7154 17.2798H14.9154C15.1363 17.2798 15.3154 17.1007 15.3154 16.8798V10.9439Z" fill="currentColor"/>
      
    </svg>
  )
}
