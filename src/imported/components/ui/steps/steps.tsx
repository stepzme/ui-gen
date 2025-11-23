import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'

export type StepsColorScheme = 'brand' | 'constant' | 'primary'

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Количество элементов
   */
  count: number
  /**
   * Обработчик клика по шагу
   */
  onClick: (value: number) => void
  /**
   * Начальный индекс (uncontrolled)
   * @default 0
   */
  initialIndex?: number
  /**
   * Активный индекс (controlled)
   */
  activeIndex?: number
  /**
   * Функция для получения aria-label
   */
  getStepAriaLabel?: (stepIndex: number, stepsCount: number) => string
  /**
   * Цветовая схема
   */
  colorScheme?: StepsColorScheme
  /**
   * Вариант
   */
  variant?: string
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const StepsContainer = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  gap: '$x2',
})

const StepsButton = styled('button', {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: 'var(--semantic-divider-thin)',

  variants: {
    active: {
      true: {
        backgroundColor: 'var(--semantic-brand-primary)',
        width: '24px',
        borderRadius: '$x1',
      },
      false: {},
    },
    colorScheme: {
      brand: {
        active: {
          true: {
            backgroundColor: 'var(--semantic-brand-primary)',
          },
        },
      },
      constant: {
        active: {
          true: {
            backgroundColor: 'var(--semantic-constant-primary)',
          },
        },
      },
      primary: {
        active: {
          true: {
            backgroundColor: 'var(--semantic-primary-primary)',
          },
        },
      },
    },
  },

  defaultVariants: {
    active: false,
    colorScheme: 'brand',
  },
})

const defaultGetStepAriaLabel = (stepIndex: number, stepsCount: number) => {
  return `Шаг ${stepIndex + 1} из ${stepsCount}`
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      count,
      onClick,
      initialIndex = 0,
      activeIndex,
      getStepAriaLabel = defaultGetStepAriaLabel,
      colorScheme = 'brand',
      css,
      ...props
    },
    ref
  ) => {
    const [internalIndex, setInternalIndex] = React.useState(initialIndex)
    const isControlled = activeIndex !== undefined
    const currentIndex = isControlled ? activeIndex : internalIndex

    const handleClick = (index: number) => {
      if (!isControlled) {
        setInternalIndex(index)
      }
      onClick(index)
    }

    return (
      <StepsContainer ref={ref} css={css} {...props}>
        {Array.from({ length: count }, (_, index) => (
          <StepsButton
            key={index}
            type="button"
            active={currentIndex === index}
            colorScheme={colorScheme}
            onClick={() => handleClick(index)}
            aria-label={getStepAriaLabel(index, count)}
          />
        ))}
      </StepsContainer>
    )
  }
)

Steps.displayName = 'Steps'

