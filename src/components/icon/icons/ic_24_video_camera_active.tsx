import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function VideoCameraActive({ className, ...props }: IconProps) {
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
      
      <path d="M3 6C1.89539 6 1 6.89542 1 8V16C1 17.1046 1.89539 18 3 18H17C18.1046 18 19 17.1046 19 16V13.964L21.3094 16.1694C21.9458 16.7771 23.0001 16.326 23.0001 15.4462V8.55423C23.0001 7.67441 21.9458 7.22339 21.3094 7.83102L19 10.0364V8C19 6.89542 18.1046 6 17 6H3Z" fill="currentColor"/>
      
    </svg>
  )
}
