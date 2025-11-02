import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function HouseCrossed({ className, ...props }: IconProps) {
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
      
      <path d="M2.96408 11.1151C2.96408 10.5827 3.17517 10.0722 3.55082 9.69613L10.6532 2.58572C11.4428 1.79529 12.7245 1.80628 13.5004 2.61015L18.6703 7.96595L21.6824 5.8298C21.8632 5.70157 22.1134 5.74524 22.2404 5.92717L22.9277 6.91139C23.0542 7.09257 23.0105 7.34229 22.8301 7.46946L2.31878 21.9271C2.13798 22.0545 1.88841 22.0106 1.76164 21.829L1.07235 20.8418C0.946401 20.6615 0.989063 20.4129 1.1679 20.2852L3.0156 18.9656C2.98189 18.8196 2.96408 18.6675 2.96408 18.5113V11.1151Z" fill="currentColor"/>
      <path d="M7.67368 20.516L20.9074 11.2405V18.5113C20.9074 19.6184 20.0127 20.516 18.9091 20.516H7.67368Z" fill="currentColor"/>
      
    </svg>
  )
}
