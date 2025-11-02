import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function SeparatedArrow({ className, ...props }: IconProps) {
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
      
      <path d="M3.19531 9.10095L4.55413 7.86588L9.74521 13.089L10.2184 20.3266C10.2798 21.2655 11.0592 21.9956 12 21.9956C12.9408 21.9956 13.7202 21.2655 13.7816 20.3266L14.2547 13.0903L19.4466 7.86646L20.8047 9.10095C21.2801 9.53303 22.0425 9.19574 22.0425 8.55335L22.0424 2.74446C22.0424 2.30834 21.6672 1.9668 21.233 2.00772L15.4426 2.5535C14.8025 2.61383 14.5386 3.40544 15.0143 3.83784L16.48 5.17005L12 9.67767L12 9.67888L7.51943 5.17062L8.98575 3.83784C9.46148 3.40544 9.1975 2.61383 8.55746 2.5535L2.76703 2.00772C2.33283 1.9668 1.95759 2.30834 1.95759 2.74446L1.95758 8.55335C1.95758 9.19574 2.71994 9.53303 3.19531 9.10095Z" fill="currentColor"/>
      
    </svg>
  )
}
