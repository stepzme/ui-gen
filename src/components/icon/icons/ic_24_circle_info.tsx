import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CircleInfo({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM11 7.10977C11 7.33068 11.1791 7.50977 11.4 7.50977H12.6C12.8209 7.50977 13 7.33068 13 7.10977V5.90977C13 5.68885 12.8209 5.50977 12.6 5.50977H11.4C11.1791 5.50977 11 5.68885 11 5.90977V7.10977ZM11 18.1098C11 18.3307 11.1791 18.5098 11.4 18.5098H12.6C12.8209 18.5098 13 18.3307 13 18.1098V9.90977C13 9.68885 12.8209 9.50977 12.6 9.50977H11.4C11.1791 9.50977 11 9.68885 11 9.90977V18.1098Z" fill="currentColor"/>
      
    </svg>
  )
}
