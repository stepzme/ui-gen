import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function WalletCoin({ className, ...props }: IconProps) {
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
      
      <path d="M7.85645 7.20076C7.85645 3.76313 10.726 1.00293 14.2657 1.00293H14.5737C18.1134 1.00293 20.983 3.76313 20.983 7.20076H7.85645Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.1496 5.20068H3.99805C2.34119 5.20068 0.998047 6.54383 0.998047 8.20068L0.999023 21.0003C0.999023 22.1048 1.89446 23.0003 2.99903 23.0003H20.9992C22.1038 23.0003 22.9992 22.1048 22.9992 21.0003V11.5825C22.9992 10.478 22.1038 9.58252 20.9992 9.58252H2.99902L2.99805 8.20068C2.99805 7.6484 3.44576 7.20068 3.99805 7.20068H5.85899C5.87584 6.51016 5.97593 5.84028 6.1496 5.20068ZM19.5 15.2295C18.6716 15.2295 18 15.9011 18 16.7295C18 17.5579 18.6716 18.2295 19.5 18.2295C20.3284 18.2295 21 17.5579 21 16.7295C21 15.9011 20.3284 15.2295 19.5 15.2295Z" fill="currentColor"/>
      
    </svg>
  )
}
