import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Plus({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M8.99919 15.0061L9.91446 21.2882C10.0577 22.271 10.9004 22.9999 11.8936 22.9999H12.0682C13.0708 22.9999 13.9185 22.2575 14.0507 21.2635L14.8829 15.0061L21.4413 13.7781C22.3414 13.6095 22.9938 12.8236 22.9938 11.9078C22.9938 10.9849 22.3317 10.1951 21.423 10.0342L14.8829 8.87558L14.0539 2.74424C13.9198 1.75226 13.073 1.01221 12.072 1.01221H11.8894C10.898 1.01221 10.0563 1.73848 9.91102 2.71918L8.99919 8.87558L2.57643 10.0302C1.66755 10.1936 1.00616 10.9844 1.00616 11.9079C1.00616 12.8242 1.65763 13.6111 2.55785 13.7822L8.99919 15.0061Z" fill="currentColor"/>
      
    </svg>
  )
}
