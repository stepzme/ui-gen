import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Tshirt({ className, ...props }: IconProps) {
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
      
      <path d="M16.3699 2C16.1579 2 15.9847 2.1659 15.955 2.37576C15.6645 4.42738 14.0044 6 12 6C9.99557 6 8.3355 4.42738 8.04504 2.37576C8.01533 2.1659 7.84209 2 7.63014 2H6.57197C6.21761 2 5.88971 2.18754 5.71004 2.49298L1.6033 9.47443C1.28839 10.0098 1.53255 10.6997 2.11411 10.9178L4.35115 11.7567C4.74145 11.903 5.00002 12.2762 5.00002 12.693V21C5.00002 21.5523 5.44774 22 6.00003 22H18C18.5523 22 19 21.5523 19 21V12.693C19 12.2762 19.2586 11.903 19.6489 11.7567L21.8859 10.9178C22.4675 10.6997 22.7117 10.0098 22.3967 9.47443L18.29 2.49298C18.1103 2.18754 17.7824 2 17.4281 2H16.3699Z" fill="currentColor"/>
      
    </svg>
  )
}
