import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function VtbSign({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M18.529 16C18.7996 16 18.9921 16.263 18.9103 16.5209L17.8957 19.7209C17.843 19.8871 17.6887 20 17.5144 20H1.54328C1.27366 20 1.08126 19.7387 1.16132 19.4812L2.15645 16.2812C2.20846 16.114 2.36325 16 2.5384 16H18.529ZM20.4314 10C20.702 10 20.8945 10.263 20.8127 10.5209L19.7981 13.7209C19.7454 13.8871 19.5911 14 19.4168 14H3.4245C3.15395 14 2.96144 13.737 3.04321 13.4791L4.05784 10.2791C4.11054 10.1129 4.2648 10 4.43914 10H20.4314ZM22.3339 4C22.6044 4 22.7969 4.263 22.7152 4.5209L21.7005 7.7209C21.6478 7.88708 21.4936 8 21.3192 8H5.32694C5.05639 8 4.86387 7.737 4.94565 7.4791L5.96028 4.2791C6.01297 4.11292 6.16723 4 6.34157 4H22.3339Z" fill="currentColor"/>
      
    </svg>
  )
}
