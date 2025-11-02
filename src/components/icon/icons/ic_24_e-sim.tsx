import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ESIM({ className, ...props }: IconProps) {
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
      
      <path d="M8.125 10.9375C8.56904 9.21227 10.1351 7.9375 11.999 7.9375C13.8628 7.9375 15.4289 9.21227 15.873 10.9375H8.125Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.78144 7.44304C1.28876 7.8216 1 8.40763 1 9.02895V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4H6.94209C6.50138 4 6.07301 4.14557 5.72354 4.41409L1.78144 7.44304ZM17.9636 12.6023C17.9422 12.7965 17.7739 12.9375 17.5786 12.9375H8.12602C8.57006 14.6627 10.1362 15.9375 12 15.9375C13.2111 15.9375 14.2964 15.3993 15.03 14.549C15.1715 14.3849 15.4133 14.3381 15.5937 14.4583L16.5954 15.1261C16.7816 15.2502 16.8307 15.5039 16.6911 15.6787C15.5916 17.0554 13.8988 17.9375 12 17.9375C8.68629 17.9375 6 15.2512 6 11.9375C6 8.62379 8.68629 5.9375 12 5.9375C15.3137 5.9375 18 8.62379 18 11.9375C18 12.1622 17.9876 12.384 17.9636 12.6023Z" fill="currentColor"/>
      
    </svg>
  )
}
