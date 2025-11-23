import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function DisplayPhone({ className, ...props }: IconProps) {
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
      
      <path d="M3 2.88087C3 1.84209 3.84209 1 4.88087 1H21.1191C22.1579 1 23 1.84209 23 2.88087V13.1191C23 14.1579 22.1579 15 21.1191 15H15.0352V18.2554H18.6443C18.8652 18.2554 19.0443 18.4345 19.0443 18.6554V19.8554C19.0443 20.0763 18.8652 20.2554 18.6443 20.2554H10.9998V12C10.9998 10.3431 9.65669 9 7.99984 9H3V2.88087Z" fill="currentColor"/>
      <path d="M2 11C1.44772 11 1 11.4477 1 12V22C1 22.5523 1.44772 23 2 23H8C8.55229 23 9 22.5523 9 22V12C9 11.4477 8.55229 11 8 11H2Z" fill="currentColor"/>
      
    </svg>
  )
}
