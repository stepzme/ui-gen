import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function LockPinCode({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M6.59863 9V6.36092C6.59863 3.39801 9.00055 0.996094 11.9635 0.996094C14.9264 0.996094 17.3283 3.39801 17.3283 6.36092V9H19C20.1046 9 21 9.89543 21 11V21C21 22.1046 20.1046 23 19 23H5C3.89543 23 3 22.1046 3 21V11C3 9.89543 3.89543 9 5 9H6.59863ZM8.59863 6.36092C8.59863 4.50258 10.1051 2.99609 11.9635 2.99609C13.8218 2.99609 15.3283 4.50258 15.3283 6.36092V9H8.59863V6.36092ZM7 14.5C6.17157 14.5 5.5 15.1716 5.5 16C5.5 16.8284 6.17157 17.5 7 17.5C7.82843 17.5 8.5 16.8284 8.5 16C8.5 15.1716 7.82843 14.5 7 14.5ZM10.5 16C10.5 15.1716 11.1716 14.5 12 14.5C12.8284 14.5 13.5 15.1716 13.5 16C13.5 16.8284 12.8284 17.5 12 17.5C11.1716 17.5 10.5 16.8284 10.5 16ZM15.5 16C15.5 15.1716 16.1716 14.5 17 14.5C17.8284 14.5 18.5 15.1716 18.5 16C18.5 16.8284 17.8284 17.5 17 17.5C16.1716 17.5 15.5 16.8284 15.5 16Z" fill="currentColor"/>
      
    </svg>
  )
}
