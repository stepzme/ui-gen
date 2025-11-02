import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Envelope({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4H3ZM4.35198 7.34099C4.16156 7.22898 3.9164 7.29254 3.8044 7.48296L3.19597 8.51728C3.08396 8.70769 3.14752 8.95285 3.33794 9.06486L11.7974 14.041C11.9226 14.1146 12.0778 14.1146 12.203 14.041L20.6624 9.06486C20.8528 8.95285 20.9164 8.70769 20.8044 8.51728L20.196 7.48296C20.084 7.29254 19.8388 7.22898 19.6484 7.34099L12.0002 11.8399L4.35198 7.34099Z" fill="currentColor"/>
      
    </svg>
  )
}
