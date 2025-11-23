import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Divider } from '@/imported/components/ui/divider'
import { SummaryItem } from '@/imported/components/ui/summaryItem'

export type SummaryDirection = 'horizontal' | 'vertical'
export type SummaryAlign = 'left' | 'right' | 'center' | 'space-around' | 'space-between'
export type SummaryTextSize = 'medium' | 'regular'
export type SummaryColorScheme = 'neutral' | 'constant'

export interface SummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Элементы SummaryItem
   */
  children: React.ReactElement[]
  /**
   * Направление контента
   * @default 'vertical'
   */
  direction?: SummaryDirection
  /**
   * Выравнивание
   */
  align?: SummaryAlign
  /**
   * Размер текста заголовка
   */
  textSize?: SummaryTextSize
  /**
   * Положение подзаголовка снизу
   * @default false
   */
  bottomSubtitle?: boolean
  /**
   * Контент внизу
   */
  footerContent?: React.ReactNode
  /**
   * Цветовая схема
   */
  colorScheme?: SummaryColorScheme
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const SummaryContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  rowGap: '$x4',
  columnGap: '$x3',

  variants: {
    colorScheme: {
      neutral: {
        borderRadius: '$x4',
        padding: `$x5 $x4`,
        backgroundColor: 'var(--semantic-primary-4)',
      },
      constant: {
        borderRadius: '$x4',
        padding: `$x5 $x4`,
        backgroundColor: 'var(--semantic-constant-4)',
      },
    },
    hasColor: {
      true: {
        borderRadius: '$x4',
        padding: `$x5 $x4`,
      },
      false: {},
    },
  },

  defaultVariants: {
    hasColor: false,
  },
})

const SummaryItems = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x4',
})

const SummaryFooter = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x4',
})

const SummaryFooterContent = styled(Container, {
  display: 'flex',
  variants: {
    align: {
      left: { justifyContent: 'flex-start' },
      right: { justifyContent: 'flex-end' },
      center: { justifyContent: 'center' },
      'space-between': { justifyContent: 'space-between' },
      'space-around': { justifyContent: 'space-around' },
    },
  },
})

export const Summary = React.forwardRef<HTMLDivElement, SummaryProps>(
  (
    {
      children,
      direction = 'vertical',
      align,
      textSize,
      bottomSubtitle,
      footerContent,
      colorScheme,
      css,
      ...props
    },
    ref
  ) => {
    const clonedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child
      }

      return React.cloneElement(child, {
        ...child.props,
        direction: direction || child.props.direction,
        align: align || child.props.align,
        textSize: textSize || child.props.textSize,
        bottomSubtitle: bottomSubtitle !== undefined ? bottomSubtitle : child.props.bottomSubtitle,
        hasDivider: child.props.hasDivider,
      } as any)
    })

    return (
      <SummaryContainer
        ref={ref}
        hasColor={!!colorScheme}
        colorScheme={colorScheme}
        css={css}
        {...props}
      >
        <SummaryItems>{clonedChildren}</SummaryItems>
        {footerContent && (
          <SummaryFooter>
            <Divider />
            <SummaryFooterContent align={align}>{footerContent}</SummaryFooterContent>
          </SummaryFooter>
        )}
      </SummaryContainer>
    )
  }
)

Summary.displayName = 'Summary'

