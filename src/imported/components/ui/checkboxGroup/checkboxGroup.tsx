import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Checkbox } from '@/imported/components/ui/checkbox'

export type CheckboxGroupDirection = 'horizontal' | 'vertical'
export type CheckboxGroupColumnNumber = 'twoColumn' | 'threeColumn'

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Компоненты Checkbox
   */
  children: React.ReactElement | React.ReactElement[]
  /**
   * Уникальное имя группы
   */
  groupName: string
  /**
   * Состояние disabled на всю группу
   * @default false
   */
  disabled?: boolean
  /**
   * Label на группу
   */
  label?: React.ReactNode
  /**
   * Направление размещения элементов
   * @default 'vertical'
   */
  direction?: CheckboxGroupDirection
  /**
   * Количество колонок
   */
  columnNumber?: CheckboxGroupColumnNumber
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const CheckboxGroupContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
})

const CheckboxGroupLabel = styled(Typography, {
  color: 'var(--semantic-text-secondary)',
  ...typographyStyles.bodyM_tight_normal,
  marginBottom: '$x2',
})

const CheckboxGroupItems = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x3',
  
  variants: {
    direction: {
      horizontal: {
        display: 'flex',
        flexDirection: 'row',
        gap: '$x5',
      },
      vertical: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$x3',
      },
    },
    columnNumber: {
      twoColumn: {
        display: 'grid',
        gap: '$x5',
        gridTemplateColumns: '1fr 1fr',
      },
      threeColumn: {
        display: 'grid',
        gap: '$x5',
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    },
  },
  compoundVariants: [
    {
      direction: 'vertical',
      columnNumber: 'twoColumn',
      css: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$x3',
      },
    },
    {
      direction: 'vertical',
      columnNumber: 'threeColumn',
      css: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$x3',
      },
    },
    {
      direction: 'horizontal',
      columnNumber: 'twoColumn',
      css: {
        display: 'grid',
        gap: '$x5',
        gridTemplateColumns: '1fr 1fr',
      },
    },
    {
      direction: 'horizontal',
      columnNumber: 'threeColumn',
      css: {
        display: 'grid',
        gap: '$x5',
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    },
  ],
  defaultVariants: {
    direction: 'vertical',
  },
})

export const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      children,
      groupName,
      disabled = false,
      label,
      direction = 'vertical',
      columnNumber,
      css,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children) as React.ReactElement[]
    
    return (
      <CheckboxGroupContainer
        ref={ref}
        css={css}
        {...props}
      >
        {label && <CheckboxGroupLabel>{label}</CheckboxGroupLabel>}
        <CheckboxGroupItems
          direction={direction}
          columnNumber={columnNumber}
        >
          {React.Children.map(childrenArray, (child) =>
            React.cloneElement(child, {
              disabled: disabled || child.props.disabled,
            })
          )}
        </CheckboxGroupItems>
      </CheckboxGroupContainer>
    )
  }
)

CheckboxGroup.displayName = 'CheckboxGroup'

