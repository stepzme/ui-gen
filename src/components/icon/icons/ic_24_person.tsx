import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Person({ className, ...props }: IconProps) {
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
      
      <path d="M11.9998 11C14.7612 11 16.9998 8.76142 16.9998 6C16.9998 3.23858 14.7612 1 11.9998 1C9.23835 1 6.99977 3.23858 6.99977 6C6.99977 8.76142 9.23835 11 11.9998 11Z" fill="currentColor"/>
      <path d="M9.95202 13C6.41915 13 3.30457 15.3173 2.28941 18.7012L1.77218 20.4253C1.38722 21.7085 2.34811 23 3.68783 23H20.3117C21.6514 23 22.6123 21.7085 22.2274 20.4253L21.7101 18.7012C20.695 15.3173 17.5804 13 14.0475 13H9.95202Z" fill="currentColor"/>
      
    </svg>
  )
}
