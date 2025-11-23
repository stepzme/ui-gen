import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CirclePlus({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM10.998 17.2747V13H6.7252C6.50428 13 6.3252 12.8209 6.3252 12.6V11.4C6.3252 11.1791 6.50428 11 6.7252 11H10.998V6.72568C10.998 6.50477 11.1771 6.32568 11.398 6.32568H12.598C12.819 6.32568 12.998 6.50477 12.998 6.72568V11H17.2742C17.4951 11 17.6742 11.1791 17.6742 11.4V12.6C17.6742 12.8209 17.4951 13 17.2742 13H12.998V17.2747C12.998 17.4956 12.819 17.6747 12.598 17.6747H11.398C11.1771 17.6747 10.998 17.4956 10.998 17.2747Z" fill="currentColor"/>
      
    </svg>
  )
}
