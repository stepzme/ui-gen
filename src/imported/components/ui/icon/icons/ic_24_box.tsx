import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Box({ className, ...props }: IconProps) {
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
      
      <path d="M22.9941 4C22.9941 2.89543 22.0987 2 20.9941 2H3.00879C1.90422 2 1.00879 2.89543 1.00879 4V7.59344C1.00879 7.81435 1.18787 7.99344 1.40879 7.99344L22.5941 7.99344C22.8151 7.99344 22.9941 7.81435 22.9941 7.59344V4Z" fill="currentColor"/>
      <path d="M12.9996 10.4C12.9996 10.1791 13.1787 10 13.3996 10H21.6C21.8209 10 22 10.1791 22 10.4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V10.4C2 10.1791 2.17909 10 2.4 10H10.5996C10.8206 10 10.9996 10.1791 10.9996 10.4V13H13L12.9996 10.4Z" fill="currentColor"/>
      
    </svg>
  )
}
