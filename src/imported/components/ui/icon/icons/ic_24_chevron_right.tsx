import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ChevronRight({ className, ...props }: IconProps) {
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
      
      <path d="M9.13917 16.3636C8.98582 16.2046 8.99042 15.9513 9.14944 15.798L12.9786 12.1054L9.14975 8.42027C8.99058 8.26708 8.98573 8.01386 9.13893 7.85469L9.62435 7.35034C9.77754 7.19117 10.0308 7.18633 10.1899 7.33952L14.8414 11.8164C15.0048 11.9737 15.0049 12.2351 14.8417 12.3925L10.1907 16.8777C10.0317 17.0311 9.77843 17.0265 9.62508 16.8675L9.13917 16.3636Z" fill="currentColor"/>
      
    </svg>
  )
}
