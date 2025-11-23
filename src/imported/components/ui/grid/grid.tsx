import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export type GridGap = 'x0' | 'x1' | 'x2' | 'x3' | 'x4' | 'x5' | 'x6' | 'x7' | 'x8' | 'x9' | 'x10' | 'x11' | 'x12' | 'x13' | 'x14' | 'x15' | 'x16' | 'x17' | 'x18' | 'x19' | 'x20'
export type GridBreakpoint = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type GridColumns = string | number | Partial<Record<GridBreakpoint, string | number>>
export type GridRows = string | number | Partial<Record<GridBreakpoint, string | number>>
export type GridItemSpan = string | number | Partial<Record<GridBreakpoint, string | number>>

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое сетки
   */
  children?: React.ReactNode
  /**
   * Количество колонок
   * @default 12
   */
  columns?: GridColumns
  /**
   * Количество строк
   * @default 1
   */
  rows?: GridRows
  /**
   * Зазор между элементами
   * @default 'x2'
   */
  gap?: GridGap
  /**
   * Зазор между колонками
   */
  columnGap?: GridGap
  /**
   * Зазор между строками
   */
  rowGap?: GridGap
  /**
   * Ширина
   * @default '100%'
   */
  width?: string
  /**
   * Высота
   */
  height?: string
  /**
   * Выравнивание по поперечной оси
   */
  align?: string
  /**
   * Выравнивание по главной оси
   */
  justify?: string
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

// Функция для преобразования columns/rows в CSS
function processGridValue(
  value: GridColumns | GridRows,
  property: 'gridTemplateColumns' | 'gridTemplateRows'
): CSS {
  if (typeof value === 'string' || typeof value === 'number') {
    const numValue = typeof value === 'number' ? value : Number(value)
    if (!isNaN(numValue)) {
      return {
        [property]: `repeat(${numValue}, minmax(0, 1fr))`,
      }
    }
    return {
      [property]: value,
    }
  }
  
  // Объект с breakpoints
  const result: CSS = {}
  for (const [breakpoint, breakpointValue] of Object.entries(value)) {
    if (breakpointValue !== undefined) {
      const numValue = typeof breakpointValue === 'number' ? breakpointValue : Number(breakpointValue)
      const cssValue = !isNaN(numValue)
        ? `repeat(${numValue}, minmax(0, 1fr))`
        : breakpointValue
      
      // Map breakpoints to media queries
      const mediaQuery = `@${breakpoint}`
      result[mediaQuery] = {
        [property]: cssValue,
      }
    }
  }
  
  return result
}

const GridContainer = styled('div', {
  display: 'grid',
  width: '100%',
  boxSizing: 'border-box',
})

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      columns = 12,
      rows = 1,
      gap = 'x2',
      columnGap,
      rowGap,
      width = '100%',
      height,
      align,
      justify,
      css,
      ...props
    },
    ref
  ) => {
    const columnsStyle = React.useMemo(() => processGridValue(columns, 'gridTemplateColumns'), [columns])
    const rowsStyle = React.useMemo(() => processGridValue(rows, 'gridTemplateRows'), [rows])
    
    return (
      <GridContainer
        ref={ref}
        css={{
          width,
          height,
          alignItems: align,
          justifyContent: justify,
          gap: gap ? `$space$${gap}` : undefined,
          rowGap: rowGap ? `$space$${rowGap}` : undefined,
          columnGap: columnGap ? `$space$${columnGap}` : undefined,
          ...columnsStyle,
          ...rowsStyle,
          ...css,
        }}
        {...props}
      >
        {children}
      </GridContainer>
    )
  }
)

Grid.displayName = 'Grid'

