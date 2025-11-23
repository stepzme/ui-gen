import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ChatSmile({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M23 12.0298C23 5.95465 18.0751 1.02979 12 1.02979C5.92487 1.02979 1 5.95465 1 12.0298C1 18.1049 5.92487 23.0298 12 23.0298H21C22.1046 23.0298 23 22.1344 23 21.0298V12.0298ZM8.82151 12.429C8.79426 12.2098 8.61779 12.0298 8.39687 12.0298H6.69688C6.47596 12.0298 6.29542 12.2095 6.31069 12.4299C6.51602 15.393 8.9848 17.733 12.0001 17.733C15.0154 17.733 17.4842 15.393 17.6896 12.4299C17.7048 12.2095 17.5243 12.0298 17.3034 12.0298H15.6034C15.3825 12.0298 15.206 12.2098 15.1787 12.429C14.9822 14.0097 13.634 15.233 12.0001 15.233C10.3662 15.233 9.01802 14.0097 8.82151 12.429Z" fill="currentColor"/>
      
    </svg>
  )
}
