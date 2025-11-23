import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Button } from '@/imported/components/ui/button'
import { Typography } from '@/imported/components/meta/typography'

export type CounterVariant = 'transparent' | 'filled' | 'outlined' | 'tonned'
export type CounterColor = 'brand' | 'success' | 'info' | 'warning' | 'critical' | 'draft' | 'constant' | 'primary'
export type CounterTypography = 'bodyS' | 'bodyM' | 'bodyL'

export interface CounterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Текущее значение счетчика
   */
  value: number
  /**
   * Обработчик изменения значения
   */
  onChange?: (value: number) => void
  /**
   * Размер счетчика (deprecated, используйте typography)
   * @default 'bodyM'
   */
  size?: CounterTypography
  /**
   * Размер типографики
   * @default 'bodyM'
   */
  typography?: CounterTypography
  /**
   * Тип кнопок
   * @default 'filled'
   */
  variant?: CounterVariant
  /**
   * Цвет кнопок
   */
  color?: CounterColor
  /**
   * Скругление кнопок
   * @default false
   */
  rounded?: boolean
  /**
   * Отключен ли счетчик
   * @default false
   */
  disabled?: boolean
  /**
   * Есть ли ошибка
   * @default false
   */
  hasError?: boolean
  /**
   * Минимальное значение
   */
  min?: number
  /**
   * Максимальное значение
   */
  max?: number
  /**
   * Шаг изменения
   * @default 1
   */
  step?: number
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
  /**
   * ID для тестирования
   */
  dataTestId?: string
}

const CounterContainer = styled(Container, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--x-base-200)',
  boxSizing: 'border-box',
})

const CounterValue = styled(Typography, {
  minWidth: '2ch',
  textAlign: 'center',
  color: 'var(--colors-text-primary)',
  userSelect: 'none',
  
  variants: {
    typography: {
      bodyS: {
        ...typographyStyles.bodyS_tight_medium,
      },
      bodyM: {
        ...typographyStyles.bodyM_tight_medium,
      },
      bodyL: {
        ...typographyStyles.bodyL_tight_medium,
      },
    },
    disabled: {
      true: {
        color: 'var(--colors-text-secondary)',
      },
    },
    error: {
      true: {
        color: 'var(--semantic-text-critical)',
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
  },
})

export const Counter = React.forwardRef<HTMLDivElement, CounterProps>(
  (
    {
      value,
      onChange,
      size,
      typography,
      variant = 'filled',
      color,
      rounded = false,
      disabled = false,
      hasError = false,
      min,
      max,
      step = 1,
      css,
      dataTestId,
      ...props
    },
    ref
  ) => {
    // Используем typography || size (как в оригинале)
    const effectiveTypography = typography || size || 'bodyM'
    
    // Вычисляем размер иконки на основе typography
    const getIconSize = () => {
      if (effectiveTypography === 'bodyS') return '16px'
      if (effectiveTypography === 'bodyL') return '24px'
      return '20px'
    }

    const handleDecrement = () => {
      if (disabled) return
      const newValue = value - step
      if (min !== undefined && newValue < min) return
      onChange?.(newValue)
    }

    const handleIncrement = () => {
      if (disabled) return
      const newValue = value + step
      if (max !== undefined && newValue > max) return
      onChange?.(newValue)
    }

    const isDecrementDisabled = disabled || (min !== undefined && value <= min)
    const isIncrementDisabled = disabled || (max !== undefined && value >= max)

    return (
      <CounterContainer
        ref={ref}
        css={css}
        data-test-id={dataTestId}
        {...props}
      >
        <Button
          variant={variant}
          rounded={rounded}
          disabled={isDecrementDisabled}
          colorScheme={color}
          typography={effectiveTypography}
          paddingSize="tiny"
          onClick={handleDecrement}
          aria-label="Уменьшить"
          data-test-id={dataTestId ? `${dataTestId}-decrement` : undefined}
        >
          <span style={{ fontSize: getIconSize(), lineHeight: 1 }}>−</span>
        </Button>
        {typeof value === 'number' && (
          <CounterValue
            as="span"
            typography={effectiveTypography}
            disabled={disabled}
            error={hasError}
            data-test-id={dataTestId ? `${dataTestId}-value` : undefined}
          >
            {value}
          </CounterValue>
        )}
        <Button
          variant={variant}
          rounded={rounded}
          disabled={isIncrementDisabled}
          colorScheme={color}
          typography={effectiveTypography}
          paddingSize="tiny"
          onClick={handleIncrement}
          aria-label="Увеличить"
          data-test-id={dataTestId ? `${dataTestId}-increment` : undefined}
        >
          <span style={{ fontSize: getIconSize(), lineHeight: 1 }}>+</span>
        </Button>
      </CounterContainer>
    )
  }
)

Counter.displayName = 'Counter'

