import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Pouch({ className, ...props }: IconProps) {
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
      
      <path d="M7.34456 1.46496C5.70826 1.69156 5.08975 3.69731 6.28915 4.83321L7.52115 6H16.4771L17.7033 4.83867C18.9038 3.70177 18.283 1.694 16.6451 1.46866C14.8747 1.22511 12.9678 1 11.9677 1C10.9726 1 9.09308 1.22283 7.34456 1.46496Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16.0067 8H7.99155L3.30135 13.6841C0.865587 16.6361 1.78046 21.0833 5.18365 22.8341C5.3958 22.9432 5.63095 23.0002 5.86953 23.0002H18.1287C18.3673 23.0002 18.6025 22.9432 18.8146 22.8341C22.2178 21.0833 23.1327 16.6361 20.6969 13.6841L16.0067 8Z" fill="currentColor"/>
      
    </svg>
  )
}
