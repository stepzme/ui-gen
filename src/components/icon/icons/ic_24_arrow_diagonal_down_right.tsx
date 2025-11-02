import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ArrowDiagonalDownRight({ className, ...props }: IconProps) {
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
      
      <path d="M20.3989 5.60262C20.2852 4.01403 18.3396 3.31567 17.2417 4.46934L13.6715 8.22051C13.5319 8.36724 13.3073 8.3931 13.1379 8.28194L6.25053 3.28521C5.40353 2.67072 4.23538 2.76365 3.49619 3.50434C2.7608 4.24121 2.6669 5.40209 3.27428 6.24758L8.34613 13.3077C8.46941 13.4714 8.4562 13.7003 8.31491 13.8488L4.51134 17.8452C3.42067 18.9912 4.19579 20.8878 5.7769 20.9419L18.9159 21.3915C20.3154 21.4394 21.448 20.2639 21.348 18.8671L20.3989 5.60262Z" fill="currentColor"/>
      
    </svg>
  )
}
