import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'

export type CardVariant = 'outlined' | 'filled' | 'tonned'
export type CardPaddingSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge'
export type CardGapSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Вариант карточки
   * @default 'outlined'
   */
  variant?: CardVariant
  /**
   * Размер отступов
   * @default 'medium'
   */
  paddingSize?: CardPaddingSize
  /**
   * Размер промежутков между элементами
   * @default 'medium'
   */
  gapSize?: CardGapSize
  /**
   * Показать границу
   * @default false
   */
  hasBorder?: boolean
  /**
   * Кликабельная карточка
   * @default false
   */
  clickable?: boolean
  /**
   * Горизонтальная ориентация
   * @default false
   */
  isHorizontal?: boolean
  /**
   * Полная ширина
   * @default false
   */
  fullWidth?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const paddingMap: Record<CardPaddingSize, string> = {
  tiny: 'var(--x-base-200)',
  small: 'var(--x-base-300)',
  medium: 'var(--x-base-400)',
  large: 'var(--x-base-500)',
  huge: 'var(--x-base-600)',
}

const gapMap: Record<CardGapSize, string> = {
  tiny: 'var(--x-base-200)',
  small: 'var(--x-base-300)',
  medium: 'var(--x-base-400)',
  large: 'var(--x-base-500)',
  huge: 'var(--x-base-600)',
}

const CardContainer = styled(Container, {
  display: 'inline-flex',
  boxSizing: 'border-box',
  borderRadius: '$x2',
  transition: 'all 0.2s ease-in-out',
  
  variants: {
    variant: {
      outlined: {
        backgroundColor: 'var(--colors-background1-primary)',
        border: '1px solid var(--colors-elevation0-borderNormal)',
      },
      filled: {
        backgroundColor: 'var(--semantic-neutral-4)',
        border: '1px solid transparent',
      },
      tonned: {
        backgroundColor: 'var(--semantic-neutral-8)',
        border: '1px solid transparent',
      },
    },
    paddingSize: {
      tiny: { padding: paddingMap.tiny },
      small: { padding: paddingMap.small },
      medium: { padding: paddingMap.medium },
      large: { padding: paddingMap.large },
      huge: { padding: paddingMap.huge },
    },
    gapSize: {
      tiny: { gap: gapMap.tiny },
      small: { gap: gapMap.small },
      medium: { gap: gapMap.medium },
      large: { gap: gapMap.large },
      huge: { gap: gapMap.huge },
    },
    hasBorder: {
      true: {},
      false: {},
    },
    clickable: {
      true: {
        cursor: 'pointer',
      },
      false: {},
    },
    isHorizontal: {
      true: {
        flexDirection: 'row',
      },
      false: {
        flexDirection: 'column',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {},
    },
  },
  
  compoundVariants: [
    {
      variant: 'outlined',
      clickable: true,
      hasBorder: true,
      css: {
        '@media (hover: hover)': {
          '&:hover': {
            backgroundColor: 'var(--colors-background0-primary)',
            borderColor: 'var(--semantic-brand-24)',
          },
        },
        '&:active': {
          backgroundColor: 'var(--colors-background0-primary)',
          borderColor: 'var(--semantic-brand-32)',
        },
      },
    },
  ],
  
  defaultVariants: {
    variant: 'outlined',
    paddingSize: 'medium',
    gapSize: 'medium',
    hasBorder: false,
    clickable: false,
    isHorizontal: false,
    fullWidth: false,
  },
})

const CardContent = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
})

const CardRow = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

const CardIconContainer = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

const CardBase = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'outlined',
      paddingSize = 'medium',
      gapSize = 'medium',
      hasBorder = false,
      clickable = false,
      isHorizontal = false,
      fullWidth = false,
      css,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <CardContainer
        ref={ref}
        variant={variant}
        paddingSize={paddingSize}
        gapSize={gapSize}
        hasBorder={hasBorder}
        clickable={clickable}
        isHorizontal={isHorizontal}
        fullWidth={fullWidth}
        css={css}
        {...props}
      >
        {children}
      </CardContainer>
    )
  }
)

CardBase.displayName = 'Card'

// Типы для подкомпонентов
export interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Content: typeof CardContent
  Row: typeof CardRow
  IconContainer: typeof CardIconContainer
}

// Экспорт Card с подкомпонентами
export const Card = CardBase as CardComponent

// Подкомпоненты (присваиваем после приведения типа)
Card.Content = CardContent
Card.Row = CardRow
Card.IconContainer = CardIconContainer

