import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Diamond({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M5.8 3C5.28644 3 4.79257 3.19755 4.42069 3.55172L2.04547 5.81383C1.32935 6.49586 1.2192 7.59887 1.78632 8.40903L10.3615 20.6593C11.1577 21.7968 12.8423 21.7968 13.6385 20.6593L22.2137 8.40903C22.7808 7.59887 22.6706 6.49586 21.9545 5.81383L19.5793 3.55172C19.2074 3.19755 18.7136 3 18.2 3H5.8ZM5.73418 7H8.92492C9.14714 7 9.3427 7.14667 9.40492 7.36L11.8866 15.8686C12.0468 16.418 11.308 16.7621 10.9906 16.286L5.31815 7.77735C5.09663 7.44507 5.33483 7 5.73418 7Z" fill="currentColor"/>
      
    </svg>
  )
}
