import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Radio } from '@/imported/components/ui/radio'

export type RadioGroupDirection = 'horizontal' | 'vertical'
export type RadioGroupColumnNumber = 'twoColumn' | 'threeColumn'

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Компоненты Radio
   */
  children: React.ReactElement[]
  /**
   * Уникальное имя группы
   */
  groupName: string
  /**
   * Обработчик изменения инпута
   */
  onChange: (isSelected: boolean, value?: string, groupName?: string) => void
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
  direction?: RadioGroupDirection
  /**
   * Количество колонок
   */
  columnNumber?: RadioGroupColumnNumber
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const RadioGroupContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
})

const RadioGroupLabel = styled(Typography, {
  color: 'var(--semantic-text-secondary)',
  ...typographyStyles.bodyS_tight_normal,
  marginBottom: '$x2',
})

const RadioGroupItems = styled(Container, {
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

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
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
    const [selectedValue, setSelectedValue] = React.useState<string | undefined>()
    
    React.useEffect(() => {
      React.Children.forEach(children, (child) => {
        if (child.props.checked) {
          setSelectedValue(child.props.value)
        }
      })
    }, [children])
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value
      const isSelected = event.currentTarget.checked
      setSelectedValue(value)
      onChange(isSelected, value, groupName)
    }
    
    if (!children || children.length === 0) {
      return null
    }
    
    return (
      <RadioGroupContainer
        ref={ref}
        css={css}
        {...props}
      >
        {label && <RadioGroupLabel>{label}</RadioGroupLabel>}
        <RadioGroupItems
          direction={direction}
          columnNumber={columnNumber}
        >
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onChange: handleChange,
              name: groupName,
              checked: selectedValue === child.props.value,
              disabled: disabled || child.props.disabled,
            })
          )}
        </RadioGroupItems>
      </RadioGroupContainer>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

