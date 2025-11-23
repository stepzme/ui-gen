import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function WalletCard({ className, ...props }: IconProps) {
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
      
      <path d="M7.85742 2.96981C7.85742 1.88191 8.75285 1 9.85742 1H18.9839C20.0885 1 20.9839 1.88191 20.9839 2.96981V7.20312H7.85742V2.96981Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.85742 5.2002H3.99902C2.34217 5.2002 0.999023 6.54334 0.999023 8.2002L1 20.9998C1 22.1044 1.89543 22.9998 3 22.9998H21.0002C22.1048 22.9998 23.0002 22.1044 23.0002 20.9998V11.582C23.0002 10.4775 22.1048 9.58203 21.0002 9.58203H2.99902V8.2002C2.99902 7.64791 3.44674 7.2002 3.99902 7.2002H5.85742V5.2002ZM19.5 14.9243C18.6716 14.9243 18 15.5959 18 16.4243C18 17.2527 18.6716 17.9243 19.5 17.9243C20.3284 17.9243 21 17.2527 21 16.4243C21 15.5959 20.3284 14.9243 19.5 14.9243Z" fill="currentColor"/>
      
    </svg>
  )
}
