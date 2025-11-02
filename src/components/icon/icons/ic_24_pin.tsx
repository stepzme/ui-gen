import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Pin({ className, ...props }: IconProps) {
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
      
      <g clipPath="url(#clip0_19668_1438)">
      <path d="M21.3339 7.07107C21.7244 7.46159 21.7244 8.09476 21.3339 8.48528L16.2737 13.5455L16.9089 15.6668C17.1198 16.3713 16.9269 17.1349 16.4069 17.6549L13.8388 20.223C13.6826 20.3792 13.4288 20.3792 13.2726 20.223L9.311 16.2614L3.93795 21.6344C3.78174 21.7906 3.52793 21.7906 3.37172 21.6344L2.52374 20.7865C2.36753 20.6302 2.36753 20.3764 2.52374 20.2202L7.89678 14.8472L3.93933 10.8897C3.78313 10.7335 3.78313 10.4797 3.93933 10.3235L6.50743 7.75539C7.02741 7.23541 7.79102 7.04247 8.49548 7.25337L10.6168 7.88866L15.677 2.82843C16.0676 2.4379 16.7007 2.4379 17.0912 2.82843L21.3339 7.07107Z" fill="currentColor"/>
      </g>
      <defs>
      <clipPath id="clip0_19668_1438">
      <rect fill="white"/>
      </clipPath>
      </defs>
      
    </svg>
  )
}
