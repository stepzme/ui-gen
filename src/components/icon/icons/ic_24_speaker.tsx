import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Speaker({ className, ...props }: IconProps) {
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
      
      <path d="M3 16.1993C1.89543 16.1993 1 15.3038 1 14.1993V6.7985C1 5.69393 1.89543 4.7985 3 4.7985L8.05265 4.7985C10.9087 4.7985 13.6238 3.55729 15.4924 1.39738C16.3576 0.397341 18 1.0092 18 2.33155V18.6662C18 19.9886 16.3576 20.6004 15.4924 19.6004C13.7708 17.6104 11.3306 16.4002 8.72363 16.2222L8.72363 22.5986C8.72363 22.8195 8.54455 22.9986 8.32363 22.9986H6.12363C5.90272 22.9986 5.72363 22.8195 5.72363 22.5986L5.72363 16.1993H3Z" fill="currentColor"/>
      <path d="M23.0003 10.8386C23.0003 12.4621 21.933 13.8363 20.4618 14.298C20.2249 14.3723 20 14.1828 20 13.9345V7.74258C20 7.49429 20.2249 7.30478 20.4618 7.37912C21.933 7.8408 23.0003 9.21504 23.0003 10.8386Z" fill="currentColor"/>
      
    </svg>
  )
}
