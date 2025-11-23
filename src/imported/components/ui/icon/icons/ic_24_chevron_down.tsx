import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ChevronDown({ className, ...props }: IconProps) {
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
      
      <path d="M7.74072 9.25239C7.89973 9.09904 8.15296 9.10364 8.30631 9.26266L11.9989 13.0918L15.684 9.26297C15.8372 9.1038 16.0904 9.09895 16.2496 9.25215L16.754 9.73757C16.9131 9.89076 16.918 10.144 16.7648 10.3032L12.2879 14.9546C12.1306 15.118 11.8692 15.1181 11.7118 14.9549L7.22657 10.3039C7.07322 10.1449 7.07782 9.89165 7.23684 9.7383L7.74072 9.25239Z" fill="currentColor"/>
      
    </svg>
  )
}
