import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Tub({ className, ...props }: IconProps) {
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
      
      <path d="M3 1.4C3 1.17909 2.82091 1 2.6 1H1.4C1.17909 1 1 1.17909 1 1.4V4.21197C1 4.79458 1.05091 5.37608 1.15216 5.94982L1.51396 8H22.486L22.8478 5.94982C22.9491 5.37608 23 4.79458 23 4.21197V1.4C23 1.17909 22.8209 1 22.6 1H21.4C21.1791 1 21 1.17909 21 1.4V4H3V1.4Z" fill="currentColor"/>
      <path d="M22.1331 10H1.8669L3.27867 18H20.7213L22.1331 10Z" fill="currentColor"/>
      <path d="M3.86941 21.3476L3.63161 20H20.3684L20.1306 21.3476C19.9619 22.3033 19.1315 23 18.161 23H5.83898C4.8685 23 4.03807 22.3033 3.86941 21.3476Z" fill="currentColor"/>
      
    </svg>
  )
}
