import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Tickets({ className, ...props }: IconProps) {
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
      
      <path d="M22 8.5C22.5523 8.5 23 8.94772 23 9.5V18.5C23 19.6046 22.1046 20.5 21 20.5H6C5.44772 20.5 5 20.0523 5 19.5V17.5H17C18.6569 17.5 20 16.1569 20 14.5V8.5H22Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17 3.5C17.5523 3.5 18 3.94772 18 4.5V14.5C18 15.0523 17.5523 15.5 17 15.5H2C1.44772 15.5 1 15.0523 1 14.5V13.8877C1.60751 13.8877 2.10059 13.3946 2.10059 12.7871C2.10037 12.1798 1.60738 11.6875 1 11.6875V10.5986C1.60751 10.5986 2.10059 10.1056 2.10059 9.49805C2.10037 8.89071 1.60738 8.39844 1 8.39844V7.30957C1.60751 7.30957 2.10059 6.8165 2.10059 6.20898C2.10037 5.60165 1.60738 5.10938 1 5.10938V4.5C1 3.94772 1.44772 3.5 2 3.5H17ZM7 10V12H16V10H7ZM12 6V8H16V6H12Z" fill="currentColor"/>
      
    </svg>
  )
}
