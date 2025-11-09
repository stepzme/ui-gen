import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PieChartAlt2({ className, ...props }: IconProps) {
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
      
      <path d="M22.9921 10.5996C23.0008 10.8203 22.8209 11 22.6 11H13V1.4C13 1.17909 13.1797 0.999178 13.4004 1.00787C18.6048 1.21282 22.7872 5.39518 22.9921 10.5996Z" fill="currentColor"/>
      <path d="M11 3.4C11 3.17909 10.8203 2.99918 10.5996 3.00787C5.26236 3.21805 1 7.61126 1 13C1 18.5228 5.47715 23 11 23C16.3887 23 20.7819 18.7376 20.9921 13.4004C21.0008 13.1797 20.8209 13 20.6 13H11V3.4Z" fill="currentColor"/>
      
    </svg>
  )
}
