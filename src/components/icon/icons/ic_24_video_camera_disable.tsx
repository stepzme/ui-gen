import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function VideoCameraDisable({ className, ...props }: IconProps) {
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
      
      <path d="M4.67697 1.64481C4.55947 1.45775 4.31259 1.40135 4.12552 1.51883L3.10929 2.15701C2.92219 2.2745 2.86578 2.52143 2.9833 2.70852L5.0506 5.99964H3C1.89539 5.99964 1 6.89506 1 7.99964V15.9996C1 17.1042 1.89539 17.9996 3 17.9996H12.5884L15.3237 22.3542C15.4412 22.5413 15.6881 22.5977 15.8751 22.4802L16.8913 21.8419C17.0783 21.7244 17.1347 21.4775 17.0172 21.2904L4.67697 1.64481Z" fill="currentColor"/>
      <path d="M17.2981 17.9776C18.2613 17.8336 19 17.0029 19 15.9996V13.9637L21.3094 16.1691C21.9458 16.7767 23.0001 16.3257 23.0001 15.4459V8.55387C23.0001 7.67405 21.9458 7.22303 21.3094 7.83067L19 10.0361V7.99964C19 6.89506 18.1046 5.99964 17 5.99964H9.77424L17.2981 17.9776Z" fill="currentColor"/>
      
    </svg>
  )
}
