import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function WindowArrow({ className, ...props }: IconProps) {
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
      
      <path d="M2.99902 2C1.89445 2 0.999023 2.89543 0.999023 4V7H20.999V4C20.999 2.89543 20.1036 2 18.999 2H2.99902Z" fill="currentColor"/>
      <path d="M20.999 9H0.999023V16C0.999023 17.1046 1.89445 18 2.99902 18H12.7988L12.0203 15.867C11.1456 13.4708 13.4708 11.1456 15.867 12.0203L20.999 13.8935V9Z" fill="currentColor"/>
      <path d="M20.7023 15.9143C20.814 15.955 20.9127 16.0124 20.9974 16.0822C21.4332 16.4413 21.499 17.1281 21.0662 17.5609L20.0202 18.6069L22.9234 21.51C23.0796 21.6662 23.0796 21.9195 22.9234 22.0757L22.0749 22.9242C21.9187 23.0804 21.6654 23.0804 21.5092 22.9242L18.606 20.0211L17.5604 21.0667C17.0434 21.5836 16.1646 21.3892 15.9139 20.7025L13.8987 15.1814C13.7056 14.6525 13.9803 14.134 14.4198 13.9286C14.6441 13.8238 14.9113 13.8005 15.1813 13.899L20.7023 15.9143Z" fill="currentColor"/>
      
    </svg>
  )
}
