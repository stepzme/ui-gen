import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function WalletCoinPercent({ className, ...props }: IconProps) {
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
      
      <path d="M14.27 1C10.73 1 7.86 3.76 7.86 7.2H20.99C20.99 3.76 18.12 1 14.58 1H14.27Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21 9.58H3V8.2C3 7.65 3.45 7.2 4 7.2H5.86C5.88 6.51 5.98 5.84 6.15 5.2H4C2.34 5.2 1 6.54 1 8.2V21C1 22.1 1.9 23 3 23H21C22.1 23 23 22.1 23 21V11.58C23 10.48 22.1 9.58 21 9.58ZM9.46 11.58C10.35 11.58 11.06 12.29 11.06 13.17C11.06 14.05 10.34 14.76 9.46 14.76C8.58 14.76 7.86 14.05 7.86 13.17C7.86 12.29 8.58 11.58 9.46 11.58ZM8.83 20.02L8.04 19.15C7.9 18.99 7.91 18.74 8.07 18.6L15.32 12.11C15.48 11.97 15.73 11.98 15.87 12.14L16.66 13.01C16.8 13.17 16.79 13.42 16.63 13.56L9.38 20.05C9.22 20.19 8.97 20.18 8.83 20.02ZM15.26 20.58C14.37 20.58 13.66 19.87 13.66 18.99C13.66 18.11 14.38 17.4 15.26 17.4C16.14 17.4 16.86 18.11 16.86 18.99C16.86 19.87 16.14 20.58 15.26 20.58Z" fill="currentColor"/>
      
    </svg>
  )
}
