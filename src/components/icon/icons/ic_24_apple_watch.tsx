import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function AppleWatch({ className, ...props }: IconProps) {
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
      
      <path d="M16.0059 4.98975H15.4233L14.9966 2.64148C14.8238 1.69039 13.9955 0.999023 13.0288 0.999023H10.9939C10.0366 0.999023 9.21351 1.67745 9.03074 2.61718L8.56928 4.98975H7.98535C6.88078 4.98975 5.98535 5.88518 5.98535 6.98975V16.9971C5.98535 18.1016 6.88078 18.9971 7.98535 18.9971H8.56543L9.03074 21.3894C9.21351 22.3291 10.0366 23.0076 10.9939 23.0076H13.0288C13.9955 23.0076 14.8238 22.3162 14.9966 21.3651L15.4269 18.9971H16.0059C17.1104 18.9971 18.0059 18.1016 18.0059 16.9971V6.98975C18.0059 5.88518 17.1104 4.98975 16.0059 4.98975Z" fill="currentColor"/>
      
    </svg>
  )
}
