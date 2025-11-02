import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ArrowNavigation({ className, ...props }: IconProps) {
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
      
      <g clipPath="url(#clip0_206_2867)">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.637561 9.80154L21.5764 1.07771C22.1034 0.861075 22.7054 1.11312 22.9221 1.63805C23.0262 1.8901 23.0262 2.1734 22.9221 2.42545L14.1982 23.3664C13.9774 23.8913 13.3733 24.1392 12.8484 23.9205C12.5943 23.8121 12.3943 23.608 12.2902 23.3518L8.96352 15.0404L0.652143 11.7138C0.120964 11.5055 -0.139417 10.9076 0.0709711 10.3765C0.173041 10.1161 0.37718 9.90985 0.635478 9.80154H0.637561Z" fill="currentColor"/>
      </g>
      <defs>
      <clipPath id="clip0_206_2867">
      <rect fill="white"/>
      </clipPath>
      </defs>
      
    </svg>
  )
}
