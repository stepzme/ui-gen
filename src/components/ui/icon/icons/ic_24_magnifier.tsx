import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Magnifier({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M20.0546 10.2793C20.0546 15.4041 15.9002 19.5585 10.7754 19.5585C5.65057 19.5585 1.49609 15.4041 1.49609 10.2793C1.49609 5.15447 5.65056 1 10.7754 1C15.9002 1 20.0546 5.15447 20.0546 10.2793ZM16.9628 10.2739C16.9628 13.6904 14.1932 16.4601 10.7766 16.4601C7.36008 16.4601 4.59044 13.6904 4.59044 10.2739C4.59044 6.85737 7.36008 4.08772 10.7766 4.08772C14.1932 4.08772 16.9628 6.85737 16.9628 10.2739ZM17.1138 22.2122L15.7374 20.3901C16.9999 19.7318 18.1143 18.8542 19.0398 17.8157L20.3381 19.5344L20.3372 19.5351L20.4537 19.6893C21.104 20.5502 20.9333 21.7753 20.0724 22.4256L19.8501 22.5935C18.9892 23.2438 17.7641 23.0731 17.1138 22.2122Z" fill="currentColor"/>
      
    </svg>
  )
}
