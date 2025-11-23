import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function SmartphoneBackSide({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M17 1C18.1046 1 19 1.89543 19 3L19 21C19 22.1046 18.1046 23 17 23H7C5.89543 23 5 22.1046 5 21V3C5 1.89543 5.89543 1 7 1H17ZM10 4.5C10 5.32843 9.32843 6 8.5 6C7.67157 6 7 5.32843 7 4.5C7 3.67157 7.67157 3 8.5 3C9.32843 3 10 3.67157 10 4.5ZM8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" fill="currentColor"/>
      
    </svg>
  )
}
