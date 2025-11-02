import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Bullions({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1.06866 17.4824L4.27196 5.48505C4.50577 4.60936 5.30038 4 6.20847 4H17.6096C18.5069 4 19.2949 4.59526 19.5384 5.45715L22.9236 17.4362C23.284 18.7115 22.3245 19.9777 20.9968 19.9791L3.00721 19.9973C1.68979 19.9987 0.729461 18.7528 1.06866 17.4824Z" fill="currentColor"/>
      
    </svg>
  )
}
