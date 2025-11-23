import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Spatula({ className, ...props }: IconProps) {
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
      
      <path d="M11.258 15.7513C11.3809 15.592 11.3664 15.3663 11.2241 15.2241L8.93856 12.9385C8.79634 12.7963 8.57064 12.7818 8.41139 12.9046L2.80089 17.2327C1.84586 17.9695 1.75538 19.3776 2.60828 20.2305L3.93213 21.5544C4.78503 22.4073 6.19317 22.3168 6.92991 21.3618L11.258 15.7513Z" fill="currentColor"/>
      <path d="M7.87059 8.84341C6.8374 7.77236 7.29692 5.97892 8.72917 5.54302L21.1525 1.76202C21.9178 1.52909 22.6332 2.24452 22.4003 3.00986L18.6193 15.4332C18.1834 16.8654 16.3899 17.3249 15.3189 16.2917L12.6341 13.607C12.4779 13.4507 12.4779 13.1975 12.6341 13.0413L15.6643 10.0111L14.1507 8.49756L11.1206 11.5277C10.9644 11.6839 10.7111 11.6839 10.5549 11.5277L7.87059 8.84341Z" fill="currentColor"/>
      
    </svg>
  )
}
