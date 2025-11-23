import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Progress, type ColorScheme as ProgressColorScheme } from '@/imported/components/ui/progress'

export type ProgressStepperVariant = 'brand' | 'success' | 'info' | 'warning' | 'critical'
export type ProgressStepperColorScheme = ProgressStepperVariant

export interface ProgressStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Заголовок
   */
  title?: React.ReactNode
  /**
   * Описание
   */
  description?: React.ReactNode
  /**
   * Дополнительный текст
   */
  extraText?: React.ReactNode
  /**
   * Название шагов
   */
  steps?: string[]
  /**
   * Активный шаг
   */
  activeStep?: number
  /**
   * Проценты шага
   */
  percent?: number
  /**
   * Скрыть подпись с указанием шагов
   * @default false
   */
  hideStepLabel?: boolean
  /**
   * Скрыть подпись с указанием процентов
   * @default false
   */
  hidePercentLabel?: boolean
  /**
   * Вариант
   */
  variant?: ProgressStepperVariant
  /**
   * Цветовая схема
   */
  colorScheme?: ProgressStepperColorScheme
  /**
   * Прямоугольная форма прогресса
   * @default false
   */
  rect?: boolean
  /**
   * Пропсы для Progress
   */
  progressProps?: Partial<any>
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const ProgressStepperContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x2',
})

const ProgressStepperHeader = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$x2',
})

const ProgressStepperTitle = styled(Typography, {
  ...typographyStyles.bodyM_tight_medium,
  color: 'var(--semantic-text-primary)',
})

const ProgressStepperStepLabel = styled(Typography, {
  ...typographyStyles.bodyS_tight_normal,
  color: 'var(--semantic-text-secondary)',
})

const ProgressStepperPercentLabel = styled(Typography, {
  ...typographyStyles.bodyS_tight_normal,
  color: 'var(--semantic-text-secondary)',
})

const ProgressStepperDescription = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x1',
})

const ProgressStepperDescriptionText = styled(Typography, {
  ...typographyStyles.bodyS_tight_normal,
  color: 'var(--semantic-text-secondary)',
})

const ProgressStepperExtraText = styled(Typography, {
  ...typographyStyles.bodyS_tight_normal,
  color: 'var(--semantic-text-secondary)',
})

export const ProgressStepper = React.forwardRef<HTMLDivElement, ProgressStepperProps>(
  (
    {
      title,
      description,
      extraText,
      steps,
      activeStep,
      percent,
      hideStepLabel = false,
      hidePercentLabel = false,
      variant,
      colorScheme,
      rect = false,
      progressProps,
      css,
      ...props
    },
    ref
  ) => {
    const stepPercent = React.useMemo(() => {
      if (percent !== undefined) return percent
      if (activeStep !== undefined && steps && steps.length > 0) {
        return (activeStep / steps.length) * 100
      }
      return 0
    }, [percent, activeStep, steps])

    const effectiveColorScheme = (colorScheme || variant || 'brand') as ProgressColorScheme
    const activeStepLabel = steps && activeStep ? steps[activeStep - 1] : null

    return (
      <ProgressStepperContainer ref={ref} css={css} {...props}>
        <ProgressStepperHeader>
          {title && <ProgressStepperTitle>{title}</ProgressStepperTitle>}
          {!hideStepLabel && activeStepLabel && (
            <ProgressStepperStepLabel>{activeStepLabel}</ProgressStepperStepLabel>
          )}
          {!hidePercentLabel && (percent !== undefined || percent === 0) && (
            <ProgressStepperPercentLabel>{percent}%</ProgressStepperPercentLabel>
          )}
        </ProgressStepperHeader>
        <Progress value={stepPercent} colorScheme={effectiveColorScheme} rect={rect} {...progressProps} />
        {(description || extraText) && (
          <ProgressStepperDescription>
            {description && <ProgressStepperDescriptionText>{description}</ProgressStepperDescriptionText>}
            {extraText && <ProgressStepperExtraText>{extraText}</ProgressStepperExtraText>}
          </ProgressStepperDescription>
        )}
      </ProgressStepperContainer>
    )
  }
)

ProgressStepper.displayName = 'ProgressStepper'

