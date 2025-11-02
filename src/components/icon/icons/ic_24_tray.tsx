import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Tray({ className, ...props }: IconProps) {
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
      
      <path d="M13.0156 4H14.6C14.8209 4 15 3.82091 15 3.6V2.4C15 2.17909 14.8209 2 14.6 2H9.4C9.17909 2 9 2.17909 9 2.4V3.6C9 3.82091 9.17909 4 9.4 4H11.0156V6.04405C5.40167 6.54886 1 11.3298 1 17.1531V18H23V17.1531C23 11.3406 18.6147 6.56661 13.0156 6.04691V4Z" fill="currentColor"/>
      <path d="M22 22C22.5523 22 23 21.5523 23 21V20H1V21C1 21.5523 1.44772 22 2 22H22Z" fill="currentColor"/>
      
    </svg>
  )
}
