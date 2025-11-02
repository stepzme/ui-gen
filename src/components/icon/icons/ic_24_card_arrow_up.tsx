import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardArrowUp({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M21 19.9902C22.1046 19.9902 23 19.0948 23 17.9902L23 6C23 4.89543 22.1046 4 21 4L3 4C1.89543 4 1 4.89543 1 6L1 17.9902C1 19.0948 1.89543 19.9902 3 19.9902L21 19.9902ZM9.72185 11.0415H11L11 16.5517C11 16.7726 11.1791 16.9517 11.4 16.9517H12.6C12.8209 16.9517 13 16.7726 13 16.5517L13 11.0415H14.2775C14.9814 11.0415 15.3422 10.198 14.8561 9.689L12.5782 7.30373C12.2631 6.97374 11.7362 6.97374 11.4211 7.30373L9.14329 9.689C8.65717 10.198 9.01798 11.0415 9.72185 11.0415Z" fill="currentColor"/>
      
    </svg>
  )
}
