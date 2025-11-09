import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ArrowUpFromPlane({ className, ...props }: IconProps) {
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
      
      <path d="M18.7194 10.9382C19.8518 10.9382 20.4447 9.59282 19.6807 8.75705L12.9769 1.42365C12.4611 0.859451 11.5726 0.858677 11.0559 1.42197L4.32862 8.75538C3.56242 9.59061 4.15491 10.9382 5.28834 10.9382H8.75985L10.0983 17.4303C10.2824 18.3232 11.0686 18.9638 11.9802 18.9638C12.888 18.9638 13.6719 18.3285 13.86 17.4405L15.2373 10.9382H18.7194Z" fill="currentColor"/>
      <path d="M22.6361 23.0308C22.857 23.0308 23.0361 22.8517 23.0361 22.6308V21.4308C23.0361 21.2098 22.857 21.0308 22.6361 21.0308H1.4C1.17909 21.0308 1 21.2098 1 21.4308V22.6308C1 22.8517 1.17909 23.0308 1.4 23.0308H22.6361Z" fill="currentColor"/>
      
    </svg>
  )
}
