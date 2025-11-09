import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function DocCheckMarkAlt1({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M20 3.00049C20 1.89592 19.1046 1.00049 18 1.00049L6 1.00049C4.89543 1.00049 4 1.89592 4 3.00049L4 21.0005C4 22.1051 4.89543 23.0005 6 23.0005H18C19.1046 23.0005 20 22.1051 20 21.0005V3.00049ZM10.4672 15.8819C10.6234 16.0381 10.8767 16.0381 11.0329 15.8819L16.6743 10.2405C16.8305 10.0843 16.8305 9.83104 16.6743 9.67483L15.8258 8.8263C15.6696 8.67009 15.4163 8.67009 15.2601 8.8263L10.7501 13.3363L8.74002 11.3263C8.58381 11.1701 8.33055 11.1701 8.17434 11.3263L7.32581 12.1748C7.1696 12.331 7.1696 12.5843 7.32581 12.7405L10.4672 15.8819Z" fill="currentColor"/>
      
    </svg>
  )
}
