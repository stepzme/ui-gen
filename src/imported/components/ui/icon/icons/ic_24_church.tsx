import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Church({ className, ...props }: IconProps) {
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
      
      <path d="M19.4465 11.4125L13 8.45827V6.03077L15.6108 6.004C15.8317 6.00173 16.0089 5.82082 16.0066 5.59992L15.9943 4.39998C15.9921 4.17908 15.8112 4.00184 15.5903 4.0041L13 4.03066V1.4C13 1.17909 12.8209 1 12.6 1H11.4C11.1791 1 11 1.17909 11 1.4V4.05117L8.39021 4.07793C8.16931 4.08019 7.99207 4.26111 7.99434 4.48201L8.00664 5.68195C8.0089 5.90285 8.18982 6.08009 8.41072 6.07782L11 6.05127V8.45827L4.5535 11.4125C2.38825 12.4048 1 14.5681 1 16.9499C1 20.3139 3.72709 23.041 7.09113 23.041H16.9089C20.2729 23.041 23 20.3139 23 16.9499C23 14.5681 21.6117 12.4048 19.4465 11.4125Z" fill="currentColor"/>
      
    </svg>
  )
}
