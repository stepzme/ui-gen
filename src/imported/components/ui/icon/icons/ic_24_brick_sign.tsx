import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function BrickSign({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M13.0127 18.7861C17.4687 18.289 20.9333 14.5095 20.9333 9.92078C20.9333 4.99397 16.9394 1 12.0126 1C7.08576 1 3.0918 4.99397 3.0918 9.92078C3.0918 14.5096 6.55654 18.2891 11.0127 18.7861V22.6003C11.0127 22.8212 11.1918 23.0003 11.4127 23.0003H12.6127C12.8336 23.0003 13.0127 22.8212 13.0127 22.6003V18.7861ZM17.0488 10.5209C17.0488 10.7418 16.8697 10.9209 16.6488 10.9209L7.37656 10.9209C7.15565 10.9209 6.97656 10.7418 6.97656 10.5209V9.3209C6.97656 9.09998 7.15565 8.9209 7.37656 8.9209L16.6488 8.9209C16.8697 8.9209 17.0488 9.09999 17.0488 9.3209V10.5209Z" fill="currentColor"/>
      
    </svg>
  )
}
