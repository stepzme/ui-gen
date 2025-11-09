import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function FileUpload({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M13 5C13 6.65685 14.3431 8 16 8H20V21C20 22.1046 19.1046 23 18 23H6C4.89543 23 4 22.1046 4 21V3C4 1.89543 4.89543 1 6 1H13V5ZM12.377 12.1758C12.1787 11.9426 11.8223 11.9427 11.624 12.1758L9.45605 14.7266C9.17841 15.0533 9.4068 15.5595 9.83203 15.5596H11L10.9922 18.5908C10.9922 18.8119 11.1719 18.992 11.3926 18.9922H12.5928C12.8135 18.9919 12.9922 18.8119 12.9922 18.5908L13 15.5596H14.168C14.593 15.5594 14.822 15.0533 14.5449 14.7266L12.377 12.1758Z" fill="currentColor"/>
      <path d="M20 6H16C15.4477 6 15 5.55228 15 5V1L20 6Z" fill="currentColor"/>
      
    </svg>
  )
}
