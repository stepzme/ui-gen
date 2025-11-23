import * as React from 'react'
import { styled, keyframes, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'

export type SkeletonVariant = 'text' | 'circle' | 'rectangle'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Вариант скелетона
   * @default 'rectangle'
   */
  variant?: SkeletonVariant
  /**
   * Ширина
   * @default '100%'
   */
  width?: string | number
  /**
   * Высота
   * @default '20px'
   */
  height?: string | number
  /**
   * Радиус скругления
   */
  borderRadius?: string | number
  /**
   * Включить анимацию пульсации
   * @default true
   */
  active?: boolean
  /**
   * Показать границу
   * @default false
   */
  withBorder?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const pulse = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0.4 },
})

const SkeletonBase = styled(Container, {
  boxSizing: 'border-box',
  backgroundColor: 'var(--semantic-neutral-12)',
  flexShrink: 0,

  variants: {
    active: {
      true: {
        animation: `${pulse} 2000ms linear infinite alternate`,
      },
      false: {},
    },
    withBorder: {
      true: {
        border: '1px dashed var(--semantic-neutral-24)',
      },
      false: {},
    },
    variant: {
      text: {
        borderRadius: '$x1',
      },
      circle: {
        borderRadius: '50%',
      },
      rectangle: {
        borderRadius: '$x1',
      },
    },
  },
})

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangle',
      width = '100%',
      height = '20px',
      borderRadius,
      active = true,
      withBorder = false,
      css,
      ...props
    },
    ref
  ) => {
    const computedBorderRadius = React.useMemo(() => {
      if (borderRadius !== undefined) {
        return typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
      }
      if (variant === 'circle') {
        return '50%'
      }
      return undefined
    }, [borderRadius, variant])

    return (
      <SkeletonBase
        ref={ref}
        variant={variant}
        active={active}
        withBorder={withBorder}
        css={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...(computedBorderRadius && { borderRadius: computedBorderRadius }),
          ...css,
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Skeleton.Cell - вариант с padding
const SkeletonCellContainer = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '100%',

  variants: {
    withPadding: {
      true: {
        padding: 'var(--x-base-300) var(--x-base-500)',
      },
      false: {},
    },
  },
})

export interface SkeletonCellProps extends SkeletonProps {
  /**
   * Добавить padding
   * @default true
   */
  withPadding?: boolean
}

export const SkeletonCell = React.forwardRef<HTMLDivElement, SkeletonCellProps>(
  ({ withPadding = true, ...skeletonProps }, ref) => {
    return (
      <SkeletonCellContainer ref={ref} withPadding={withPadding}>
        <Skeleton {...skeletonProps} />
      </SkeletonCellContainer>
    )
  }
)

SkeletonCell.displayName = 'Skeleton.Cell'

// Присваиваем Cell как статическое свойство
;(Skeleton as any).Cell = SkeletonCell

