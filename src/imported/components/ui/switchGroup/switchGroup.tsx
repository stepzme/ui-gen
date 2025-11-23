import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Switch } from '@/imported/components/ui/switch'

export type SwitchGroupDirection = 'horizontal' | 'vertical'
export type SwitchGroupColumnNumber = 'twoColumn' | 'threeColumn'

export interface SwitchGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Компоненты Switch
   */
  children: React.ReactElement | React.ReactElement[]
  /**
   * Уникальное имя группы
   */
  groupName: string
  /**
   * Обработчик изменения
   */
  onChange?: (isChecked: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void
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
  direction?: SwitchGroupDirection
  /**
   * Количество колонок
   */
  columnNumber?: SwitchGroupColumnNumber
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const SwitchGroupContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
})

const SwitchGroupLabel = styled(Typography, {
  color: 'var(--semantic-text-secondary)',
  ...typographyStyles.bodyM_tight_normal,
  marginBottom: '$x2',
})

const SwitchGroupItems = styled(Container, {
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

export const SwitchGroup = React.forwardRef<HTMLDivElement, SwitchGroupProps>(
  (
    {
      children,
      groupName,
      onChange,
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
      <SwitchGroupContainer
        ref={ref}
        css={css}
        {...props}
      >
        {label && <SwitchGroupLabel>{label}</SwitchGroupLabel>}
        <SwitchGroupItems
          direction={direction}
          columnNumber={columnNumber}
        >
          {React.Children.map(childrenArray, (child) =>
            React.cloneElement(child, {
              disabled: disabled || child.props.disabled,
              onChange: onChange,
            })
          )}
        </SwitchGroupItems>
      </SwitchGroupContainer>
    )
  }
)

SwitchGroup.displayName = 'SwitchGroup'

