import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Candle({ className, ...props }: IconProps) {
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
      
      <path d="M11.6578 1.66558C11.8082 1.38231 12.214 1.38231 12.3644 1.66558L14.0309 4.80492C14.7816 6.3064 13.6898 8.07301 12.0111 8.07301C10.3324 8.07301 9.24058 6.3064 9.99132 4.80492L11.6578 1.66558Z" fill="currentColor"/>
      <path d="M7.03125 10.0439C5.92668 10.0439 5.03125 10.9394 5.03125 12.0439V21.0002C5.03125 22.1048 5.92668 23.0002 7.03125 23.0002H16.9902C18.0948 23.0002 18.9902 22.1048 18.9902 21.0002V12.0439C18.9902 10.9394 18.0948 10.0439 16.9902 10.0439H7.03125Z" fill="currentColor"/>
      
    </svg>
  )
}
