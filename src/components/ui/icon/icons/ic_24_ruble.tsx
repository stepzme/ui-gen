import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Ruble({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M7.1 2.5C6.76863 2.5 6.5 2.76863 6.5 3.1V11.5H3.6C3.26863 11.5 3 11.7686 3 12.1V13.9C3 14.2314 3.26863 14.5 3.6 14.5H6.5V16.5H3.6C3.26863 16.5 3 16.7686 3 17.1V17.9C3 18.2314 3.26863 18.5 3.6 18.5H6.5V21.4C6.5 21.7314 6.76863 22 7.1 22H8.9C9.23137 22 9.5 21.7314 9.5 21.4V18.5H15.4C15.7314 18.5 16 18.2314 16 17.9V17.1C16 16.7686 15.7314 16.5 15.4 16.5H9.5V14.5H15C17.4853 14.5 19.5 12.4853 19.5 10V7C19.5 4.51472 17.4853 2.5 15 2.5H7.1ZM15 11.5H9.5V5.8C9.5 5.63431 9.63431 5.5 9.8 5.5H15C15.8284 5.5 16.5 6.17157 16.5 7V10C16.5 10.8284 15.8284 11.5 15 11.5Z" fill="currentColor"/>
      
    </svg>
  )
}
