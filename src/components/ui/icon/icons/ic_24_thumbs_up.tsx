import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ThumbsUp({ className, ...props }: IconProps) {
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
      
      <path d="M21.0444 9.31111H14.6889C15.3441 6.69042 15.3407 5.16725 15.2672 3.56494C15.2022 2.1489 14.0286 1 12.6111 1C12.1386 1 11.745 1.38155 11.6734 1.8486C11.4146 3.5361 10.4523 7.66074 6 11V23H17.5712C18.7809 23 19.8666 22.2573 20.3051 21.1298L22.5346 15.3967C22.8422 14.6058 23 13.7646 23 12.916V11.2667C23 10.1866 22.1245 9.31111 21.0444 9.31111Z" fill="currentColor"/>
      <path d="M4 11H1.97778C1.43777 11 1 11.4378 1 11.9778V22.0222C1 22.5622 1.43777 23 1.97778 23H4V11Z" fill="currentColor"/>
      
    </svg>
  )
}
