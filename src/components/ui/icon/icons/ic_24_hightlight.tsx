import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Hightlight({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3.59738 13.6509C6.99246 14.296 9.60476 17.0234 10.103 20.4431C10.2332 21.337 10.9998 22 11.9032 22H12.062C12.974 22 13.7451 21.3247 13.8653 20.4206C14.317 17.0245 16.8987 14.3026 20.2661 13.6721L20.5878 13.6118C21.4066 13.4585 22 12.7437 22 11.9106C22 11.0712 21.3977 10.3528 20.5711 10.2064L20.1638 10.1342C16.8624 9.54938 14.3175 6.89801 13.8683 3.57546C13.7463 2.67315 12.976 2 12.0655 2H11.8994C10.9977 2 10.232 2.66062 10.0999 3.55266C9.60424 6.89894 7.02824 9.5556 3.69882 10.1541L3.42832 10.2027C2.6016 10.3514 2 11.0708 2 11.9107C2 12.7442 2.59257 13.46 3.41142 13.6156L3.59738 13.6509Z" fill="currentColor"/>
      
    </svg>
  )
}
