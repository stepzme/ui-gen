import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardCircleArrow({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89545 4 1 4.89551 1 6V17.9902C1 19.0947 1.89545 19.9902 3 19.9902H21C22.1046 19.9902 23 19.0947 23 17.9902V6C23 4.89551 22.1046 4 21 4H3ZM15.8882 11.99C15.8882 10.3055 14.6241 8.91632 12.9928 8.71926C12.7734 8.69277 12.5935 8.51623 12.5935 8.29531V7.09531C12.5935 6.8744 12.7732 6.69374 12.9935 6.7102C15.7309 6.91467 17.8882 9.20048 17.8882 11.99C17.8882 14.9143 15.5177 17.2847 12.5935 17.2847C9.80939 17.2847 7.52716 15.1357 7.31494 12.4062H6.0213C5.31744 12.4062 4.9566 11.5627 5.44275 11.0537L7.72058 8.66846C8.03571 8.33838 8.56256 8.33838 8.87769 8.66846L11.1555 11.0537C11.6417 11.5627 11.2808 12.4062 10.577 12.4062H9.32483C9.52942 14.0293 10.9149 15.2847 12.5935 15.2847C14.4131 15.2847 15.8882 13.8096 15.8882 11.99Z" fill="currentColor"/>
      
    </svg>
  )
}
