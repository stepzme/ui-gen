import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Funnel({ className, ...props }: IconProps) {
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
      
      <path d="M23 4.74215V1.94287C23 1.39059 22.5523 0.942871 22 0.942871H2C1.44772 0.942871 1 1.39059 1 1.94287V4.74215C1 5.35587 1.28177 5.93561 1.76435 6.31478L9 12V19.9682C9 20.3658 9.23555 20.7257 9.59995 20.8847L14.44 22.9974C14.7042 23.1128 15 22.9192 15 22.6308V12L22.2357 6.31478C22.7182 5.93561 23 5.35587 23 4.74215Z" fill="currentColor"/>
      
    </svg>
  )
}
