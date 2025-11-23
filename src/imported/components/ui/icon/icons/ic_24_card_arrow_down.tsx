import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardArrowDown({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V17.9902C1 19.0948 1.89543 19.9902 3 19.9902H21C22.1046 19.9902 23 19.0948 23 17.9902V6C23 4.89543 22.1046 4 21 4H3ZM14.2781 12.9487H13V7.43857C13 7.21766 12.8209 7.03857 12.6 7.03857H11.4C11.1791 7.03857 11 7.21766 11 7.43857V12.9487H9.72249C9.01862 12.9487 8.65781 13.7922 9.14393 14.3012L11.4218 16.6865C11.7369 17.0165 12.2638 17.0165 12.5789 16.6865L14.8567 14.3012C15.3428 13.7922 14.982 12.9487 14.2781 12.9487Z" fill="currentColor"/>
      
    </svg>
  )
}
