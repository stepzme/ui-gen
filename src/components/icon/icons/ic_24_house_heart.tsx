import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function HouseHeart({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1.60589 10.3624C1.21854 10.739 1 11.2562 1 11.7965V20.9803C1 22.0849 1.89543 22.9803 3 22.9803H21C22.1046 22.9803 23 22.0849 23 20.9803V11.7895C23 11.2534 22.7847 10.7397 22.4025 10.3637L13.4592 1.56616C12.6841 0.803757 11.442 0.800093 10.6625 1.55791L1.60589 10.3624ZM11.7309 12.593C11.8794 12.7415 12.1201 12.7415 12.2686 12.593L12.4778 12.3838C13.3521 11.5095 14.7696 11.5095 15.6439 12.3838C16.5228 13.2627 16.5175 14.6893 15.6321 15.5616L12.403 18.7432C12.1793 18.9636 11.8202 18.9636 11.5965 18.7432L8.36736 15.5616C7.48198 14.6893 7.47669 13.2627 8.35557 12.3838C9.22987 11.5095 10.6474 11.5095 11.5217 12.3838L11.7309 12.593Z" fill="currentColor"/>
      
    </svg>
  )
}
