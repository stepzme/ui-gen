import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Gift({ className, ...props }: IconProps) {
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
      
      <path d="M7.05178 6.00016C6.07804 5.22255 5.79206 3.82928 6.43414 2.71717C7.14199 1.49113 8.70972 1.07106 9.93575 1.77891C10.7666 2.25861 11.6308 4.1169 12.1016 5.26498C12.5723 4.1169 13.4365 2.25861 14.2674 1.77891C15.4934 1.07106 17.0611 1.49113 17.769 2.71717C18.4111 3.82928 18.1251 5.22255 17.1513 6.00016H20C21.1046 6.00016 22 6.89559 22 8.00016V10.1291L2 10.1207V8.00016C2 6.89559 2.89543 6.00016 4 6.00016H7.05178Z" fill="currentColor"/>
      <path d="M13 12.0047L22 12.0084V20.0002C22 21.1047 21.1046 22.0002 20 22.0002H13V12.0047Z" fill="currentColor"/>
      <path d="M11 21.9963V12H2L2 20.0002C2 21.1047 2.89543 22.0002 4 22.0002L11 21.9963Z" fill="currentColor"/>
      
    </svg>
  )
}
