import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import type { GridItemSpan } from './grid'

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое элемента сетки
   */
  children?: React.ReactNode
  /**
   * Охват колонок
   */
  columnSpan?: GridItemSpan
  /**
   * Охват строк
   */
  rowSpan?: GridItemSpan
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

// Функция для преобразования span в CSS
function processSpanValue(
  value: GridItemSpan,
  property: 'gridColumn' | 'gridRow'
): CSS {
  if (typeof value === 'string' || typeof value === 'number') {
    const numValue = typeof value === 'number' ? value : Number(value)
    if (!isNaN(numValue)) {
      return {
        [property]: `span ${numValue} / span ${numValue}`,
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
        ? `span ${numValue} / span ${numValue}`
        : breakpointValue
      
      const mediaQuery = `@${breakpoint}`
      result[mediaQuery] = {
        [property]: cssValue,
      }
    }
  }
  
  return result
}

const GridItemContainer = styled('div', {
  boxSizing: 'border-box',
})

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      children,
      columnSpan,
      rowSpan,
      css,
      ...props
    },
    ref
  ) => {
    const columnStyle = React.useMemo(
      () => (columnSpan ? processSpanValue(columnSpan, 'gridColumn') : {}),
      [columnSpan]
    )
    const rowStyle = React.useMemo(
      () => (rowSpan ? processSpanValue(rowSpan, 'gridRow') : {}),
      [rowSpan]
    )
    
    return (
      <GridItemContainer
        ref={ref}
        css={{
          ...columnStyle,
          ...rowStyle,
          ...css,
        }}
        {...props}
      >
        {children}
      </GridItemContainer>
    )
  }
)

GridItem.displayName = 'GridItem'

