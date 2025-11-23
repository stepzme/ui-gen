import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'

export type BadgeTypography = 'bodyS' | 'bodyM' | 'bodyL'
export type BadgeIconPosition = 'left' | 'right'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Контент бейджа
   */
  children: React.ReactNode
  /**
   * Размер типографики
   * @default 'bodyM'
   */
  typography?: BadgeTypography
  /**
   * Положение иконки
   * @default 'left'
   */
  iconPosition?: BadgeIconPosition
  /**
   * Скругление границ
   * @default false
   */
  rounded?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const BadgeContainer = styled(Container, {
  display: 'inline-flex',
  flexDirection: 'row',
  columnGap: '$x1',
  alignItems: 'center',
  ...typographyStyles.bodyS_tight_normal,
  
    variants: {
    typography: {
      bodyS: {
        padding: '$x1 $x2',
        borderRadius: '$x1',
        fontSize: '$bodyS',
      },
      bodyM: {
        padding: '$x2 $x3',
        borderRadius: '$x2',
        fontSize: '$bodyM',
        columnGap: '$x2',
      },
      bodyL: {
        padding: '$x3 $x4',
        borderRadius: '$x2',
        fontSize: '$bodyL',
        columnGap: '$x3',
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
    rounded: {
      true: {
        borderRadius: '$x5',
      },
      false: {},
    },
  },
  
  compoundVariants: [
    {
      rounded: true,
      typography: 'bodyS',
      css: {
        borderRadius: '$x5',
      },
    },
    {
      rounded: true,
      typography: 'bodyM',
      css: {
        borderRadius: '$x5',
      },
    },
    {
      rounded: true,
      typography: 'bodyL',
      css: {
        borderRadius: '$x5',
      },
    },
    {
      iconPosition: 'right',
      typography: 'bodyM',
      css: {
        '& svg': {
          width: '$sizes.x6',
          height: '$sizes.x6',
        },
        '& [data-avatar]': {
          width: '$sizes.x5',
          height: '$sizes.x5',
        },
      },
    },
    {
      iconPosition: 'right',
      typography: 'bodyL',
      css: {
        '& svg': {
          width: '$sizes.x6',
          height: '$sizes.x6',
        },
        '& [data-avatar]': {
          width: '$sizes.x6',
          height: '$sizes.x6',
        },
      },
    },
    {
      iconPosition: 'left',
      typography: 'bodyM',
      css: {
        '& [data-avatar]': {
          width: '$sizes.x5',
          height: '$sizes.x5',
        },
      },
    },
    {
      iconPosition: 'left',
      typography: 'bodyL',
      css: {
        '& [data-avatar]': {
          width: '$sizes.x6',
          height: '$sizes.x6',
        },
      },
    },
  ],
  
    defaultVariants: {
    iconPosition: 'left',
    typography: 'bodyM',
  },
})

const BadgeBase = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      typography = 'bodyM',
      iconPosition = 'left',
      rounded = false,
      css,
      ...props
    },
    ref
  ) => {
    return (
      <BadgeContainer
        ref={ref}
        typography={typography}
        iconPosition={iconPosition}
        rounded={rounded}
        css={css}
        {...props}
      >
        {children}
      </BadgeContainer>
    )
  }
)

BadgeBase.displayName = 'Badge'

// Типы для подкомпонентов
export interface BadgeComponent extends React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>> {
  Container: typeof BadgeContainer
}

// Экспорт Badge с подкомпонентами
export const Badge = BadgeBase as BadgeComponent

// Подкомпоненты (присваиваем после приведения типа)
Badge.Container = BadgeContainer
