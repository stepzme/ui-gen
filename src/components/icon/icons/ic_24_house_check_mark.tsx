import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function HouseCheckMark({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1.60793 10.362C1.21934 10.7387 1 11.2568 1 11.798V20.9802C1 22.0848 1.89543 22.9802 3 22.9802H21C22.1046 22.9802 23 22.0848 23 20.9802V11.7911C23 11.254 22.784 10.7394 22.4005 10.3633L13.4572 1.59077C12.6826 0.831027 11.4436 0.827373 10.6646 1.58254L1.60793 10.362ZM17.1794 12.1551C17.3356 11.9989 17.3356 11.7456 17.1794 11.5894L16.3309 10.7409C16.1746 10.5846 15.9214 10.5846 15.7652 10.7409L10.4735 16.0326L8.23514 13.7943C8.07893 13.638 7.82567 13.638 7.66946 13.7943L6.82093 14.6428C6.66472 14.799 6.66472 15.0523 6.82093 15.2085L10.1906 18.5782C10.3468 18.7344 10.6001 18.7344 10.7563 18.5782L17.1794 12.1551Z" fill="currentColor"/>
      
    </svg>
  )
}
