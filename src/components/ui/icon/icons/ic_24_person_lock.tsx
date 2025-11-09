import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function PersonLock({ className, ...props }: IconProps) {
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
      
      <path d="M9.85011 10C12.3354 10 14.3501 7.98528 14.3501 5.5C14.3501 3.01472 12.3354 1 9.85011 1C7.36483 1 5.35011 3.01472 5.35011 5.5C5.35011 7.98528 7.36483 10 9.85011 10Z" fill="currentColor"/>
      <path d="M8.1123 11C5.05007 11 2.35756 13.0267 1.51042 15.9695L1.08515 17.4467C0.717092 18.7252 1.67667 20 3.00709 20H13V18C13 17.1087 13.3886 16.3083 14.0057 15.7588C14.0705 14.3952 14.6815 13.1747 15.6247 12.3111C14.4799 11.4797 13.0777 11 11.5879 11H8.1123Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M16 16C16 15.0837 16.4108 14.2634 17.0582 13.7131C17.5815 13.2684 18.2594 13 19 13C20.6569 13 22 14.3431 22 16V17C22.5523 17 23 17.4477 23 18V22C23 22.5523 22.5523 23 22 23H16C15.4477 23 15 22.5523 15 22V18C15 17.4477 15.4477 17 16 17V16ZM18.0771 15.6143C18.0274 15.733 18 15.8633 18 16V17H20V16C20 15.4477 19.5523 15 19 15C18.5844 15 18.2281 15.2535 18.0771 15.6143Z" fill="currentColor"/>
      
    </svg>
  )
}
