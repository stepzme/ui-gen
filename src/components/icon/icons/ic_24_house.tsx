import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function House({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M1.6061 10.3714C1.21862 10.748 1 11.2653 1 11.8056V21.0001C1 22.1046 1.89543 23.0001 3 23.0001H21C22.1046 23.0001 23 22.1046 23 21.0001V11.7987C23 11.2624 22.7847 10.7487 22.4023 10.3727L13.459 1.57767C12.684 0.815542 11.4422 0.811881 10.6627 1.56943L1.6061 10.3714ZM9.9 12.3648C9.67909 12.3648 9.5 12.5439 9.5 12.7648V16.9648C9.5 17.1857 9.67909 17.3648 9.9 17.3648H14.1C14.3209 17.3648 14.5 17.1857 14.5 16.9648V12.7648C14.5 12.5439 14.3209 12.3648 14.1 12.3648H9.9Z" fill="currentColor"/>
      
    </svg>
  )
}
