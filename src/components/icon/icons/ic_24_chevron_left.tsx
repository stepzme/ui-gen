import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ChevronLeft({ className, ...props }: IconProps) {
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
      
      <path d="M13.852 16.3636C14.0053 16.2046 14.0007 15.9513 13.8417 15.798L10.0126 12.1054L13.8414 8.42027C14.0006 8.26708 14.0054 8.01386 13.8522 7.85469L13.3668 7.35034C13.2136 7.19117 12.9604 7.18633 12.8012 7.33952L8.14972 11.8164C7.98634 11.9737 7.98621 12.2351 8.14944 12.3925L12.8005 16.8777C12.9595 17.0311 13.2127 17.0265 13.366 16.8675L13.852 16.3636Z" fill="currentColor"/>
      
    </svg>
  )
}

