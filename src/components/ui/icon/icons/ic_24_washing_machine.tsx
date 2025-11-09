import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function WashingMachine({ className, ...props }: IconProps) {
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
      
      <path d="M12 19C14.7614 19 17 16.7614 17 14C17 11.2386 14.7614 9 12 9C9.23858 9 7 11.2386 7 14C7 16.7614 9.23858 19 12 19Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 3C2 1.89543 2.89543 1 4 1H20C21.1046 1 22 1.89543 22 3V21C22 22.1046 21.1046 23 20 23H4C2.89543 23 2 22.1046 2 21V3ZM12 21C15.866 21 19 17.866 19 14C19 10.134 15.866 7 12 7C8.13401 7 5 10.134 5 14C5 17.866 8.13401 21 12 21ZM15 4.5C15 5.32843 14.3284 6 13.5 6C12.6716 6 12 5.32843 12 4.5C12 3.67157 12.6716 3 13.5 3C14.3284 3 15 3.67157 15 4.5ZM20 4.5C20 5.32843 19.3284 6 18.5 6C17.6716 6 17 5.32843 17 4.5C17 3.67157 17.6716 3 18.5 3C19.3284 3 20 3.67157 20 4.5Z" fill="currentColor"/>
      
    </svg>
  )
}
