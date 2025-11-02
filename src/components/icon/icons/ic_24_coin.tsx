import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Coin({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM14.002 17.4704C14.2229 17.4704 14.402 17.2913 14.402 17.0704V6.92979C14.402 6.70887 14.2229 6.52979 14.002 6.52979H12.0794C11.8577 6.52979 11.6422 6.60348 11.467 6.73928L7.22924 10.0225C7.13145 10.0983 7.07422 10.215 7.07422 10.3387V10.5298C7.07422 10.7507 7.2533 10.9298 7.47422 10.9298H10.405V17.0704C10.405 17.2913 10.5841 17.4704 10.805 17.4704H14.002Z" fill="currentColor"/>
      
    </svg>
  )
}
