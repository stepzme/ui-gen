import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CircleExclamation({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM11 16.9098C11 16.6889 11.1791 16.5098 11.4 16.5098H12.6C12.8209 16.5098 13 16.6889 13 16.9098V18.1098C13 18.3307 12.8209 18.5098 12.6 18.5098H11.4C11.1791 18.5098 11 18.3307 11 18.1098V16.9098ZM11 5.90977C11 5.68885 11.1791 5.50977 11.4 5.50977H12.6C12.8209 5.50977 13 5.68885 13 5.90977V14.1098C13 14.3307 12.8209 14.5098 12.6 14.5098H11.4C11.1791 14.5098 11 14.3307 11 14.1098V5.90977Z" fill="currentColor"/>
      
    </svg>
  )
}
