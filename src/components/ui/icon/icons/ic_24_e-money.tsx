import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function EMoney({ className, ...props }: IconProps) {
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
      
      <path d="M7.10002 11H16.9C16.4367 8.71776 14.419 7 12 7C9.58104 7 7.56329 8.71776 7.10002 11Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.9789 15.6423C16.7497 17.6559 14.5318 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12V12.6C19 12.8209 18.8209 13 18.6 13H7.10002C7.56329 15.2822 9.58104 17 12 17C13.7677 17 15.3212 16.0826 16.2103 14.698C16.3296 14.5122 16.5705 14.4376 16.7653 14.5415L17.8244 15.1064C18.0195 15.2104 18.0941 15.4536 17.9789 15.6423Z" fill="currentColor"/>
      
    </svg>
  )
}
