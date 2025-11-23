import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Alcohol({ className, ...props }: IconProps) {
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
      
      <path d="M10.9 1C10.6791 1 10.5 1.17909 10.5 1.4V3H13.5V1.4C13.5 1.17909 13.3209 1 13.1 1H10.9Z" fill="currentColor"/>
      <path d="M13.5 4H10.5V7.92688C10.5 8.01356 10.4718 8.09789 10.4198 8.16719L8.80232 10.3194C8.28157 11.0124 8 11.8557 8 12.7225V21C8 22.1046 8.89543 23 10 23H14C15.1046 23 16 22.1046 16 21V12.7225C16 11.8557 15.7184 11.0124 15.1977 10.3194L13.5802 8.16719C13.5282 8.09789 13.5 8.01356 13.5 7.92688V4Z" fill="currentColor"/>
      
    </svg>
  )
}
