import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ExclamationPoint({ className, ...props }: IconProps) {
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
      
      <path d="M10.2977 1C9.99878 1 9.75855 1.24626 9.76595 1.5451L10.0993 14.9881C10.1064 15.2766 10.3424 15.5068 10.631 15.5068H13.3698C13.6584 15.5068 13.8944 15.2766 13.9015 14.9881L14.2348 1.5451C14.2422 1.24626 14.002 1 13.7031 1H10.2977ZM12.0004 23C13.3642 23 14.4432 21.9659 14.4432 20.6471C14.4432 19.3283 13.3642 18.2943 12.0004 18.2943C10.6366 18.2943 9.55762 19.3283 9.55762 20.6471C9.55762 21.9659 10.6366 23 12.0004 23Z" fill="currentColor"/>
      
    </svg>
  )
}
