import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Wallet({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M0.996094 5.95557C0.996094 4.29871 2.33924 2.95557 3.99609 2.95557H19.6988C19.9197 2.95557 20.0988 3.13465 20.0988 3.35557V4.55557C20.0988 4.77648 19.9197 4.95557 19.6988 4.95557H3.99609C3.44381 4.95557 2.99609 5.40328 2.99609 5.95557V6.83252L21.0004 6.83252C22.105 6.83252 23.0004 7.72795 23.0004 8.83252V18.9574C23.0004 20.062 22.105 20.9574 21.0004 20.9574H3C1.89543 20.9574 1 20.062 1 18.9574V13.0489H0.996094V5.95557ZM19.4141 12.3689C18.5856 12.3689 17.9141 13.0405 17.9141 13.8689C17.9141 14.6973 18.5856 15.3689 19.4141 15.3689C20.2425 15.3689 20.9141 14.6973 20.9141 13.8689C20.9141 13.0405 20.2425 12.3689 19.4141 12.3689Z" fill="currentColor"/>
      
    </svg>
  )
}
