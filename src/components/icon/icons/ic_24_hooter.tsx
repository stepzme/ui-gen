import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Hooter({ className, ...props }: IconProps) {
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
      
      <path d="M6.53119 3.75193C6.65629 2.75107 7.5071 2 8.51574 2H15.4846C16.4933 2 17.3441 2.75107 17.4692 3.75193L18.8597 14.876C18.9343 15.4728 18.4689 16 17.8674 16H15L13.5836 13.8754C13.2183 13.3274 13.1461 12.6347 13.3907 12.0232L14.4514 9.37139C14.7142 8.71453 14.2304 8 13.523 8H10.477C9.76957 8 9.28581 8.71453 9.54856 9.37139L10.6093 12.0232C10.8539 12.6347 10.7817 13.3274 10.4164 13.8754L9 16H6.13296C5.53146 16 5.06608 15.4728 5.14068 14.876L6.53119 3.75193Z" fill="currentColor"/>
      <path d="M21 22C21.5523 22 22 21.5523 22 21V19C22 18.4477 21.5523 18 21 18H3C2.44772 18 2 18.4477 2 19V21C2 21.5523 2.44772 22 3 22H21Z" fill="currentColor"/>
      
    </svg>
  )
}
