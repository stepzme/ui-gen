import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CircleCheckmark({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM9.82829 15.437L9.82669 15.4354L7.06086 12.6696C6.76796 12.3767 6.76796 11.9018 7.06086 11.6089C7.35375 11.316 7.82862 11.316 8.12152 11.6089L10.3586 13.846L16.0103 8.1944C16.3032 7.90151 16.778 7.90151 17.0709 8.1944C17.3638 8.48729 17.3638 8.96217 17.0709 9.25506L10.9077 15.4182C10.9017 15.4247 10.8956 15.4311 10.8893 15.4374C10.5977 15.729 10.1256 15.7303 9.83245 15.4412L9.82829 15.437Z" fill="currentColor"/>
      
    </svg>
  )
}
