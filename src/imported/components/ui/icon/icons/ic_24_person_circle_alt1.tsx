import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PersonCircleAlt1({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M11.999 23C18.0742 23 22.999 18.0751 22.999 12C22.999 5.92487 18.0742 1 11.999 1C5.92389 1 0.999023 5.92487 0.999023 12C0.999023 18.0751 5.92389 23 11.999 23ZM15.499 8.5C15.499 10.433 13.932 12 11.999 12C10.066 12 8.49902 10.433 8.49902 8.5C8.49902 6.567 10.066 5 11.999 5C13.932 5 15.499 6.567 15.499 8.5ZM19.2825 17.2874C17.6464 19.5373 14.9933 21 11.9986 21C9.11008 21 6.53937 19.6392 4.89258 17.5237L5.00261 17.295C5.97164 15.2808 8.00912 14 10.2443 14H14.0431C16.2326 14 18.2366 15.2295 19.2286 17.1814L19.2825 17.2874Z" fill="currentColor"/>
      
    </svg>
  )
}
