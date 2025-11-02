import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Billiards({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M14.6121 3.66152C13.4637 1.62975 10.5371 1.62975 9.38869 3.66152L1.53039 17.5647C0.40003 19.5645 1.84486 22.0408 4.14208 22.0408H19.8587C22.1559 22.0408 23.6007 19.5645 22.4704 17.5647L14.6121 3.66152ZM15 20.041C17.2091 20.041 19 18.2502 19 16.041C19 13.8319 17.2091 12.041 15 12.041C12.7909 12.041 11 13.8319 11 16.041C11 18.2502 12.7909 20.041 15 20.041Z" fill="currentColor"/>
      
    </svg>
  )
}
