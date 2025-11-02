import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Restaurant({ className, ...props }: IconProps) {
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
      
      <path d="M2 8C2 10.2091 3.79086 12 6 12V16H18V12C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4C17.2611 4 16.5689 4.20037 15.9749 4.54975C15.7512 2.55257 14.0569 1 12 1C9.94308 1 8.24878 2.55257 8.02506 4.54975C7.43108 4.20037 6.73894 4 6 4C3.79086 4 2 5.79086 2 8Z" fill="currentColor"/>
      <path d="M18 18H6V20C6 20.5523 6.44771 21 7 21H17C17.5523 21 18 20.5523 18 20V18Z" fill="currentColor"/>
      
    </svg>
  )
}
