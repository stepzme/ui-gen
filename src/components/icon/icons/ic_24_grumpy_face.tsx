import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function GrumpyFace({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12 1C18.0766 1 23 5.92339 23 12C23 18.0766 18.0766 23 12 23C5.92339 23 1 18.0766 1 12C1 5.92339 5.92339 1 12 1ZM12 14C10.3224 14 8.71916 14.3182 7.24707 14.8965C7.09691 14.9556 7.00001 15.1013 7 15.2627V16.5479C7.00025 16.8466 7.31717 17.0408 7.59082 16.9209C8.9406 16.3293 10.4315 16 12 16C13.5685 16 15.0594 16.3293 16.4092 16.9209C16.6828 17.0408 16.9998 16.8466 17 16.5479V15.2627C17 15.1013 16.9031 14.9556 16.7529 14.8965C15.2808 14.3182 13.6776 14 12 14ZM7 9V11.4004C7.00021 11.7315 7.26855 11.9998 7.59961 12H8.40039C8.73145 11.9998 8.99979 11.7315 9 11.4004V9H7ZM15 9V11.4004C15.0002 11.7315 15.2685 11.9998 15.5996 12H16.4004C16.7315 11.9998 16.9998 11.7315 17 11.4004V9H15Z" fill="currentColor"/>
      
    </svg>
  )
}
