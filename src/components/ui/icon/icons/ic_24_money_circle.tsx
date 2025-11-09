import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function MoneyCircle({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1 4C1 2.89543 1.89543 2 3 2H21C22.1046 2 23 2.89543 23 4V14C23 14.8934 22.4142 15.65 21.6057 15.9066C21.4148 15.9672 21.2114 16.0002 21.0005 16.0002H3.00047C2.89663 16.0002 2.79463 15.9923 2.69506 15.977C1.73522 15.8302 1 15.0009 1 14V4ZM2.50578 17.9699L2.45148 18.5416C2.34667 19.6452 3.1595 20.6235 4.26362 20.7227L19.0212 22.0481C20.117 22.1465 21.0864 21.3415 21.1911 20.2463L21.4077 17.9797C21.2738 17.9932 21.1379 18.0002 21.0005 18.0002H3.00047C2.83297 18.0002 2.66788 17.9899 2.50578 17.9699ZM11.9694 6.34814C10.3888 6.34814 9.10742 7.62949 9.10742 9.21012C9.10742 10.7907 10.3888 12.0721 11.9694 12.0721C13.55 12.0721 14.8314 10.7907 14.8314 9.21012C14.8314 7.62949 13.55 6.34814 11.9694 6.34814Z" fill="currentColor"/>
      
    </svg>
  )
}
