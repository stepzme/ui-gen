import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ArrowDiagonalTopRight({ className, ...props }: IconProps) {
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
      
      <path d="M4.10688 4.47586C2.54115 4.76742 2.06596 6.77919 3.33576 7.74051L7.46455 10.8662C7.62605 10.9885 7.677 11.2088 7.58559 11.3895L3.3949 18.7951C2.87954 19.7058 3.10322 20.8561 3.92232 21.5073C4.73719 22.1552 5.90128 22.118 6.67312 21.4194L13.1182 15.5859C13.2671 15.445 13.496 15.4324 13.6594 15.5561L18.0581 18.8862C19.3195 19.8411 21.1169 18.8577 20.9929 17.2805L19.9624 4.17432C19.8526 2.77822 18.5573 1.78502 17.1805 2.04139L4.10688 4.47586Z" fill="currentColor"/>
      
    </svg>
  )
}
