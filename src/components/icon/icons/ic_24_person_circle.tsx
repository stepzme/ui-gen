import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PersonCircle({ className, ...props }: IconProps) {
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
      
      <path d="M15.5005 9.04639C15.5005 10.9794 13.9335 12.5464 12.0005 12.5464C10.0675 12.5464 8.50049 10.9794 8.50049 9.04639C8.50049 7.11339 10.0675 5.54639 12.0005 5.54639C13.9335 5.54639 15.5005 7.11339 15.5005 9.04639Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM4.89453 17.5234L5.00441 17.295C5.97344 15.2808 8.01092 14 10.2461 14H14.0449C16.2344 14 18.2384 15.2295 19.2304 17.1814L19.2841 17.2871C20.3634 15.8027 21 13.9757 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C2.93608 13.1457 3.22549 15.8544 4.89453 17.5234Z" fill="currentColor"/>
      
    </svg>
  )
}
