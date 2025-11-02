import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function TabletPaper({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M19 4H15C15 2.34326 13.6569 1 12 1C10.3431 1 9 2.34326 9 4H5C3.89545 4 3 4.89551 3 6V21C3 22.1045 3.89545 23 5 23H19C20.1046 23 21 22.1045 21 21V6C21 4.89551 20.1046 4 19 4ZM13 4V6H16.6C16.8209 6 17 6.1792 17 6.3999V7.6001C17 7.8208 16.8209 8 16.6 8H7.40002C7.17908 8 7 7.8208 7 7.6001V6.3999C7 6.1792 7.17908 6 7.40002 6H11V4C11 3.44775 11.4477 3 12 3C12.5523 3 13 3.44775 13 4Z" fill="currentColor"/>
      
    </svg>
  )
}
