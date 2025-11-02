import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PregnantWoman({ className, ...props }: IconProps) {
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
      
      <path d="M15.2693 4.85C15.2693 6.9763 13.5456 8.7 11.4193 8.7C9.293 8.7 7.5693 6.9763 7.5693 4.85C7.5693 2.7237 9.293 1 11.4193 1C13.5456 1 15.2693 2.7237 15.2693 4.85Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.2173 10.008C9.34559 9.43801 7.40519 10.6662 7.11939 12.6017L5.58398 23.0001L18.416 22.9999V20.7686C18.416 18.8767 17.2362 17.2603 15.5723 16.6151L15.4753 14.9293C15.3478 12.7126 13.8521 10.8103 11.728 10.1635L11.2173 10.008ZM11.2254 13.9999C11.2254 13.3924 10.7329 12.8999 10.1254 12.8999C9.51788 12.8999 9.02539 13.3924 9.02539 13.9999V18.8751C9.02539 19.3679 9.35318 19.8006 9.82761 19.934L13.8276 21.0588C14.4124 21.2233 15.0199 20.8825 15.1843 20.2977C15.3488 19.7129 15.008 19.1054 14.4232 18.941L11.2254 18.0417V13.9999Z" fill="currentColor"/>
      
    </svg>
  )
}
