import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function SmartphoneCheckMark({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M19 3C19 1.89543 18.1046 1 17 1L7 1C5.89543 1 5 1.89543 5 3L5 21C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21V3ZM16.6743 9.88651C16.8305 9.7303 16.8305 9.47703 16.6743 9.32082L15.8258 8.4723C15.6696 8.31609 15.4163 8.31609 15.2601 8.4723L10.7501 12.9823L8.74003 10.9723C8.58382 10.8161 8.33055 10.8161 8.17434 10.9723L7.32581 11.8208C7.1696 11.977 7.1696 12.2303 7.32581 12.3865L10.4672 15.5279C10.6234 15.6841 10.8767 15.6841 11.0329 15.5279L16.6743 9.88651Z" fill="currentColor"/>
      
    </svg>
  )
}
