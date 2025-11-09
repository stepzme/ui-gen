import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ClockArrows({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M9.35244 1.75734L7.69098 10.5741C7.35692 12.3468 8.44933 14.0076 10.0819 14.4876C10.1192 14.5046 10.157 14.521 10.1953 14.5367L20.8625 18.9135C21.4931 19.1722 22.218 18.9299 22.5663 18.344C22.9161 17.7556 22.7797 16.9994 22.2463 16.5703L14.3385 10.2079L12.6773 1.74476C12.5214 0.950663 11.8253 0.37793 11.0161 0.37793C10.202 0.37793 9.5032 0.957349 9.35244 1.75734Z" fill="currentColor"/>
      
    </svg>
  )
}
