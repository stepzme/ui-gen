import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Bulb({ className, ...props }: IconProps) {
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
      
      <path d="M20.6546 8.96759C20.6546 11.4291 19.4422 13.6298 17.5372 15.0914C16.6338 15.852 16.0044 16.8734 15.724 18H13V10H14.6C14.8209 10 15 9.82091 15 9.6V8.4C15 8.17909 14.8209 8 14.6 8H9.4C9.17909 8 9 8.17909 9 8.4V9.6C9 9.82091 9.17909 10 9.4 10H11L11 18H8.27419C7.98091 16.8257 7.30844 15.7659 6.3418 14.9971C4.50637 13.5361 3.3457 11.3767 3.3457 8.96759C3.3457 4.56721 7.22044 1 12.0002 1C16.7799 1 20.6546 4.56721 20.6546 8.96759Z" fill="currentColor"/>
      <path d="M8.4397 20V21.0343C8.4397 22.1389 9.33513 23.0343 10.4397 23.0343H13.8855C14.81 23.0343 15.5595 22.2848 15.5595 21.3603V20H8.4397Z" fill="currentColor"/>
      
    </svg>
  )
}
