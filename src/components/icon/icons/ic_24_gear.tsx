import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Gear({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M13.003 1.27723C12.3828 0.918322 11.6179 0.91868 10.998 1.27817L2.98984 5.92218C2.37291 6.27994 1.99316 6.93915 1.99316 7.65231V16.3523C1.99316 17.0632 2.37048 17.7206 2.98427 18.0792L10.9923 22.7577C11.6151 23.1215 12.3854 23.1219 13.0085 22.7587L21.0362 18.0789C21.6509 17.7205 22.0289 17.0626 22.0289 16.351V7.65355C22.0289 6.93972 21.6485 6.28001 21.0306 5.92249L13.003 1.27723ZM12.0114 16.1712C14.304 16.1712 16.1626 14.3126 16.1626 12.0199C16.1626 9.72729 14.304 7.86872 12.0114 7.86872C9.71871 7.86872 7.86015 9.72729 7.86015 12.0199C7.86015 14.3126 9.71871 16.1712 12.0114 16.1712Z" fill="currentColor"/>
      
    </svg>
  )
}
