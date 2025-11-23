import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Intellekt({ className, ...props }: IconProps) {
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
      
      <mask id="mask0_18879_35" maskUnits="userSpaceOnUse" x="4" y="1">
      <path d="M12.5661 1.52832C12.3706 1.26517 11.9767 1.26514 11.7812 1.52826L4.43331 11.4178C4.17606 11.7641 4.17608 12.238 4.43336 12.5842L11.7812 22.4719C11.9767 22.7349 12.3706 22.7349 12.5661 22.4718L19.9115 12.5841C20.1687 12.2379 20.1687 11.7641 19.9116 11.418L12.5661 1.52832Z" fill="#BADACE"/>
      </mask>
      <g mask="url(#mask0_18879_35)">
      <path d="M12.174 1L3.81564 11.8014H8.34759L12.174 1Z" fill="currentColor"/>
      <path d="M20.2911 11.7556L12.1738 1L15.4721 11.7556H20.2911Z" fill="currentColor"/>
      <path d="M12.1738 1L8.93311 11.7708H12.1738H14.9523L12.1738 1Z" fill="currentColor"/>
      <path d="M12.174 23L3.81564 12.1986H8.36849L12.174 23Z" fill="currentColor"/>
      <path d="M20.2911 12.2444L12.1738 23L15.4721 12.2444H20.2911Z" fill="currentColor"/>
      <path d="M12.1738 23L8.93311 12.2292H12.1738H14.9732L12.1738 23Z" fill="currentColor"/>
      </g>
      
    </svg>
  )
}
