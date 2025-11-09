import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PencilWriting({ className, ...props }: IconProps) {
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
      
      <path d="M19.8231 9.06755L14.9072 4.15601L16.6053 2.45738C17.2548 1.85576 18.26 1.86237 18.9016 2.47248L21.5018 4.94521C22.1921 5.60166 22.2016 6.69933 21.5226 7.36752L19.8231 9.06755Z" fill="currentColor"/>
      <path d="M2 17.4048C1.99998 17.1887 2.08583 16.9814 2.23869 16.8285L13.5615 5.50214L18.4774 10.4137C14.6624 14.2299 10.8339 18.0338 7.02515 21.856C6.95008 21.9313 6.84811 21.9736 6.74176 21.9737C5.34279 21.974 3.94357 21.979 2.54454 21.979C2.24406 21.9791 2.00046 21.7357 2.00043 21.4355L2 17.4048Z" fill="currentColor"/>
      <path d="M22.0022 21.9741L9.73098 21.9737L11.7235 19.9738L22.0022 19.9741L22.0022 21.9741Z" fill="currentColor"/>
      
    </svg>
  )
}
