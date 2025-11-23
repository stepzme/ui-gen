import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function Label({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M21.4121 11.7806C21.7887 11.4053 22.0003 10.8956 22.0003 10.364L22.0002 3.00193C22.0001 2.44965 21.5524 2.00195 21.0002 2.00195L13.6344 2.00201C13.1051 2.00201 12.5974 2.2118 12.2226 2.58542L2.41824 12.3569C1.63495 13.1376 1.63389 14.4057 2.41586 15.1877L8.77982 21.5516C9.55994 22.3318 10.8244 22.3328 11.6059 21.554L21.4121 11.7806ZM17 9.00146C18.1046 9.00146 19 8.10603 19 7.00146C19 5.8969 18.1046 5.00146 17 5.00146C15.8954 5.00146 15 5.8969 15 7.00146C15 8.10603 15.8954 9.00146 17 9.00146Z" fill="currentColor"/>
      
    </svg>
  )
}
