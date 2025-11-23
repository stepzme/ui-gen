import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PhoneHorizontal({ className, ...props }: IconProps) {
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
      
      <path d="M23 13.7695V14.9329C23 15.9833 22.0191 16.758 20.9973 16.5148L17.818 15.7578C16.8927 15.5375 16.2698 14.6708 16.3559 13.7236L16.4587 12.593C16.5009 12.1292 16.2396 11.6909 15.8115 11.5075C13.3776 10.4643 10.6224 10.4643 8.18848 11.5075C7.76041 11.6909 7.49913 12.1292 7.5413 12.593L7.64408 13.7236C7.7302 14.6708 7.10729 15.5375 6.182 15.7578L3.00272 16.5148C1.98093 16.758 1 15.9833 1 14.9329L1 13.7698C1 11.0474 2.71681 8.62097 5.28398 7.71491C9.62991 6.18105 14.37 6.18096 18.716 7.71471C21.2832 8.6207 23 11.0472 23 13.7695Z" fill="currentColor"/>
      
    </svg>
  )
}
