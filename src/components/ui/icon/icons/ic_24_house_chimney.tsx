import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function HouseChimney({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M18 4.5V1.4C18 1.17909 18.1791 1 18.4 1H20.6C20.8209 1 21 1.17909 21 1.4V7L18 4.5Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.60142 10.372C1.2168 10.7483 1 11.2636 1 11.8017V21C1 22.1046 1.89543 23 3 23H21C22.1046 23 23 22.1046 23 21V11.8033C23 11.2643 22.7824 10.7481 22.3966 10.3717L13.3832 1.57895C12.6056 0.820359 11.3646 0.821223 10.588 1.5809L1.60142 10.372ZM9.9 12.3647C9.67909 12.3647 9.5 12.5438 9.5 12.7647V16.9647C9.5 17.1857 9.67909 17.3647 9.9 17.3647H14.1C14.3209 17.3647 14.5 17.1857 14.5 16.9647V12.7647C14.5 12.5438 14.3209 12.3647 14.1 12.3647H9.9Z" fill="currentColor"/>
      
    </svg>
  )
}
