import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Display({ className, ...props }: IconProps) {
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
      
      <path d="M5 5V13H19V5H5Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1H20.9999C22.1045 1 22.9999 1.89543 22.9999 3V15.0283C22.9999 16.1329 22.1045 17.0283 20.9999 17.0283H13V20.9964L18.4292 20.996C18.6501 20.996 18.8292 21.1751 18.8292 21.396L18.8293 22.596C18.8293 22.8169 18.6503 22.996 18.4293 22.996L5.57008 22.997C5.34917 22.9971 5.17007 22.818 5.17005 22.5971L5.16995 21.3971C5.16994 21.1762 5.34901 20.9971 5.56992 20.997L11 20.9966V17.0283H3C1.89543 17.0283 1 16.1329 1 15.0283V3ZM4 3C3.44772 3 3 3.44772 3 4V14C3 14.5523 3.44772 15 4 15H20C20.5523 15 21 14.5523 21 14V4C21 3.44772 20.5523 3 20 3H4Z" fill="currentColor"/>
      
    </svg>
  )
}
