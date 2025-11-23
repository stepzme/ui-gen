import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Suitcase({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M8 3C8 1.89543 8.89543 1 10 1H14C15.1046 1 16 1.89543 16 3V6H18C19.1046 6 20 6.89543 20 8V19C20 20.1046 19.1046 21 18 21H17V21.9999C17 22.5522 16.5523 22.9999 16 22.9999C15.4477 22.9999 15 22.5522 15 21.9999V21H9V21.9999C9 22.5522 8.55228 22.9999 8 22.9999C7.44772 22.9999 7 22.5522 7 21.9999V21H6C4.89543 21 4 20.1046 4 19V8C4 6.89543 4.89543 6 6 6H8V3ZM14 3V6H10V3L14 3ZM8.39121 9.1748C8.1703 9.1748 7.99121 9.35389 7.99121 9.5748V10.7748C7.99121 10.9957 8.1703 11.1748 8.39121 11.1748L15.5824 11.1748C15.8033 11.1748 15.9824 10.9957 15.9824 10.7748V9.57481C15.9824 9.35389 15.8033 9.17481 15.5824 9.17481L8.39121 9.1748Z" fill="currentColor"/>
      
    </svg>
  )
}
