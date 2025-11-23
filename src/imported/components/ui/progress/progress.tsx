import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export type ColorScheme = 'brand' | 'success' | 'info' | 'warning' | 'critical' | 'neutral' | 'constant'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Значение прогресса (0-100)
   */
  value?: number
  /**
   * Цветовая схема
   * @default 'brand'
   */
  colorScheme?: ColorScheme
  /**
   * Прямоугольная форма (без скругления)
   * @default false
   */
  rect?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
  /**
   * Ref для корневого элемента
   */
  ref?: React.Ref<HTMLDivElement>
  /**
   * ID для тестирования
   */
  dataTestId?: string
}

// Функция для ограничения значения в диапазоне
const clamp = (value: number, min: number = 0, max: number = 100) => {
  return Math.max(min, Math.min(max, value))
}

// Container - контейнер прогресс-бара
const StyledContainer = styled('div', {
  display: 'flex',
  borderRadius: '$x1', // 4px
  minWidth: '140px',
  height: '$x1', // 4px
  overflow: 'hidden',
  backgroundColor: 'var(--semantic-primary-12)',
  
  variants: {
    rect: {
      true: {
        borderRadius: '$x0', // 0px
      },
    },
    colorScheme: {
      brand: {
        backgroundColor: 'var(--semantic-primary-12)',
      },
      success: {
        backgroundColor: 'var(--semantic-success-12)',
      },
      info: {
        backgroundColor: 'var(--semantic-info-12)',
      },
      warning: {
        backgroundColor: 'var(--semantic-warning-12)',
      },
      critical: {
        backgroundColor: 'var(--semantic-critical-12)',
      },
      neutral: {
        backgroundColor: 'var(--semantic-neutral-12)',
      },
      constant: {
        backgroundColor: 'var(--semantic-constant-8)',
      },
    },
  },
  
  defaultVariants: {
    rect: false,
    colorScheme: 'brand',
  },
})

// Bar - заполненная часть прогресс-бара
const StyledBar = styled('span', {
  height: '100%',
  transition: 'width 0.3s ease-in-out',
  backgroundColor: 'var(--color-scheme-brand-primary)',
  
  variants: {
    colorScheme: {
      brand: {
        backgroundColor: 'var(--color-scheme-brand-primary)',
      },
      success: {
        backgroundColor: 'var(--color-scheme-success-primary)',
      },
      info: {
        backgroundColor: 'var(--color-scheme-info-primary)',
      },
      warning: {
        backgroundColor: 'var(--color-scheme-warning-primary)',
      },
      critical: {
        backgroundColor: 'var(--color-scheme-critical-primary)',
      },
      neutral: {
        backgroundColor: 'var(--color-scheme-neutral-primary)',
      },
      constant: {
        backgroundColor: 'var(--color-scheme-constant-primary)',
      },
    },
  },
  
  defaultVariants: {
    colorScheme: 'brand',
  },
})

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      colorScheme = 'brand',
      rect = false,
      css,
      dataTestId,
      className,
      ...props
    },
    ref
  ) => {
    const clampedValue = React.useMemo(() => clamp(value, 0, 100), [value])
    const percentage = Math.floor(clampedValue)
    
    return (
      <StyledContainer
        ref={ref}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${percentage}%`}
        colorScheme={colorScheme}
        rect={rect}
        css={css}
        className={className}
        data-test-id={dataTestId || 'Progress'}
        {...props}
      >
        <StyledBar
          colorScheme={colorScheme}
          style={{ width: `${clampedValue}%` }}
        />
      </StyledContainer>
    )
  }
)

Progress.displayName = 'Progress'

