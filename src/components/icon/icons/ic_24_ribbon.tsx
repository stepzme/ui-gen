import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Ribbon({ className, ...props }: IconProps) {
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
      
      <path d="M17.0944 2.22238C16.1515 1.43272 14.9608 1 13.7309 1H10.2684C9.03854 1 7.84783 1.43272 6.90489 2.22238C4.68357 4.08259 4.39399 7.39261 6.25856 9.61028L7.32703 10.8811L1.64382 17.6406C1.28791 18.0639 1.34319 18.6957 1.76719 19.0508L5.71787 22.3592C6.1407 22.7133 6.7704 22.6582 7.12532 22.2361L11.9997 16.4386L16.874 22.2361C17.2289 22.6582 17.8586 22.7133 18.2815 22.3592L22.2321 19.0508C22.6561 18.6957 22.7114 18.0639 22.3555 17.6406L11.2344 4.41824L12.7649 3.13086L17.9693 9.3184C19.5769 7.11068 19.2203 4.00262 17.0944 2.22238Z" fill="currentColor"/>
      
    </svg>
  )
}
