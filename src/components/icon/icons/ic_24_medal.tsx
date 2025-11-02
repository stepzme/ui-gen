import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Medal({ className, ...props }: IconProps) {
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
      
      <path d="M11.9951 14.1104C14.2226 14.1104 16.0283 12.3046 16.0283 10.0771C16.0283 7.84967 14.2226 6.04395 11.9951 6.04395C9.76764 6.04395 7.96191 7.84967 7.96191 10.0771C7.96191 12.3046 9.76764 14.1104 11.9951 14.1104Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17 17.5619C19.4109 15.9465 20.998 13.1972 20.998 10.0771C20.998 5.10497 16.9673 1.07422 11.9951 1.07422C7.02294 1.07422 2.99219 5.10497 2.99219 10.0771C2.99219 13.2014 4.58359 15.9539 7 17.5684V22.3526C7 22.65 7.31292 22.8434 7.57888 22.7104L12 20.5L16.4211 22.7106C16.6871 22.8435 17 22.6501 17 22.3528V17.5619ZM11.9951 16.1104C15.3272 16.1104 18.0283 13.4092 18.0283 10.0771C18.0283 6.7451 15.3272 4.04395 11.9951 4.04395C8.66307 4.04395 5.96191 6.7451 5.96191 10.0771C5.96191 13.4092 8.66307 16.1104 11.9951 16.1104Z" fill="currentColor"/>
      
    </svg>
  )
}
