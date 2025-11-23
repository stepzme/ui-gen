import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Gosuslugi({ className, ...props }: IconProps) {
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
      
      <path d="M3.00376 6H8.24762L12.005 3.77434L19.3767 8.14102L19.3661 15.859L11.9944 20.2257L8.23703 18H2.99316C3.01151 18.0117 3.03006 18.023 3.04883 18.0342L10.9452 22.7116C11.5944 23.0961 12.3943 23.0961 13.0435 22.7116L20.9399 18.0342C21.5891 17.6496 21.9891 16.9389 21.9891 16.1697L21.9997 7.83028C21.9997 7.06113 21.5997 6.35042 20.9505 5.96584L13.0541 1.28843C12.4049 0.903857 11.605 0.903857 10.9558 1.28843L3.05942 5.96584C3.04066 5.97696 3.0221 5.98835 3.00376 6Z" fill="currentColor"/>
      <path d="M2 13.4C2 13.1791 2.17909 13 2.4 13H15.1184C15.3393 13 15.5184 13.1791 15.5184 13.4V15.6C15.5184 15.8209 15.3393 16 15.1184 16H2.4C2.17909 16 2 15.8209 2 15.6V13.4Z" fill="currentColor"/>
      <path d="M2.4 8C2.17909 8 2 8.17909 2 8.4V10.6C2 10.8209 2.17909 11 2.4 11H8.6C8.82091 11 9 10.8209 9 10.6V8.4C9 8.17909 8.82091 8 8.6 8H2.4Z" fill="currentColor"/>
      
    </svg>
  )
}
