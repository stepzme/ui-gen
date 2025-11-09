import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Storage({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M11 2H3C2.44727 2 2 2.44775 2 3V11H11V2ZM9.52344 5H8.02344V8H9.52344V5Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 13V21C2 21.5522 2.44727 22 3 22H11V13H2ZM9.52344 16H8.02344V19H9.52344V16Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13 22H21C21.5527 22 22 21.5522 22 21V13H13V22ZM20.5234 16H19.0215V19H20.5234V16Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M22 11V3C22 2.66113 21.832 2.36182 21.5742 2.18091C21.4121 2.06689 21.2129 2 21 2H13V11H22ZM19.0215 5H20.5234V8H19.0215V5Z" fill="currentColor"/>
      
    </svg>
  )
}
