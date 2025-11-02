import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function CardZigzagArrow({ className, ...props }: IconProps) {
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
      
      <path fillRule="evenodd" clipRule="evenodd" d="M3 4C1.89543 4 1 4.89543 1 6V18.041C1 19.1456 1.89543 20.041 3 20.041H20.9999C22.1045 20.041 22.9999 19.1456 22.9999 18.041V6C22.9999 4.89543 22.1045 4 20.9999 4H3ZM13.8845 9.96461C13.3868 9.46689 13.7281 8.61535 14.4318 8.59913L17.7291 8.52317C18.1853 8.51266 18.5578 8.88521 18.5473 9.34138L18.4714 12.6387C18.4551 13.3424 17.6036 13.6837 17.1059 13.1859L16.2527 12.3328L12.9653 15.6202C12.8091 15.7764 12.5558 15.7764 12.3996 15.6202L9.67535 12.8958L7.00007 15.5709C6.84386 15.7271 6.59059 15.7271 6.43439 15.5708L5.5859 14.7223C5.42969 14.5661 5.4297 14.3128 5.58592 14.1566L9.39261 10.3502C9.54882 10.194 9.80209 10.194 9.95829 10.3502L12.6825 13.0746L14.8385 10.9185L13.8845 9.96461Z" fill="currentColor"/>
      
    </svg>
  )
}
