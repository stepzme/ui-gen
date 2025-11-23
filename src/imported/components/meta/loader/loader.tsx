import * as React from 'react'
import { styled, keyframes } from '@/imported/styles/stitches.config'

export type Size = 'small' | 'extraSmall' | 'medium' | 'extraMedium' | 'large' | 'extraLarge'

export interface LoaderContainerProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Размер элемента
   * @default 'medium'
   */
  size?: Size
  /**
   * Граница
   * @default false
   */
  border?: boolean
}

export interface LoaderLineProps extends React.SVGProps<SVGCircleElement> {
  /**
   * Толщина линии
   */
  strokeWidth?: number
}

export interface LoaderCircleBackingProps extends React.SVGProps<SVGCircleElement> {
  /**
   * Толщина линии
   */
  strokeWidth?: number
}

// Анимация вращения SVG
const rotateAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(270deg)' },
})

// Анимация для Line (strokeDashoffset и transform)
const lineAnimation = keyframes({
  '0%': { strokeDashoffset: '187' },
  '50%': { strokeDashoffset: '46.75', transform: 'rotate(135deg)' },
  '100%': { strokeDashoffset: '187', transform: 'rotate(450deg)' },
})

// Line - анимированный круг
const StyledLine = styled('circle', {
  strokeDasharray: '187',
  strokeDashoffset: '0',
  transformOrigin: 'center',
  animation: `${lineAnimation} 1.4s ease-in-out infinite`,
})

// CircleBacking - фон круг
const StyledCircleBacking = styled('circle', {
  fill: 'none',
  strokeLinecap: 'round',
})

// Container - основной SVG контейнер
const StyledContainer = styled('svg', {
  display: 'block',
  animation: `${rotateAnimation} 1.4s linear infinite`,
  
  variants: {
    size: {
      small: {
        width: '$x4',
        height: '$x4',
      },
      extraSmall: {
        width: '$x5',
        height: '$x5',
      },
      medium: {
        width: '$x6',
        height: '$x6',
      },
      extraMedium: {
        width: '$x10',
        height: '$x10',
      },
      large: {
        width: '$x12',
        height: '$x12',
      },
      extraLarge: {
        width: '$x16',
        height: '$x16',
      },
    },
    border: {
      true: {},
    },
  },
  
  defaultVariants: {
    size: 'medium',
  },
})

export const LoaderContainer = React.forwardRef<SVGSVGElement, LoaderContainerProps>(
  ({ className, size, border, viewBox, children, ...props }, ref) => {
    return (
      <StyledContainer
        ref={ref}
        className={className}
        size={size}
        border={border}
        viewBox={viewBox ?? '0 0 66 66'}
        fill="none"
        {...props}
      >
        {children}
      </StyledContainer>
    )
  }
)

LoaderContainer.displayName = 'Loader.Container'

export const LoaderLine = React.forwardRef<SVGCircleElement, LoaderLineProps>(
  ({ className, strokeWidth, ...props }, ref) => {
    return (
      <StyledLine
        ref={ref}
        className={className}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="27"
        {...props}
      />
    )
  }
)

LoaderLine.displayName = 'Loader.Line'

export const LoaderCircleBacking = React.forwardRef<SVGCircleElement, LoaderCircleBackingProps>(
  ({ strokeWidth, ...props }, ref) => {
    return (
      <StyledCircleBacking
        ref={ref}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="27"
        {...props}
      />
    )
  }
)

LoaderCircleBacking.displayName = 'Loader.CircleBacking'

export const Loader = {
  Container: LoaderContainer,
  Line: LoaderLine,
  CircleBacking: LoaderCircleBacking,
}

Loader.Container.displayName = 'Loader.Container'
Loader.Line.displayName = 'Loader.Line'
Loader.CircleBacking.displayName = 'Loader.CircleBacking'
