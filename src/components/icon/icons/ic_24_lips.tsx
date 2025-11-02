import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Lips({ className, ...props }: IconProps) {
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
      
      <path d="M22.2741 13L1.72618 13C3.02876 15.1009 6.18521 18.8928 12.0001 18.8928C17.8151 18.8928 20.9715 15.1009 22.2741 13Z" fill="currentColor"/>
      <path d="M22.6849 11L1.31543 11C2.0509 9.63952 4.11846 6.46458 7.9903 5.06598C8.60807 4.84283 9.27176 5.22431 9.9833 5.63329C10.6172 5.99762 11.289 6.38378 12.0001 6.38378C12.7113 6.38378 13.3831 5.99762 14.017 5.63329C14.7285 5.22431 15.3922 4.84283 16.01 5.06598C19.8818 6.46458 21.9494 9.63952 22.6849 11Z" fill="currentColor"/>
      
    </svg>
  )
}
