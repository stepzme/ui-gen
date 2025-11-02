import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardZigzagIntersect({ className, ...props }: IconProps) {
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
      
      <path d="M21.5177 4.06765C21.3526 4.02352 21.179 4 21 4H3C1.89543 4 1 4.89543 1 6V18C1 18.2327 1.03974 18.4561 1.1128 18.6638L7.51775 12.6237C7.67567 12.4748 7.92354 12.479 8.07632 12.6332L10.503 15.0823L21.5177 4.06765Z" fill="currentColor"/>
      <path d="M2.64443 19.9685C2.75982 19.9892 2.87865 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 5.82071 22.9764 5.64693 22.9322 5.4816L10.7807 17.6331C10.6239 17.7898 10.3697 17.7892 10.2137 17.6318L7.75429 15.1497L2.64443 19.9685Z" fill="currentColor"/>
      
    </svg>
  )
}
