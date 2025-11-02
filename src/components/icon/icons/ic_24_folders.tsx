import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Folders({ className, ...props }: IconProps) {
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
      
      <path d="M10 5.6C10 5.82091 10.1791 6 10.4 6H20C20.5523 6 21 6.44772 21 7V16.6C21 16.8209 21.1791 17 21.4 17H22.6C22.8209 17 23 16.8209 23 16.6V7C23 5.34315 21.6569 4 20 4H10.4C10.1791 4 10 4.17909 10 4.4V5.6Z" fill="currentColor"/>
      <path d="M2 6C1.44772 6 1 6.44772 1 7V18C1 19.1046 1.89543 20 3 20H17C18.1046 20 19 19.1046 19 18V9.93103C19 8.82647 18.1046 7.93103 17 7.93103H9.40397C9.14483 7.93103 8.89581 7.83044 8.70938 7.65044L7.29062 6.2806C7.10419 6.1006 6.85517 6 6.59603 6H2Z" fill="currentColor"/>
      
    </svg>
  )
}
