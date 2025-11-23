import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Tobacco({ className, ...props }: IconProps) {
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
      
      <path d="M6.77945 12.6584L1.06384 15.9583C0.872519 16.0688 0.806969 16.3134 0.917426 16.5047L2.51743 19.276C2.62788 19.4673 2.87252 19.5329 3.06384 19.4224L8.77945 16.1225L6.77945 12.6584Z" fill="currentColor"/>
      <path d="M10.5115 15.1225L8.5115 11.6584L18.3822 5.95952L20.3822 9.42362L10.5115 15.1225Z" fill="currentColor"/>
      <path d="M22.1247 8.41761L22.636 8.12241C23.1143 7.84627 23.2782 7.23468 23.002 6.75639L22.002 5.02434C21.7259 4.54604 21.1143 4.38217 20.636 4.65831L20.1247 4.95351L22.1247 8.41761Z" fill="currentColor"/>
      
    </svg>
  )
}
