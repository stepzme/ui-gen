import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Crown({ className, ...props }: IconProps) {
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
      
      <path d="M12.8604 2.53754C12.4784 1.81941 11.4486 1.8212 11.0691 2.54064L6.80507 10.6245L2.60248 7.462C1.87482 6.91443 0.853591 7.54527 1.01753 8.44106L2.77123 18.0234H21.2744L23.0281 8.44106C23.1921 7.54527 22.1708 6.91443 21.4432 7.462L17.1845 10.6667L12.8604 2.53754Z" fill="currentColor"/>
      <path d="M21.2344 20.0234H2.7666L2.7666 20.115C2.76659 20.7036 3.02086 21.1139 3.42557 21.4799L3.42673 21.481C3.78134 21.8011 4.2512 21.9961 4.7666 21.9961H19.2344C19.7498 21.9961 20.2197 21.8011 20.5743 21.481H20.6199L20.6293 21.4293C21.0026 21.066 21.2344 20.677 21.2344 20.115V20.0234Z" fill="currentColor"/>
      
    </svg>
  )
}
