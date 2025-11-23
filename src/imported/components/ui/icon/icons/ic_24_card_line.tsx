import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardLine({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4H3ZM4.4 7C4.17909 7 4 7.17909 4 7.4L4 8.6C4 8.82091 4.17908 9 4.4 9L19.6286 9.00003C19.8495 9.00004 20.0286 8.82095 20.0286 8.60004L20.0286 7.40004C20.0286 7.17912 19.8495 7.00003 19.6286 7.00003L4.4 7Z" fill="currentColor"/>
      
    </svg>
  )
}
