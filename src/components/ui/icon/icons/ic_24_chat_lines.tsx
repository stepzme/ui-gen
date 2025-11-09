import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ChatLines({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0625 1C18.1721 1 23.125 5.95285 23.125 12.0625V21.125C23.125 22.2296 22.2296 23.125 21.125 23.125H12.0625C5.95285 23.125 1 18.1721 1 12.0625C1 5.95285 5.95285 1 12.0625 1ZM6.37851 10.5625C6.1576 10.5625 5.97852 10.3834 5.97852 10.1625V8.9625C5.97852 8.74159 6.1576 8.5625 6.37852 8.5625H17.7473C17.9682 8.5625 18.1473 8.74159 18.1473 8.9625V10.1625C18.1473 10.3834 17.9682 10.5625 17.7473 10.5625H6.37851ZM6.37851 15.5625C6.1576 15.5625 5.97852 15.3834 5.97852 15.1625V13.9625C5.97852 13.7416 6.1576 13.5625 6.37852 13.5625H14.4285C14.6494 13.5625 14.8285 13.7416 14.8285 13.9625V15.1625C14.8285 15.3834 14.6494 15.5625 14.4285 15.5625H6.37851Z" fill="currentColor"/>
      
    </svg>
  )
}
