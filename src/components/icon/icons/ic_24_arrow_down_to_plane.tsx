import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ArrowDownToPlane({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M4.32812 11.2038C3.56411 10.368 4.15703 9.0227 5.28938 9.0227H8.77146L10.1488 2.52036C10.3369 1.63232 11.1208 0.99707 12.0286 0.99707C12.9402 0.99707 13.7264 1.63768 13.9104 2.53055L15.2489 9.0227H18.7204C19.8539 9.0227 20.4464 10.3703 19.6802 11.2055L12.9529 18.5389C12.4361 19.1022 11.5477 19.1014 11.0319 18.5372L4.32812 11.2038ZM23.0361 22.6312C23.0361 22.8521 22.857 23.0312 22.6361 23.0312H1.4C1.17909 23.0312 1 22.8521 1 22.6312V21.4312C1 21.2103 1.17909 21.0312 1.4 21.0312H22.6361C22.857 21.0312 23.0361 21.2103 23.0361 21.4312V22.6312Z" fill="currentColor"/>
      
    </svg>
  )
}
