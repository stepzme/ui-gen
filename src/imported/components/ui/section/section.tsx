import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export type SectionGap = 'tiny' | 'small' | 'medium' | 'large' | 'huge'

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое раздела; предполагается использование `Row` как непосредственных потомков `Section`
   */
  children: React.ReactNode
  /**
   * Отображение содержимого в две колонки
   * @default false
   */
  col?: boolean
  /**
   * Предустановленные расстояния между строками
   */
  gap?: SectionGap
  /**
   * Переопределение расстояния между строками; любое валидное значение CSS
   */
  gapOverride?: string
  /**
   * Переопределение расстояния между колонками; любое валидное значение CSS
   */
  columnGapOverride?: string
  /**
   * Убрать внешние отступы у Row
   * @default false
   */
  noRowOuterPadding?: boolean
  /**
   * Вертикальные отступы
   */
  vPadding?: string
  /**
   * Горизонтальные отступы
   */
  hPadding?: string
  /**
   * HTML тег
   */
  as?: keyof JSX.IntrinsicElements
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const SectionContainer = styled('div', {
  display: 'grid',
  columnGap: '$x10',
  
  variants: {
    noRowOuterPadding: {
      true: {
        '& > *:first-child': {
          paddingTop: '$x0',
        },
        '& > *:last-child': {
          paddingBottom: '$x0',
        },
      },
    },
    gap: {
      tiny: {
        rowGap: '$x2',
      },
      small: {
        rowGap: '$x3',
      },
      medium: {
        rowGap: '$x4',
      },
      large: {
        rowGap: '$x5',
      },
      huge: {
        rowGap: '$x6',
      },
    },
    col: {
      true: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  },
  compoundVariants: [
    {
      col: true,
      noRowOuterPadding: true,
      css: {
        '& > *:nth-child(2)': {
          paddingTop: '$x0',
        },
        '& > *:nth-last-child(2):nth-child(odd)': {
          paddingBottom: '$x0',
        },
        '& > *:nth-child(odd)': {
          paddingRight: '$x0',
        },
        '& > *:nth-child(even)': {
          paddingLeft: '$x0',
        },
      },
    },
  ],
})

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      children,
      col = false,
      gap,
      gapOverride,
      columnGapOverride,
      noRowOuterPadding = false,
      vPadding,
      hPadding,
      as,
      css,
      ...props
    },
    ref
  ) => {
    return (
      <SectionContainer
        ref={ref}
        as={as}
        col={col}
        gap={gap}
        noRowOuterPadding={noRowOuterPadding}
        css={{
          ...(gapOverride && { gap: gapOverride }),
          ...(columnGapOverride && { columnGap: columnGapOverride }),
          ...(vPadding && { paddingTop: vPadding, paddingBottom: vPadding }),
          ...(hPadding && { paddingLeft: hPadding, paddingRight: hPadding }),
          ...css,
        }}
        {...props}
      >
        {children}
      </SectionContainer>
    )
  }
)

Section.displayName = 'Section'

