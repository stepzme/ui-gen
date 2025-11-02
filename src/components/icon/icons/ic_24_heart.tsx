import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Heart({ className, ...props }: IconProps) {
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
      
      <path d="M2.65239 12.546C0.449204 10.3622 0.449203 6.82165 2.65239 4.63788C5.0125 2.29857 8.89442 2.49048 11.008 5.05094L11.2096 5.29519C11.3972 5.5225 11.6779 5.65432 11.9742 5.65432H12.0258C12.3221 5.65432 12.6028 5.5225 12.7904 5.29519L12.992 5.05095C15.1056 2.49048 18.9875 2.29857 21.3476 4.63788C23.5508 6.82165 23.5508 10.3622 21.3476 12.546L13.3971 20.4264C12.6255 21.1912 11.3745 21.1912 10.6029 20.4264L2.65239 12.546Z" fill="currentColor"/>
      
    </svg>
  )
}
