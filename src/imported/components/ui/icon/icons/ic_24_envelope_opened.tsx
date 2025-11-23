import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function EnvelopeOpened({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1.77709 9.39944C1.28698 9.77817 1 10.3626 1 10.982V19.9998C1 21.1044 1.89543 21.9998 3 21.9998H21C22.1046 21.9998 23 21.1044 23 19.9998V10.982C23 10.3626 22.713 9.77817 22.2229 9.39944L13.2229 2.44478C12.5026 1.8882 11.4974 1.8882 10.7771 2.44478L1.77709 9.39944ZM20.6 11C20.8209 11 21 11.1791 21 11.4V12.6C21 12.8209 20.8209 13 20.6 13H17L16.2692 14.7538C16.2071 14.9029 16.0615 15 15.9 15H8.1C7.93852 15 7.79288 14.9029 7.73077 14.7538L7 13H3.4C3.17909 13 3 12.8209 3 12.6V11.4C3 11.1791 3.17909 11 3.4 11H20.6Z" fill="currentColor"/>
      
    </svg>
  )
}
