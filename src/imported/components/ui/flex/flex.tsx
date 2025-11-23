import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export type FlexDirection = 'row' | 'column'
export type FlexJustify = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch'
export type FlexWrap = 'nowrap' | 'wrap'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое блока
   */
  children?: React.ReactNode
  /**
   * Направление flex
   * @default 'row'
   */
  direction?: FlexDirection
  /**
   * Выравнивание по главной оси
   * @default 'start'
   */
  justify?: FlexJustify
  /**
   * Выравнивание по поперечной оси
   * @default 'stretch'
   */
  align?: FlexAlign
  /**
   * Перенос элементов
   * @default 'nowrap'
   */
  wrap?: FlexWrap
  /**
   * Растягивать на всю ширину
   * @default false
   */
  fullWidth?: boolean
  /**
   * Растягивать на всю высоту
   * @default false
   */
  fullHeight?: boolean
  /**
   * Устанавливает зазор между блоками
   */
  gap?: string | number
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const FlexContainer = styled('div', {
  display: 'flex',
  boxSizing: 'border-box',
  
  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
      center: {
        justifyContent: 'center',
      },
      'space-between': {
        justifyContent: 'space-between',
      },
      'space-around': {
        justifyContent: 'space-around',
      },
      'space-evenly': {
        justifyContent: 'space-evenly',
      },
    },
    align: {
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
      center: {
        alignItems: 'center',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },
    wrap: {
      nowrap: {
        flexWrap: 'nowrap',
      },
      wrap: {
        flexWrap: 'wrap',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    fullHeight: {
      true: {
        height: '100%',
      },
    },
  },
  defaultVariants: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    wrap: 'nowrap',
  },
})

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      direction = 'row',
      justify = 'start',
      align = 'stretch',
      wrap = 'nowrap',
      fullWidth = false,
      fullHeight = false,
      gap,
      css,
      ...props
    },
    ref
  ) => {
    const gapStyle = React.useMemo(() => {
      if (!gap) return {}
      return {
        gap: typeof gap === 'number' ? `${gap}px` : gap,
      }
    }, [gap])
    
    return (
      <FlexContainer
        ref={ref}
        direction={direction}
        justify={justify}
        align={align}
        wrap={wrap}
        fullWidth={fullWidth}
        fullHeight={fullHeight}
        css={{
          ...gapStyle,
          ...css,
        }}
        {...props}
      >
        {children}
      </FlexContainer>
    )
  }
)

Flex.displayName = 'Flex'

