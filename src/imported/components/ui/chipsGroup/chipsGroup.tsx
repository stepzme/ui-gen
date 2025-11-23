import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Chip } from '@/imported/components/ui/chip'

export type ChipsGroupInputType = 'checkbox' | 'radio'

export type ChipsGroupScrollable =
  | boolean
  | 'true'
  | {
      '@xxs'?: boolean | 'true'
      '@xs'?: boolean | 'true'
      '@sm'?: boolean | 'true'
      '@md'?: boolean | 'true'
      '@lg'?: boolean | 'true'
      '@xl'?: boolean | 'true'
      '@initial'?: boolean | 'true'
    }

export interface ChipsGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Компоненты Chip
   */
  children: React.ReactElement[]
  /**
   * Имя группы (должно быть уникально)
   */
  groupName: string
  /**
   * Лейбл
   */
  label?: string
  /**
   * Тип инпутов
   */
  inputType?: ChipsGroupInputType
  /**
   * Обработчик изменения инпута
   */
  onChange?: (selected: boolean, value?: string) => void
  /**
   * Прокручиваемый контейнер
   */
  scrollable?: ChipsGroupScrollable
  /**
   * Отключен ли весь компонент
   * @default false
   */
  disabled?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const ChipsGroupContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
})

const ChipsGroupLabel = styled(Typography, {
  color: 'var(--semantic-text-secondary)',
  ...typographyStyles.bodyS_tight_normal,
  marginBottom: '$x2',
})

const ChipsGroupItems = styled(Container, {
  display: 'flex',
  flexDirection: 'row',
  gap: '$x2',
  flexWrap: 'wrap',

  variants: {
    scrollable: {
      true: {
        flexWrap: 'nowrap',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--semantic-neutral-8)',
          borderRadius: '$x1',
        },
      },
      false: {},
    },
  },
})

export const ChipsGroup = React.forwardRef<HTMLDivElement, ChipsGroupProps>(
  (
    {
      children,
      groupName,
      label,
      inputType,
      onChange,
      scrollable = false,
      disabled = false,
      css,
      ...props
    },
    ref
  ) => {
    const handleChange = React.useCallback(
      (checked: boolean, value?: string) => {
        onChange?.(checked, value)
      },
      [onChange]
    )

    const clonedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child
      }

      return React.cloneElement(child, {
        ...child.props,
        name: groupName,
        inputType: inputType || child.props.inputType,
        onChange: (checked: boolean, value?: string) => {
          handleChange(checked, value)
          child.props.onChange?.(checked, value)
        },
        disabled: disabled || child.props.disabled,
      } as any)
    })

    const isScrollable = scrollable === true || scrollable === 'true'

    return (
      <ChipsGroupContainer ref={ref} css={css} {...props}>
        {label && <ChipsGroupLabel>{label}</ChipsGroupLabel>}
        <ChipsGroupItems scrollable={isScrollable}>{clonedChildren}</ChipsGroupItems>
      </ChipsGroupContainer>
    )
  }
)

ChipsGroup.displayName = 'ChipsGroup'

