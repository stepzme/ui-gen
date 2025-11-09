import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PaperAirplane({ className, ...props }: IconProps) {
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
      
      <path d="M1.78397 7.16877C1.06279 7.38953 0.836264 8.29878 1.36957 8.83209L6.73385 14.1964C6.87649 14.339 7.103 14.3531 7.26224 14.2293L16.3215 7.18481C16.777 6.83106 17.3621 7.41995 17.0053 7.87314L9.91128 16.8747C9.78581 17.0339 9.79927 17.2618 9.9426 17.4051L15.1724 22.6349C15.7057 23.1682 16.6149 22.9417 16.8357 22.2206L22.9271 2.32791C23.1618 1.56153 22.4446 0.844313 21.6782 1.07892L1.78397 7.16877Z" fill="currentColor"/>
      
    </svg>
  )
}
