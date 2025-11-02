import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Bell({ className, ...props }: IconProps) {
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
      
      <path d="M5.39096 9.84863C5.13626 11.2495 4.46042 12.5394 3.45362 13.5462L2.41401 14.5858C1.15408 15.8457 2.04642 18 3.82823 18H20.1714C21.9532 18 22.8455 15.8457 21.5856 14.5858L20.546 13.5462C19.5392 12.5394 18.8633 11.2495 18.6086 9.84863L17.8942 5.91935C17.3763 3.07065 14.8952 1 11.9998 1C9.1044 1 6.62332 3.07066 6.10538 5.91935L5.39096 9.84863Z" fill="currentColor"/>
      <path d="M12 23C10.3431 23 9 21.6569 9 20H15C15 21.6569 13.6569 23 12 23Z" fill="currentColor"/>
      
    </svg>
  )
}
