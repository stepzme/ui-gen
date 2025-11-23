import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function VoiceAssistant({ className, ...props }: IconProps) {
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
      
      <path d="M19 7C19 7.55228 18.5523 8 18 8H6C5.44772 8 5 7.55228 5 7V5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V7Z" fill="currentColor"/>
      <path d="M23 13C23 13.5523 22.5523 14 22 14H2C1.44772 14 1 13.5523 1 13V11C1 10.4477 1.44772 10 2 10H22C22.5523 10 23 10.4477 23 11V13Z" fill="currentColor"/>
      <path d="M5 19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V17C19 16.4477 18.5523 16 18 16H6C5.44772 16 5 16.4477 5 17V19Z" fill="currentColor"/>
      
    </svg>
  )
}
