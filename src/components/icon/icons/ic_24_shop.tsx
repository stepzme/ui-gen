import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Shop({ className, ...props }: IconProps) {
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
      
      <path d="M1 4.02019C1 2.90447 1.89543 2 3 2H21C22.1046 2 23 2.90447 23 4.02019V9.22218C23 10.7563 21.7688 11.9999 20.25 11.9999C18.7312 11.9999 17.5 10.7563 17.5 9.22219C17.5 10.7563 16.2688 11.9999 14.75 11.9999C13.2312 11.9999 12 10.7563 12 9.22219C12 10.7563 10.7688 11.9999 9.25 11.9999C7.73122 11.9999 6.5 10.7563 6.5 9.22219C6.5 10.7563 5.26878 11.9999 3.75 11.9999C2.23122 11.9999 1 10.7563 1 9.22219V4.02019Z" fill="currentColor"/>
      <path d="M2 15.2324C2 14.6745 2.44772 14.2223 3 14.2223H21C21.5523 14.2223 22 14.6745 22 15.2324V19.9798C22 21.0955 21.1046 22 20 22H14.4C14.1791 22 14 21.8191 14 21.596V17.4548C14 16.8969 13.5523 16.4447 13 16.4447H11C10.4477 16.4447 10 16.8969 10 17.4548V21.596C10 21.8191 9.82091 22 9.6 22H4C2.89543 22 2 21.0955 2 19.9798V15.2324Z" fill="currentColor"/>
      
    </svg>
  )
}
