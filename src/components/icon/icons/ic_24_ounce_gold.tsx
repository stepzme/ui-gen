import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function OunceGold({ className, ...props }: IconProps) {
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
      
      <path d="M8.33 8.35H10.28L9.32 5.49H9.3L8.33 8.35Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18 1C19.1046 1 20 1.89543 20 3V21C20 22.1046 19.1046 23 18 23H6C4.89543 23 4 22.1046 4 21V3C4 1.89543 4.89543 1 6 1H18ZM8.55 4H10.12L12.68 11H11.16L10.65 9.46H7.96L7.45 11H6L8.55 4ZM18 10.9H16.72V10.11H16.7C16.5 10.37 16.27 10.59 16.01 10.75C15.75 10.92 15.43 11 15.06 11C14.47 11 14.01 10.82 13.69 10.44C13.36 10.06 13.2 9.52 13.2 8.82V5.73H14.55V8.42C14.55 8.94 14.62 9.31 14.78 9.53C14.94 9.75 15.17 9.85 15.47 9.85C15.85 9.85 16.14 9.71 16.35 9.42C16.55 9.13 16.66 8.7 16.66 8.12V5.73H18V10.9ZM13.5 19C13.5 19.5523 12.8284 20 12 20C11.1716 20 10.5 19.5523 10.5 19C10.5 18.4477 11.1716 18 12 18C12.8284 18 13.5 18.4477 13.5 19ZM7 14.4C7 14.1791 7.17909 14 7.4 14H16.6C16.8209 14 17 14.1791 17 14.4V15.6C17 15.8209 16.8209 16 16.6 16H7.4C7.17909 16 7 15.8209 7 15.6V14.4Z" fill="currentColor"/>
      
    </svg>
  )
}
