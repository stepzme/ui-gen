import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Camera({ className, ...props }: IconProps) {
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
      
      <path d="M15.5 12.9502C15.5 14.8832 13.933 16.4502 12 16.4502C10.067 16.4502 8.5 14.8832 8.5 12.9502C8.5 11.0172 10.067 9.4502 12 9.4502C13.933 9.4502 15.5 11.0172 15.5 12.9502Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 6C1.89543 6 1 6.89543 1 8V19C1 20.1046 1.89543 21 3 21H21C22.1046 21 23 20.1046 23 19V8C23 6.89543 22.1046 6 21 6H18.5352C18.2008 6 17.8886 5.8329 17.7031 5.5547L16.5937 3.8906C16.2228 3.3342 15.5983 3 14.9296 3H9.07037C8.40166 3 7.7772 3.3342 7.40627 3.8906L6.29687 5.5547C6.1114 5.8329 5.79917 6 5.46482 6H3ZM17.5 12.9502C17.5 15.9878 15.0376 18.4502 12 18.4502C8.96243 18.4502 6.5 15.9878 6.5 12.9502C6.5 9.91263 8.96243 7.4502 12 7.4502C15.0376 7.4502 17.5 9.91263 17.5 12.9502Z" fill="currentColor"/>
      
    </svg>
  )
}
