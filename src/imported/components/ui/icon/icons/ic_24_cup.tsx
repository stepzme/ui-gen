import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Cup({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M2.24748 4C1.60756 4 1.1323 4.59271 1.27138 5.21733L4.38857 19.2173C4.4904 19.6747 4.89612 20 5.36467 20H15.1985C15.667 20 16.0728 19.6747 16.1746 19.2173L17.6162 12.7428L21.7973 9.32187C23.9794 7.53655 22.717 4 19.8976 4H2.24748ZM19.1175 6L18.3197 9.58305L20.5308 7.77396C21.2582 7.17885 20.8374 6 19.8976 6H19.1175Z" fill="currentColor"/>
      
    </svg>
  )
}
