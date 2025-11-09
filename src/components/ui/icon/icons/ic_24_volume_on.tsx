import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function VolumeOn({ className, ...props }: IconProps) {
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
      
      <path d="M10.999 22L5.59863 16H1.99902C1.44674 16 0.999023 15.5523 0.999023 15V9C0.999023 8.44772 1.44674 8 1.99902 8H5.59863L10.999 2V22Z" fill="currentColor"/>
      <path d="M12.999 2C17.5753 3.01398 20.999 7.10564 20.999 12.001C20.9988 16.896 17.575 20.986 12.999 22V19.707C16.3384 18.7443 18.782 15.6602 18.7822 12.001C18.7822 8.34141 16.3387 5.25565 12.999 4.29297V2Z" fill="currentColor"/>
      <path d="M12.999 6.75684C15.0319 7.6221 16.4578 9.64329 16.458 11.998C16.458 14.3528 15.0318 16.3729 12.999 17.2383V6.75684Z" fill="currentColor"/>
      
    </svg>
  )
}
