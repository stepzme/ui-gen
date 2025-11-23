import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PlayButtonV2({ className, ...props }: IconProps) {
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
      
      <path d="M19.542 12.8094C20.1527 12.4144 20.1527 11.5856 19.542 11.1906L8.70923 4.18363C7.9915 3.71938 7 4.18892 7 4.99306V19.0069C7 19.8111 7.9915 20.2806 8.70922 19.8164L19.542 12.8094Z" fill="currentColor"/>
      
    </svg>
  )
}
