import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Lightning({ className, ...props }: IconProps) {
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
      
      <path d="M14.9255 2.13826C15.0875 1.21155 14.0201 0.618547 13.3884 1.28435L4.56367 10.5864C3.64123 11.5587 3.9583 13.2098 5.16661 13.726L9.87313 15.7366C10.0333 15.805 10.1258 15.9829 10.0944 16.1624L9.09798 21.8617C8.93596 22.7885 10.0034 23.3815 10.635 22.7156L19.4598 13.4136C20.3822 12.4413 20.0651 10.7902 18.8568 10.274L14.1503 8.26344C13.9901 8.19501 13.8976 8.01705 13.929 7.83764L14.9255 2.13826Z" fill="currentColor"/>
      
    </svg>
  )
}
