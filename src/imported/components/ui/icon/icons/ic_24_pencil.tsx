import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Pencil({ className, ...props }: IconProps) {
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
      
      <path d="M2.23869 16.8285C2.08583 16.9814 1.99998 17.1887 2 17.4048L2.00043 21.4355C2.00046 21.7357 2.24406 21.9791 2.54454 21.979L6.57761 21.9788C6.79422 21.9788 7.00193 21.8928 7.155 21.7397L18.4774 10.4137L13.5615 5.50214L2.23869 16.8285Z" fill="currentColor"/>
      <path d="M14.9072 4.15601L19.8231 9.06755L21.5226 7.36752C22.2016 6.69933 22.1921 5.60166 21.5018 4.94521L18.9016 2.47248C18.26 1.86237 17.2548 1.85576 16.6053 2.45738L14.9072 4.15601Z" fill="currentColor"/>
      
    </svg>
  )
}
