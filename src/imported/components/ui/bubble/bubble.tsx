import * as React from 'react'
import { styled, type CSS, typography as typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'

export type ColorScheme = 'primary' | 'brand' | 'success' | 'info' | 'warning' | 'critical' | 'draft'
export type Typography = 'bodyS' | 'bodyM' | 'bodyL'
export type PinSide = 'left' | 'right'

export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Контент bubble
   */
  children: React.ReactNode
  /**
   * Цветовая схема
   * @default 'brand'
   */
  colorScheme?: ColorScheme
  /**
   * Размер элемента
   * @default 'bodyM'
   */
  typography?: Typography
  /**
   * Определяет сторону пина
   * @default 'left'
   */
  pinSide?: PinSide
  /**
   * ID элемента для авто-тестов
   */
  'data-test-id'?: string
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

// Внутренний контейнер для контента
const BubbleInner = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
})

// Основной контейнер bubble (layout и typography из meta + визуальные стили)
const BubbleContainer = styled('div', {
  // Layout из meta
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  ...typographyStyles.bodyS_tight_normal,
  
  // Визуальные стили из UI
  color: '$colors["bubble-text"]',
  
  variants: {
    // Typography из meta
    typography: {
      bodyS: {
        padding: '$x1 $x2',
        fontSize: '$bodyS',
      },
      bodyM: {
        padding: '$x2 $x3',
        fontSize: '$bodyM',
      },
      bodyL: {
        padding: '$x3 $x4',
        fontSize: '$bodyL',
      },
    },
    // PinSide из meta
    pinSide: {
      left: {},
      right: {},
    },
    // UI variants
    colorScheme: {
      primary: {
        backgroundColor: 'var(--components-bubble-body-primary)',
      },
      brand: {
        backgroundColor: 'var(--components-bubble-body-brand)',
      },
      success: {
        backgroundColor: 'var(--components-bubble-body-success)',
      },
      info: {
        backgroundColor: 'var(--components-bubble-body-info)',
      },
      warning: {
        backgroundColor: 'var(--components-bubble-body-warning)',
      },
      critical: {
        backgroundColor: 'var(--components-bubble-body-critical)',
      },
      draft: {
        backgroundColor: 'var(--components-bubble-body-neutral)',
      },
    },
  },
  
  compoundVariants: [
    // Комбинации typography + pinSide для borderRadius из meta
    {
      typography: 'bodyS',
      pinSide: 'left',
      css: {
        borderRadius: '0 $x1 $x1 $x1',
      },
    },
    {
      typography: 'bodyM',
      pinSide: 'left',
      css: {
        borderRadius: '0 $x2 $x2 $x2',
      },
    },
    {
      typography: 'bodyL',
      pinSide: 'left',
      css: {
        borderRadius: '0 $x2 $x2 $x2',
      },
    },
    {
      typography: 'bodyS',
      pinSide: 'right',
      css: {
        borderRadius: '$x1 0 $x1 $x1',
      },
    },
    {
      typography: 'bodyM',
      pinSide: 'right',
      css: {
        borderRadius: '$x2 0 $x2 $x2',
      },
    },
    {
      typography: 'bodyL',
      pinSide: 'right',
      css: {
        borderRadius: '$x2 0 $x2 $x2',
      },
    },
  ],
  
  defaultVariants: {
    typography: 'bodyM',
    pinSide: 'left',
    colorScheme: 'brand',
  },
})

export const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  (
    {
      children,
      colorScheme = 'brand',
      typography = 'bodyM',
      pinSide = 'left',
      'data-test-id': dataTestId,
      css,
      className,
      ...props
    },
    ref
  ) => {
    // Генерируем data-test-id если не передан
    const testId = dataTestId || 'Bubble'
    
    return (
      <BubbleContainer
        ref={ref}
        className={className}
        colorScheme={colorScheme}
        typography={typography}
        pinSide={pinSide}
        data-test-id={testId}
        css={css}
        {...props}
      >
        <BubbleInner>{children}</BubbleInner>
      </BubbleContainer>
    )
  }
)

Bubble.displayName = 'Bubble'

export { BubbleContainer, BubbleInner }

