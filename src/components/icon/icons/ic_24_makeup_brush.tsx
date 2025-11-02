import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function MakeupBrush({ className, ...props }: IconProps) {
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
      
      <path d="M14.7667 1.5875C13.6372 0.457988 11.7046 1.04307 11.3914 2.60948L10.0029 9.55162L14.2456 13.7943L21.1877 12.4059C22.754 12.0925 23.3392 10.16 22.2097 9.03038L21.4808 8.30149C21.4325 8.25315 21.3737 8.21897 21.3103 8.20054C21.2405 8.18016 21.1653 8.17869 21.0926 8.19847L18.3435 8.94822C18.0019 9.04136 17.7167 8.67759 17.8887 8.36802L19.0488 6.27977C19.1355 6.12364 19.1083 5.92906 18.9819 5.80271L14.7667 1.5875Z" fill="currentColor"/>
      <path d="M1.43115 22.3653C0.908197 21.8424 0.854486 21.0126 1.30554 20.4266L8.58801 10.9658L12.8307 15.2085L3.36987 22.4908C2.78381 22.942 1.9541 22.8883 1.43115 22.3653Z" fill="currentColor"/>
      
    </svg>
  )
}
