import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function DocPercent({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M20 3C20 1.89543 19.1046 1 18 1L6 1C4.89543 1 4 1.89543 4 3L4 21C4 22.1046 4.89543 23 6 23H18C19.1046 23 20 22.1046 20 21V3ZM9 11.0464C9.82843 11.0464 10.5 10.3748 10.5 9.54639C10.5 8.71796 9.82843 8.04639 9 8.04639C8.17157 8.04639 7.5 8.71796 7.5 9.54639C7.5 10.3748 8.17157 11.0464 9 11.0464ZM16.5 14.4536C16.5 15.282 15.8284 15.9536 15 15.9536C14.1716 15.9536 13.5 15.282 13.5 14.4536C13.5 13.6252 14.1716 12.9536 15 12.9536C15.8284 12.9536 16.5 13.6252 16.5 14.4536ZM9.42434 15.378C9.58055 15.5342 9.83381 15.5342 9.99002 15.378L15.4243 9.94364C15.5806 9.78743 15.5806 9.53416 15.4243 9.37795L14.5758 8.52943C14.4196 8.37322 14.1663 8.37321 14.0101 8.52942L8.57581 13.9637C8.4196 14.12 8.4196 14.3732 8.57581 14.5294L9.42434 15.378Z" fill="currentColor"/>
      
    </svg>
  )
}
