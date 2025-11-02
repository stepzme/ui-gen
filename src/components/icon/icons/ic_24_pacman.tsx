import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Pacman({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12 23C16.2101 23 19.9845 20.6141 21.8406 17.1387C21.939 16.9543 21.8703 16.7271 21.6903 16.621L13 11.5L19.7141 4.55581C19.8648 4.4 19.8645 4.15197 19.707 4.00312C17.7234 2.12884 14.9377 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM11.5 9C12.3284 9 13 8.32843 13 7.5C13 6.67157 12.3284 6 11.5 6C10.6716 6 10 6.67157 10 7.5C10 8.32843 10.6716 9 11.5 9Z" fill="currentColor"/>
      
    </svg>
  )
}
