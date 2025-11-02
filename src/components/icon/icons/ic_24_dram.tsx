import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Dram({ className, ...props }: IconProps) {
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
      
      <path d="M13.5 8C13.5 6.61929 12.3807 5.5 11 5.5H10C8.61929 5.5 7.5 6.61929 7.5 8V9.4C7.5 9.73137 7.23137 10 6.9 10H5.1C4.76863 10 4.5 9.73137 4.5 9.4V8C4.5 4.96243 6.96243 2.5 10 2.5H11C14.0376 2.5 16.5 4.96243 16.5 8V12.5H19.4C19.7314 12.5 20 12.7686 20 13.1V13.9C20 14.2314 19.7314 14.5 19.4 14.5H16.5V16.5H19.4C19.7314 16.5 20 16.7686 20 17.1V17.9C20 18.2314 19.7314 18.5 19.4 18.5H16.5V21.4C16.5 21.7314 16.2314 22 15.9 22H14.1C13.7686 22 13.5 21.7314 13.5 21.4V18.5H10.6C10.2686 18.5 10 18.2314 10 17.9V17.1C10 16.7686 10.2686 16.5 10.6 16.5H13.5V14.5H10.6C10.2686 14.5 10 14.2314 10 13.9V13.1C10 12.7686 10.2686 12.5 10.6 12.5H13.5V8Z" fill="currentColor"/>
      
    </svg>
  )
}
