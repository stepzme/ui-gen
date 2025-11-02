import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardRectangleCheckmark({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V17.9902C1 19.0948 1.89543 19.9902 3 19.9902H21C22.1046 19.9902 23 19.0948 23 17.9902V6C23 4.89543 22.1046 4 21 4H3ZM10.1906 16.2671C10.3468 16.4233 10.6001 16.4233 10.7563 16.2671L17.1794 9.84403C17.3356 9.68782 17.3356 9.43455 17.1794 9.27834L16.3309 8.42981C16.1746 8.27361 15.9214 8.27361 15.7652 8.42981L10.4735 13.7215L8.23514 11.4832C8.07893 11.327 7.82567 11.327 7.66946 11.4832L6.82093 12.3317C6.66472 12.488 6.66472 12.7412 6.82093 12.8974L10.1906 16.2671Z" fill="currentColor"/>
      
    </svg>
  )
}
