import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function HouseGarage({ className, ...props }: IconProps) {
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
      
      <path d="M1.60112 10.3719C1.21668 10.7482 1 11.2634 1 11.8013V20.9998C1 22.1044 1.89543 22.9998 3 22.9998H5.01181V21.2669H5V17.4074C5 16.8563 5.09111 16.309 5.26966 15.7876L6.61573 11.8567C6.79113 11.3445 7.27569 11 7.82076 11H16.1792C16.7243 11 17.2089 11.3445 17.3843 11.8567L18.7303 15.7876C18.9089 16.309 19 16.8563 19 17.4074V22.9998H21C22.1046 22.9998 23 22.1044 23 20.9998V11.7944C23 11.2606 22.7866 10.7489 22.4073 10.3733L13.4639 1.51688C12.6877 0.748258 11.4384 0.744573 10.6577 1.5086L1.60112 10.3719Z" fill="currentColor"/>
      <path d="M17.0067 22.9998L16.8066 22.0589C16.7084 21.5971 16.3006 21.2669 15.8285 21.2669H8.18333C7.71119 21.2669 7.30337 21.5971 7.20519 22.0589L7.00515 22.9998H17.0067Z" fill="currentColor"/>
      
    </svg>
  )
}
