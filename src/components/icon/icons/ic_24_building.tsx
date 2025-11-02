import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Building({ className, ...props }: IconProps) {
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
      
      <path d="M12.9607 1.91176C12.3623 1.5841 11.6381 1.5841 11.0397 1.91176L1.52918 7.11907C0.621213 7.61621 0.974279 8.9962 2.00943 8.9962H21.991C23.0262 8.9962 23.3793 7.61621 22.4713 7.11907L12.9607 1.91176Z" fill="currentColor"/>
      <path d="M10.5 19V11.4C10.5 11.1791 10.6791 11 10.9 11H13.1C13.3209 11 13.5 11.1791 13.5 11.4V19H16.5V11.4C16.5 11.1791 16.6791 11 16.9 11H19.1C19.3209 11 19.5 11.1791 19.5 11.4V19H22.6C22.8209 19 23 19.1791 23 19.4V21.6C23 21.8209 22.8209 22 22.6 22H1.4C1.17909 22 1 21.8209 1 21.6V19.4C1 19.1791 1.17909 19 1.4 19H4.5V11.4C4.5 11.1791 4.67909 11 4.9 11H7.1C7.32091 11 7.5 11.1791 7.5 11.4V19H10.5Z" fill="currentColor"/>
      
    </svg>
  )
}
