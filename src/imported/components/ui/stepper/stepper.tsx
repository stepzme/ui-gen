import * as React from 'react'
import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Link } from '@/imported/components/ui/link'
import { Icon } from '@/imported/components/ui/icon'

export type StepperDirection = 'horizontal' | 'vertical'
export type StepperItemState = 'completed' | 'active' | 'pending' | 'error'

export interface StepperItemLink {
  text: string
  href: string
}

export interface StepperItem {
  key: number
  label: string
  description?: string
  link?: StepperItemLink
  icon?: React.ReactNode
  state?: StepperItemState
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Массив элементов
   */
  items: StepperItem[]
  /**
   * Индекс активного шага
   */
  activeStep: number
  /**
   * Индекс выбранного шага
   */
  selectedStep?: number
  /**
   * Обработчик клика по шагу
   */
  onStepClick?: (stepIndex: number) => void
  /**
   * Направление
   * @default 'horizontal'
   */
  direction?: StepperDirection
  /**
   * Ширина контента
   * @default 'auto'
   */
  width?: string
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const StepperContainer = styled(Container, {
  display: 'flex',
  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '$x4',
      },
      vertical: {
        flexDirection: 'column',
        gap: '$x3',
      },
    },
  },

  defaultVariants: {
    direction: 'horizontal',
  },
})

const StepperItemContainer = styled(Container, {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '$x3',
  position: 'relative',
  flex: 1,

  variants: {
    direction: {
      horizontal: {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
      vertical: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        textAlign: 'left',
      },
    },
  },
})

const StepperConnector = styled('div', {
  position: 'absolute',
  backgroundColor: 'var(--semantic-divider-thin)',

  variants: {
    direction: {
      horizontal: {
        top: '12px',
        left: '50%',
        width: '100%',
        height: '2px',
        transform: 'translateX(50%)',
      },
      vertical: {
        left: '12px',
        top: '24px',
        width: '2px',
        height: '100%',
      },
    },
    active: {
      true: {
        backgroundColor: 'var(--semantic-brand-primary)',
      },
      false: {},
    },
  },
})

const StepperCircle = styled(Container, {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  border: '2px solid var(--semantic-divider-thin)',
  backgroundColor: 'var(--semantic-elevation-0-body)',
  color: 'var(--semantic-text-secondary)',
  ...typographyStyles.bodyS_tight_medium,

  variants: {
    state: {
      completed: {
        backgroundColor: 'var(--semantic-brand-primary)',
        borderColor: 'var(--semantic-brand-primary)',
        color: 'var(--semantic-brand-text-primary)',
      },
      active: {
        borderColor: 'var(--semantic-brand-primary)',
        color: 'var(--semantic-brand-primary)',
      },
      pending: {
        backgroundColor: 'var(--semantic-elevation-0-body)',
        borderColor: 'var(--semantic-divider-thin)',
        color: 'var(--semantic-text-secondary)',
      },
      error: {
        borderColor: 'var(--semantic-critical-primary)',
        color: 'var(--semantic-critical-primary)',
      },
    },
  },

  defaultVariants: {
    state: 'pending',
  },
})

const StepperContent = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x1',
  flex: 1,
  minWidth: 0,
})

const StepperLabel = styled(Typography, {
  ...typographyStyles.bodyM_tight_medium,
  color: 'var(--semantic-text-primary)',
})

const StepperDescription = styled(Typography, {
  ...typographyStyles.bodyS_tight_normal,
  color: 'var(--semantic-text-secondary)',
})

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    { items, activeStep, selectedStep, onStepClick, direction = 'horizontal', width = 'auto', css, ...props },
    ref
  ) => {
    const getItemState = (index: number): StepperItemState => {
      if (index < activeStep) return 'completed'
      if (index === activeStep) return 'active'
      return 'pending'
    }

    return (
      <StepperContainer ref={ref} direction={direction} css={{ width, ...css }} {...props}>
        {items.map((item, index) => {
          const state = item.state || getItemState(index)
          const isLast = index === items.length - 1
          const isClickable = !!onStepClick

          return (
            <React.Fragment key={item.key}>
              <StepperItemContainer
                direction={direction}
                onClick={isClickable ? () => onStepClick?.(index) : undefined}
                css={isClickable ? { cursor: 'pointer' } : undefined}
              >
                <StepperCircle state={state}>
                  {state === 'completed' ? (
                    <Icon variant="circle_checkmark" />
                  ) : item.icon ? (
                    item.icon
                  ) : (
                    index + 1
                  )}
                </StepperCircle>
                <StepperContent>
                  <StepperLabel>{item.label}</StepperLabel>
                  {item.description && <StepperDescription>{item.description}</StepperDescription>}
                  {item.link && (
                    <Link href={item.link.href} colorScheme="brand" typography="bodyS">
                      {item.link.text}
                    </Link>
                  )}
                </StepperContent>
              </StepperItemContainer>
              {!isLast && (
                <StepperConnector
                  direction={direction}
                  active={index < activeStep}
                  css={
                    direction === 'horizontal'
                      ? { left: '50%', right: '-50%' }
                      : { top: '24px', bottom: '-24px' }
                  }
                />
              )}
            </React.Fragment>
          )
        })}
      </StepperContainer>
    )
  }
)

Stepper.displayName = 'Stepper'

