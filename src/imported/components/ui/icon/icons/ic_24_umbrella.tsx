import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Umbrella({ className, ...props }: IconProps) {
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
      
      <path d="M11.0001 11.9385V19.5C11.0001 20.3284 10.3285 21 9.50007 21C8.67165 21 8.00007 20.3284 8.00007 19.5V19.4C8.00007 19.1791 7.82099 19 7.60007 19H6.40007C6.17916 19 6.00007 19.1791 6.00007 19.4V19.5C6.00007 21.433 7.56708 23 9.50007 23C11.4331 23 13.0001 21.433 13.0001 19.5V11.9385H20.8112C21.4002 11.9385 21.8659 11.4297 21.7468 10.8528C20.8778 6.64445 17.3516 3.40741 13.0001 2.97341V1.4C13.0001 1.17909 12.821 1 12.6001 1H11.4001C11.1792 1 11.0001 1.17909 11.0001 1.4V2.97348C6.64887 3.40777 3.12307 6.64468 2.25407 10.8528C2.13495 11.4297 2.60063 11.9385 3.18966 11.9385H11.0001Z" fill="currentColor"/>
      
    </svg>
  )
}
