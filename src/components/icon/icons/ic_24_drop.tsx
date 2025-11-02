import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Drop({ className, ...props }: IconProps) {
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
      
      <path d="M11.0534 2.36023C11.3062 1.87992 11.994 1.87992 12.2468 2.36023L17.5269 12.3924C19.8544 16.8148 16.6476 22.1265 11.6501 22.1265C6.65264 22.1265 3.44576 16.8148 5.77331 12.3924L11.0534 2.36023Z" fill="currentColor"/>
      
    </svg>
  )
}
