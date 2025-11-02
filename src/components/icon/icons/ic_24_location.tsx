import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Location({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2211 22.9288C13.6036 21.9389 21 16.3458 21 10C21 5.02944 16.9706 1 12 1C7.02944 1 3 5.02944 3 10C3 16.3458 10.3964 21.9389 11.7789 22.9288C11.9117 23.024 12.0883 23.024 12.2211 22.9288ZM12.1512 14.3024C14.4439 14.3024 16.3024 12.4439 16.3024 10.1512C16.3024 7.85856 14.4439 6 12.1512 6C9.85856 6 8 7.85856 8 10.1512C8 12.4439 9.85856 14.3024 12.1512 14.3024Z" fill="currentColor"/>
      
    </svg>
  )
}
