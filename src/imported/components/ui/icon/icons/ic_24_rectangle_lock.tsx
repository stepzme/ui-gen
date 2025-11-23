import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function RectangleLock({ className, ...props }: IconProps) {
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
      
      <path d="M10.3857 8.56339C10.3857 7.67191 11.1084 6.94922 11.9999 6.94922C12.8914 6.94922 13.6141 7.67191 13.6141 8.56339V11H10.3857V8.56339Z" fill="currentColor"/>
      <path d="M12.6 13C12.8209 13 13 13.1791 13 13.4V15.6C13 15.8209 12.8209 16 12.6 16H11.4C11.1791 16 11 15.8209 11 15.6V13.4C11 13.1791 11.1791 13 11.4 13H12.6Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.0352 3.00049C21.0352 1.89592 20.1397 1.00049 19.0352 1.00049H5.02344C3.91887 1.00049 3.02344 1.89592 3.02344 3.00049V20.9966C3.02344 22.1012 3.91887 22.9966 5.02344 22.9966H19.0352C20.1397 22.9966 21.0352 22.1012 21.0352 20.9966V3.00049ZM8.88574 11V8.56339C8.88574 6.84348 10.28 5.44922 11.9999 5.44922C13.7198 5.44922 15.1141 6.84348 15.1141 8.56339V11H16C16.5523 11 17 11.4477 17 12V17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17V12C7 11.4477 7.44772 11 8 11H8.88574Z" fill="currentColor"/>
      
    </svg>
  )
}
