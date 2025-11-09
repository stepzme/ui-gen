import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ChevronTop({ className, ...props }: IconProps) {
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
      
      <path d="M7.74072 14.9652C7.89973 15.1185 8.15296 15.1139 8.30631 14.9549L11.9989 11.1258L15.684 14.9546C15.8372 15.1138 16.0904 15.1186 16.2496 14.9654L16.754 14.48C16.9131 14.3268 16.918 14.0736 16.7648 13.9144L12.2879 9.26294C12.1306 9.09956 11.8692 9.09943 11.7118 9.26266L7.22657 13.9137C7.07322 14.0727 7.07782 14.3259 7.23684 14.4793L7.74072 14.9652Z" fill="currentColor"/>
      
    </svg>
  )
}
