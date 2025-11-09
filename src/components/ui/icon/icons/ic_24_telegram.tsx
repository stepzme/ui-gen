import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Telegram({ className, ...props }: IconProps) {
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
      
      <path d="M21.4955 2.25275L1.64344 10.725C0.737187 11.1117 0.80388 12.418 1.74482 12.7105L5.64907 13.924C5.93597 14.0131 6.24775 13.9686 6.4982 13.8027L18.9884 5.52717C19.3217 5.30638 19.681 5.76703 19.3857 6.03646C19.3857 6.03646 13.3422 11.5505 9.25485 15.2798C9.04719 15.4693 8.92972 15.7356 8.92971 16.0167C8.92968 17.4909 8.92965 18.9929 8.92963 20.0459C8.92962 20.3975 9.35001 20.5767 9.60344 20.333C10.3824 19.5838 11.141 18.8479 11.9323 18.1268C12.0713 18.0001 12.2801 17.9889 12.4328 18.0988L17.5811 21.8058C18.2149 22.2621 19.1085 21.9154 19.2687 21.1511L22.976 3.46731C23.1552 2.61275 22.2986 1.91002 21.4955 2.25275Z" fill="currentColor"/>
      
    </svg>
  )
}
