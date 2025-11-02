import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Target({ className, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 22 22"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
      
      <path fillRule="evenodd" clipRule="evenodd" d="M11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17ZM9.07227 10.9996C9.07227 9.93518 9.93518 9.07227 10.9996 9.07227C12.0641 9.07227 12.927 9.93518 12.927 10.9996C12.927 12.0641 12.0641 12.927 10.9996 12.927C9.93518 12.927 9.07227 12.0641 9.07227 10.9996Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9998 21.9997C17.0749 21.9997 21.9997 17.0749 21.9997 10.9998C21.9997 4.9248 17.0749 0 10.9998 0C4.9248 0 0 4.9248 0 10.9998C0 17.0749 4.9248 21.9997 10.9998 21.9997ZM11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" fill="currentColor"/>
      
    </svg>
  )
}
