import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Clocks({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9661 1C5.90967 1 1 5.90967 1 11.9661C1 18.0224 5.90967 22.9321 11.9661 22.9321C18.0224 22.9321 22.9321 18.0224 22.9321 11.9661C22.9321 5.90967 18.0224 1 11.9661 1ZM11.0172 5.26367C10.6927 5.26367 10.4297 5.52669 10.4297 5.85114V11.8761C10.4297 12.5503 10.8306 13.1599 11.4497 13.4269L16.9677 15.8073C17.2656 15.9358 17.6113 15.7984 17.7398 15.5005L18.3021 14.1969C18.4307 13.899 18.2933 13.5533 17.9954 13.4248L13.1426 11.3314C13.0708 11.3005 13.0243 11.2298 13.0243 11.1516V5.85114C13.0243 5.52669 12.7613 5.26367 12.4369 5.26367H11.0172Z" fill="currentColor"/>
      
    </svg>
  )
}
