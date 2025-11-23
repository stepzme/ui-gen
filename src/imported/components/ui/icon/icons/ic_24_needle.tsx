import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Needle({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M21.2233 2.65946C19.8712 1.30737 17.6411 1.44219 16.4617 2.9473L1.95557 21.4602C1.58868 21.9284 2.19999 22.5312 2.66302 22.1577L20.9704 7.39318C22.4449 6.20405 22.5627 3.99888 21.2233 2.65946ZM19.8222 4.13654C19.2866 3.60097 18.4183 3.60097 17.8828 4.13654L16.7617 5.25763C16.2261 5.7932 16.2261 6.66152 16.7617 7.19708C17.2972 7.73265 18.1655 7.73265 18.7011 7.19708L19.8222 6.07599C20.3578 5.54043 20.3578 4.6721 19.8222 4.13654Z" fill="currentColor"/>
      
    </svg>
  )
}
