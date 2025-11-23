import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function SmartphoneArrowRight({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M19 3C19 1.89543 18.1046 1 17 1H7C5.89543 1 5 1.89543 5 3V21C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21V3ZM13.872 9.14362C13.3629 8.6575 12.5195 9.01831 12.5195 9.72219V10.9999H7.89219C7.67127 10.9999 7.49219 11.179 7.49219 11.3999V12.5999C7.49219 12.8209 7.67127 12.9999 7.89219 12.9999H12.5195V14.2778C12.5195 14.9817 13.3629 15.3425 13.872 14.8564L16.2572 12.5786C16.5872 12.2635 16.5872 11.7366 16.2572 11.4214L13.872 9.14362Z" fill="currentColor"/>
      
    </svg>
  )
}
