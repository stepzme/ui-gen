import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Icon } from '@/imported/components/ui/icon'

export type StatusColorScheme = 'info' | 'neutral' | 'success' | 'error' | 'warning' | 'brand'
export type StatusTypography = 'bodyS' | 'bodyM'
export type StatusIconPosition = 'left' | 'right'

export interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Текст статуса
   */
  children: React.ReactNode
  /**
   * Цветовая схема
   * @default 'info'
   */
  colorScheme?: StatusColorScheme
  /**
   * Цветовая схема (deprecated, используйте colorScheme)
   * @deprecated
   */
  variant?: StatusColorScheme
  /**
   * Размер через типографику
   * @default 'bodyS'
   */
  typography?: StatusTypography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: StatusTypography
  /**
   * Положение иконки
   * @default 'left'
   */
  iconPosition?: StatusIconPosition
  /**
   * Отображать иконку
   * @default true
   */
  hasIcon?: boolean
  /**
   * Кастомная иконка
   */
  icon?: React.ReactElement
  /**
   * Доп. описание под children
   */
  description?: string
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

// Иконки по умолчанию для разных colorScheme
const defaultIcons: Record<StatusColorScheme, string> = {
  brand: 'circle_checkmark',
  info: 'circle_info',
  success: 'circle_checkmark',
  error: 'circle_exclamation',
  warning: 'circle_exclamation',
  neutral: 'clock_arrows', // Используем clock_arrows вместо clocks
}

const StatusContent = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
})

const StatusContainer = styled(Container, {
  display: 'inline-flex',
  alignItems: 'flex-start',
  color: 'var(--semantic-text-secondary)',
  
  variants: {
    colorScheme: {
      brand: {
        color: 'var(--semantic-text-brand)',
        '& svg': {
          fill: 'var(--semantic-brand-primary)',
        },
      },
      info: {
        color: 'var(--semantic-text-info)',
        '& svg': {
          fill: 'var(--semantic-info-primary)',
        },
      },
      success: {
        color: 'var(--semantic-text-success)',
        '& svg': {
          fill: 'var(--semantic-success-primary)',
        },
      },
      error: {
        color: 'var(--semantic-text-critical)',
        '& svg': {
          fill: 'var(--semantic-critical-primary)',
        },
      },
      warning: {
        color: 'var(--semantic-text-warning)',
        '& svg': {
          fill: 'var(--semantic-warning-primary)',
        },
      },
      neutral: {
        color: 'var(--semantic-text-neutral)',
        '& svg': {
          fill: 'var(--semantic-neutral-primary)',
        },
      },
    },
    iconPosition: {
      left: {
        flexDirection: 'row',
      },
      right: {
        flexDirection: 'row-reverse',
      },
    },
    typography: {
      bodyS: {
        columnGap: '$x2',
        ...typographyStyles.bodyS_tight_normal,
        '& svg': {
          fontSize: '$x4',
        },
        [`& ${StatusContent}`]: {
          gap: '$x1',
        },
      },
      bodyM: {
        columnGap: '$x3',
        ...typographyStyles.bodyM_tight_normal,
        '& svg': {
          fontSize: '$x6',
        },
        [`& ${StatusContent}`]: {
          gap: '$x2',
        },
      },
    },
  },
  
  defaultVariants: {
    colorScheme: 'info',
    iconPosition: 'left',
    typography: 'bodyS',
  },
})

const StatusDescription = styled('div', {
  color: 'var(--semantic-text-secondary)',
  ...typographyStyles.bodyS_tight_normal,
})

export const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  (
    {
      children,
      icon,
      hasIcon = true,
      description,
      colorScheme,
      variant,
      typography,
      size,
      iconPosition = 'left',
      css,
      ...props
    },
    ref
  ) => {
    const effectiveColorScheme = colorScheme || variant || 'info'
    const effectiveTypography = typography || size || 'bodyS'
    
    const defaultIconName = defaultIcons[effectiveColorScheme]
    const iconElement = icon || (hasIcon && defaultIconName ? (
      <Icon variant={defaultIconName} />
    ) : null)
    
    return (
      <StatusContainer
        ref={ref}
        colorScheme={effectiveColorScheme}
        typography={effectiveTypography}
        iconPosition={iconPosition}
        css={css}
        {...props}
      >
        {iconElement}
        <StatusContent>
          {children}
          {description && (
            <StatusDescription>{description}</StatusDescription>
          )}
        </StatusContent>
      </StatusContainer>
    )
  }
)

Status.displayName = 'Status'

