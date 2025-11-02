import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PersonBriefcase({ className, ...props }: IconProps) {
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
      
      <path d="M9.84375 10C12.329 10 14.3438 7.98528 14.3438 5.5C14.3438 3.01472 12.329 1 9.84375 1C7.35847 1 5.34375 3.01472 5.34375 5.5C5.34375 7.98528 7.35847 10 9.84375 10Z" fill="currentColor"/>
      <path d="M8.26174 11C5.1744 11 2.45163 13.0226 1.56001 15.9784L1.12561 17.4185C0.738329 18.7023 1.6994 19.9961 3.04039 19.9961H10V17C10 15.6828 10.8489 14.5639 12.0295 14.1605C12.1716 12.9917 12.8179 11.9784 13.7443 11.3447C13.0563 11.1201 12.3255 11 11.5731 11H8.26174Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14 14.6484C14 13.5439 14.8954 12.6484 16 12.6484H19C20.1046 12.6484 21 13.5439 21 14.6484V16H22C22.5523 16 23 16.4477 23 17V22C23 22.5523 22.5523 23 22 23H13C12.4477 23 12 22.5523 12 22V17C12 16.4477 12.4477 16 13 16H14V14.6484ZM16 14.6484V16H19V14.6484H16Z" fill="currentColor"/>
      
    </svg>
  )
}
