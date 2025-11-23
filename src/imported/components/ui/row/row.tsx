import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export type RowPreset =
  | 'noPadding'
  | 'noPaddingV'
  | 'noPaddingTop'
  | 'noPaddingBottom'
  | 'noPaddingH'
  | 'onlyPaddingTop'
  | 'onlyPaddingBottom'
  | 'cell'
  | 'pageHeadline'
  | 'sectionHeadline'
  | 'sectionSubheader'
  | 'sectionLabel'
  | 'text'
  | 'list'
  | 'dataRow'
  | 'empty'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое строки
   */
  children: React.ReactNode
  /**
   * Предустановленный стиль отступов
   */
  preset?: RowPreset
  /**
   * Количество колонок (1-24)
   * @default 1
   */
  columns?: number
  /**
   * Верхний отступ
   */
  tPadding?: string
  /**
   * Нижний отступ
   */
  bPadding?: string
  /**
   * Горизонтальные отступы
   */
  hPadding?: string
  /**
   * Переопределение расстояния между колонками; любое валидное значение CSS
   */
  columnGapOverride?: string
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const presetStyles: Record<RowPreset, CSS> = {
  noPadding: {
    paddingTop: '$x0',
    paddingBottom: '$x0',
    paddingLeft: '$x0',
    paddingRight: '$x0',
  },
  noPaddingV: {
    paddingTop: '$x0',
    paddingBottom: '$x0',
  },
  noPaddingTop: {
    paddingTop: '$x0',
  },
  noPaddingBottom: {
    paddingBottom: '$x0',
  },
  noPaddingH: {
    paddingLeft: '$x0',
    paddingRight: '$x0',
  },
  onlyPaddingTop: {
    paddingBottom: '$x0',
    paddingLeft: '$x0',
    paddingRight: '$x0',
  },
  onlyPaddingBottom: {
    paddingTop: '$x0',
    paddingLeft: '$x0',
    paddingRight: '$x0',
  },
  cell: {
    paddingLeft: '$x0',
    paddingRight: '$x0',
  },
  pageHeadline: {
    paddingTop: '$x8',
    paddingBottom: '$x3',
  },
  sectionHeadline: {
    paddingTop: '$x6',
    paddingBottom: '$x2',
  },
  sectionSubheader: {
    paddingTop: '$x6',
    paddingBottom: '$x0',
  },
  sectionLabel: {
    paddingTop: '$x4',
    paddingBottom: '$x0',
  },
  text: {
    paddingTop: '$x6',
    paddingBottom: '$x6',
  },
  list: {
    paddingTop: '$x6',
    paddingBottom: '$x6',
  },
  dataRow: {
    paddingLeft: '$x0',
    paddingRight: '$x0',
  },
  empty: {
    boxSizing: 'content-box',
    height: '$x12',
  },
}

// Генерируем варианты для columns (1-24)
const columnsVariants: Record<string, CSS> = {}
for (let i = 1; i <= 24; i++) {
  columnsVariants[i.toString()] = {
    gridTemplateColumns: `repeat(${i}, 1fr)`,
  }
}

const RowContainer = styled('div', {
  display: 'grid',
  paddingTop: '$x4',
  paddingBottom: '$x4',
  paddingLeft: '$x5',
  paddingRight: '$x5',
  columnGap: '$x10',
  
  variants: {
    preset: presetStyles,
    columns: columnsVariants,
  },
  defaultVariants: {
    columns: '1',
  },
})

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  (
    {
      children,
      preset,
      columns = 1,
      tPadding,
      bPadding,
      hPadding,
      columnGapOverride,
      css,
      ...props
    },
    ref
  ) => {
    return (
      <RowContainer
        ref={ref}
        preset={preset}
        columns={columns.toString()}
        css={{
          ...(tPadding && { paddingTop: tPadding }),
          ...(bPadding && { paddingBottom: bPadding }),
          ...(hPadding && { paddingLeft: hPadding, paddingRight: hPadding }),
          ...(columnGapOverride && { columnGap: columnGapOverride }),
          ...css,
        }}
        {...props}
      >
        {children}
      </RowContainer>
    )
  }
)

Row.displayName = 'Row'

