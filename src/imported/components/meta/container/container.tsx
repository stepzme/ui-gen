import * as React from 'react'
import { styled } from '@/imported/styles/stitches.config'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const StyledContainer = styled('div', {
  speak: 'normal',
})

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <StyledContainer
        ref={ref}
        className={className}
        {...props}
      />
    )
  }
)

Container.displayName = 'Container'
