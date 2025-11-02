import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Shield({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 3.00049C3 1.89565 3.89543 1 5 1H19C20.1046 1 21 1.89565 21 3.00049V13.2031C21 15.9171 19.6248 18.446 17.347 19.9207L13.0867 22.6789C12.4255 23.107 11.5745 23.107 10.9133 22.6789L6.653 19.9207C4.37524 18.446 3 15.9171 3 13.2031V3.00049ZM5 3.00049H12V20.9995L7.73975 18.2413C6.03143 17.1353 5 15.2386 5 13.2031V3.00049Z" fill="currentColor"/>
      
    </svg>
  )
}
