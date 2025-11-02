import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CircleQuestion({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM9.03949 8.60255C9.22381 7.68839 10.0315 7 11 7H13.2188C14.2026 7 15 7.79745 15 8.78115C15 9.4558 14.6188 10.0726 14.0154 10.3743L12.6584 11.0528C11.642 11.561 11 12.5998 11 13.7361V14.6C11 14.8209 11.1791 15 11.4 15H12.6C12.8209 15 13 14.8209 13 14.6V13.7361C13 13.3573 13.214 13.011 13.5528 12.8416L14.9098 12.1631C16.1908 11.5226 17 10.2133 17 8.78115C17 6.69288 15.3071 5 13.2188 5H11C8.92567 5 7.22012 6.57896 7.01969 8.60056C6.9979 8.8204 7.17909 9 7.4 9H8.6C8.82091 9 8.99583 8.81911 9.03949 8.60255ZM11 18.6C11 18.8209 11.1791 19 11.4 19H12.6C12.8209 19 13 18.8209 13 18.6V17.4C13 17.1791 12.8209 17 12.6 17H11.4C11.1791 17 11 17.1791 11 17.4V18.6Z" fill="currentColor"/>
      
    </svg>
  )
}
