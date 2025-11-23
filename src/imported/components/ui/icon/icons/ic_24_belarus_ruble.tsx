import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function BelarusRuble({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1 22V2H8C10.4853 2 12.5 4.01472 12.5 6.5V8C12.5 8.90571 12.2324 9.74892 11.772 10.4549C12.824 11.2786 13.5 12.5604 13.5 14V17.5C13.5 19.9853 11.4853 22 9 22H1ZM4 19H9C9.82843 19 10.5 18.3284 10.5 17.5V14C10.5 13.1716 9.82843 12.5 9 12.5H4L4 19ZM4 9.5H8C8.82843 9.5 9.5 8.82843 9.5 8V6.5C9.5 5.67157 8.82843 5 8 5L4 5V9.5Z" fill="currentColor"/>
      <path d="M15.6 22C15.2686 22 15 21.7314 15 21.4V10.6C15 10.2686 15.2686 10 15.6 10H16.6789C16.8795 10 17.0668 10.1003 17.1781 10.2672L17.8337 11.2506C18.8468 10.7597 19.9642 10.5 21.1042 10.5H21.3995C21.7309 10.5 21.9995 10.7686 21.9995 11.1V12.9C21.9995 13.2314 21.7309 13.5 21.3995 13.5H21.1042C20.953 13.5 20.7961 13.497 20.6358 13.4939C19.7129 13.4761 18.6798 13.4561 18 14V21.4C18 21.7314 17.7314 22 17.4 22H15.6Z" fill="currentColor"/>
      
    </svg>
  )
}
