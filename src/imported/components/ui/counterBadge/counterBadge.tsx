import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'

export type CounterBadgeTypography = 'bodyS' | 'bodyM' | 'bodyL'
export type CounterBadgeSize = 'small' | 'medium' | 'large'

export interface CounterBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Значение счетчика
   */
  value: string | number
  /**
   * Размер типографики
   * @default 'bodyM'
   */
  typography?: CounterBadgeTypography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: CounterBadgeSize
  /**
   * Горизонтальные отступы (автоматически включается если value > 9)
   * @default false
   */
  hPaddings?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const CounterBadgeContainer = styled(Container, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$x10', // infinite
  color: 'var(--semantic-brand-text-primary)',
  backgroundColor: 'var(--semantic-brand-primary)',

  variants: {
    typography: {
      bodyS: {
        width: '$x4',
        height: '$x4',
        ...typographyStyles.bodyS_tight_medium,
      },
      bodyM: {
        width: '$x5',
        height: '$x5',
        ...typographyStyles.bodyM_tight_medium,
      },
      bodyL: {
        width: '$x6',
        height: '$x6',
        ...typographyStyles.bodyL_tight_medium,
      },
    },
    hPaddings: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    {
      typography: 'bodyS',
      hPaddings: true,
      css: {
        padding: `0 $x1`,
        width: 'auto',
        minWidth: '$x4',
      },
    },
    {
      typography: 'bodyM',
      hPaddings: true,
      css: {
        padding: `0 $x2`,
        width: 'auto',
        minWidth: '$x5',
      },
    },
    {
      typography: 'bodyL',
      hPaddings: true,
      css: {
        padding: `0 $x3`,
        width: 'auto',
        minWidth: '$x6',
      },
    },
  ],

  defaultVariants: {
    typography: 'bodyM',
    hPaddings: false,
  },
})

// Функция для маппинга size -> typography (deprecated)
const sizeToTypography = (size?: CounterBadgeSize): CounterBadgeTypography => {
  switch (size) {
    case 'small':
      return 'bodyS'
    case 'medium':
      return 'bodyM'
    case 'large':
      return 'bodyL'
    default:
      return 'bodyM'
  }
}

export const CounterBadge = React.forwardRef<HTMLDivElement, CounterBadgeProps>(
  ({ value, typography, size, hPaddings, css, ...props }, ref) => {
    const effectiveTypography = typography || sizeToTypography(size) || 'bodyM'
    const numericValue = typeof value === 'string' ? Number.parseFloat(value) : value
    const shouldUsePaddings = hPaddings !== undefined ? hPaddings : numericValue > 9

    return (
      <CounterBadgeContainer
        ref={ref}
        typography={effectiveTypography}
        hPaddings={shouldUsePaddings}
        css={css}
        {...props}
      >
        {value}
      </CounterBadgeContainer>
    )
  }
)

CounterBadge.displayName = 'CounterBadge'

