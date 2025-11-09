import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CoffeeBean({ className, ...props }: IconProps) {
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
      
      <path d="M18.3995 2.5984V4.25455C18.3995 6.83816 17.1518 9.26273 15.0494 10.7644L10.4121 14.0768C8.83533 15.2031 7.89954 17.0215 7.89954 18.9592V22.5274C11.8056 23.5614 16.6461 21.0469 19.402 16.2735C22.3597 11.1506 21.8638 5.24923 18.3995 2.5984Z" fill="currentColor"/>
      <path d="M5.89954 21.6171C2.1668 19.0829 1.55709 12.9931 4.59792 7.72629C7.42464 2.83026 12.4444 0.310641 16.3995 1.55903V4.25455C16.3995 6.19226 15.4637 8.01068 13.887 9.13695L9.24963 12.4493C7.14727 13.951 5.89954 16.3756 5.89954 18.9592V21.6171Z" fill="currentColor"/>
      
    </svg>
  )
}
