import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Ориентация разделителя
   * @default 'horizontal'
   */
  orientation?: DividerOrientation
  /**
   * Толщина линии
   * @default '1px'
   */
  thickness?: string
  /**
   * Длина линии (для horizontal - ширина, для vertical - высота)
   * @default '100%'
   */
  length?: string
  /**
   * Текст в центре разделителя
   */
  text?: React.ReactNode
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const DividerLine = styled(Container, {
  backgroundColor: 'var(--semantic-neutral-16)',
  flexShrink: 0,
})

const DividerContainer = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  
  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
        width: 'auto',
        height: '100%',
      },
    },
  },
})

const DividerText = styled('span', {
  padding: '0 var(--x-base-300)',
  color: 'var(--semantic-text-secondary)',
  fontSize: '14px',
  whiteSpace: 'nowrap',
})

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      thickness = '1px',
      length = '100%',
      text,
      css,
      ...props
    },
    ref
  ) => {
    if (text && orientation === 'horizontal') {
      return (
        <DividerContainer
          ref={ref}
          orientation={orientation}
          css={css}
          {...props}
        >
          <DividerLine
            css={{
              height: thickness,
              width: '100%',
              flex: 1,
            }}
          />
          <DividerText>{text}</DividerText>
          <DividerLine
            css={{
              height: thickness,
              width: '100%',
              flex: 1,
            }}
          />
        </DividerContainer>
      )
    }

    return (
      <DividerLine
        ref={ref}
        orientation={orientation}
        css={{
          ...(orientation === 'horizontal'
            ? {
                height: thickness,
                width: length,
              }
            : {
                width: thickness,
                height: length,
              }),
          ...css,
        }}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'

