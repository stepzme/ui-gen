import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Bed({ className, ...props }: IconProps) {
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
      
      <path d="M1.39902 4C1.17811 4 0.999023 4.17909 0.999023 4.4V19.6C0.999023 19.8209 1.17811 20 1.39902 20H2.59902C2.81994 20 2.99902 19.8209 2.99902 19.6L2.99902 16H20.999V19.5999C20.999 19.8209 21.1781 19.9999 21.399 19.9999H22.599C22.8199 19.9999 22.999 19.8209 22.999 19.5999V16H23.0134V8C23.0134 6.89543 22.1179 6 21.0134 6H13.0484C12.2726 6 11.5667 6.44872 11.2374 7.15126L9.59178 10.6627C9.26252 11.3652 8.55666 11.8139 7.7808 11.8139H2.99902L2.99902 4.4C2.99902 4.17909 2.81994 4 2.59902 4H1.39902Z" fill="currentColor"/>
      <path d="M9.09306 7.1521C9.09306 8.52378 7.98376 9.63574 6.61538 9.63574C5.24699 9.63574 4.1377 8.52378 4.1377 7.1521C4.1377 5.78042 5.24699 4.66846 6.61538 4.66846C7.98376 4.66846 9.09306 5.78042 9.09306 7.1521Z" fill="currentColor"/>
      
    </svg>
  )
}
