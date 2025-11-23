import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Icon } from '@/imported/components/ui/icon'

export type ChipVariant = 'filled' | 'outlined' | 'tonned'
export type ChipColorScheme = 'primary' | 'critical' | 'info' | 'brand' | 'brandPrimary' | 'success'
export type ChipViewType = 'removable' | 'dropdown'
export type ChipPaddingSize = 'tiny' | 'small' | 'medium'

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange' | 'children'> {
  /**
   * Основной текст чипа (required)
   */
  text: React.ReactNode
  /**
   * Вариант чипа
   * @default 'tonned'
   */
  variant?: ChipVariant
  /**
   * Цветовая схема
   * @default 'brandPrimary'
   */
  colorScheme?: ChipColorScheme
  /**
   * Выбран ли чип
   * @default false
   */
  selected?: boolean
  /**
   * Отключен ли чип
   * @default false
   */
  disabled?: boolean
  /**
   * Иконка слева
   */
  icon?: React.ReactNode
  /**
   * Аватар
   */
  avatar?: React.ReactNode
  /**
   * Счетчик
   */
  counter?: number
  /**
   * Тип элемента (влияет на отображение иконки справа)
   */
  viewType?: ChipViewType
  /**
   * Определяет положение иконки для типа dropdown
   * @default false
   */
  isOpen?: boolean
  /**
   * Обработчик удаления (deprecated, используйте viewType="removable" с onClick)
   * @deprecated
   */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Обработчик изменения раскрытия (deprecated)
   * @deprecated
   */
  onChangeExpand?: (isOpen: boolean, e: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Обработчик клика
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Обработчик изменения (для checkbox/radio)
   */
  onChange?: (checked: boolean, value?: string, event?: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Тип инпута (checkbox/radio)
   */
  inputType?: 'checkbox' | 'radio'
  /**
   * Имя для radio группы
   */
  name?: string
  /**
   * Значение для inputType
   */
  value?: string
  /**
   * Типографика
   * @default 'bodyM'
   */
  typography?: 'bodyS' | 'bodyM' | 'bodyL'
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: 'bodyS' | 'bodyM' | 'bodyL'
  /**
   * Размер внутренних отступов
   * @default 'tiny'
   */
  paddingSize?: ChipPaddingSize
  /**
   * Скругление
   * @default false
   */
  rounded?: boolean
  /**
   * Определяет html-тег
   */
  asTag?: React.ElementType
  /**
   * Пропсы для counter badge
   */
  counterBadgeProps?: Record<string, any>
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
  /**
   * ID для тестирования
   * @deprecated Используйте data-test-id
   */
  dataTestId?: string
}

const ChipContainer = styled(Container, {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--x-base-200)',
  padding: 'var(--x-base-100) var(--x-base-300)',
  borderRadius: '$x2',
  border: '1px solid transparent',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'all 0.2s ease-in-out',
  outline: 'none',
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  
  '&:focus-visible': {
    outline: '2px solid var(--semantic-brand-primary)',
    outlineOffset: '2px',
  },

  variants: {
    variant: {
      filled: {},
      outlined: {},
    },
    selected: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.6,
      },
      false: {},
    },
    rounded: {
      true: {
        borderRadius: '$x10',
      },
      false: {},
    },
  },

  compoundVariants: [
    // Filled - not selected
    {
      variant: 'filled',
      selected: false,
      disabled: false,
      css: {
        backgroundColor: 'var(--components-chips-filled-off-body-normal)',
        color: 'var(--components-chips-filled-off-text)',
        '&:hover': {
          backgroundColor: 'var(--components-chips-filled-off-body-hover)',
        },
        '&:active': {
          backgroundColor: 'var(--components-chips-filled-off-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      selected: false,
      disabled: true,
      css: {
        backgroundColor: 'var(--components-chips-filled-off-body-disabled)',
        color: 'var(--components-chips-filled-off-text-disabled)',
      },
    },
    // Filled - selected
    {
      variant: 'filled',
      selected: true,
      disabled: false,
      css: {
        backgroundColor: 'var(--components-chips-filled-on-body-normal)',
        color: 'var(--components-chips-filled-on-text)',
        '&:hover': {
          backgroundColor: 'var(--components-chips-filled-on-body-hover)',
        },
        '&:active': {
          backgroundColor: 'var(--components-chips-filled-on-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      selected: true,
      disabled: true,
      css: {
        backgroundColor: 'var(--components-chips-filled-on-body-disabled)',
        color: 'var(--components-chips-filled-on-text-disabled)',
      },
    },
    // Outlined - not selected
    {
      variant: 'outlined',
      selected: false,
      disabled: false,
      css: {
        backgroundColor: 'var(--components-chips-outlined-off-body-normal)',
        color: 'var(--components-chips-outlined-off-text)',
        borderColor: 'var(--components-chips-outlined-off-border)',
        '&:hover': {
          backgroundColor: 'var(--components-chips-outlined-off-body-hover)',
        },
        '&:active': {
          backgroundColor: 'var(--components-chips-outlined-off-body-click)',
        },
      },
    },
    {
      variant: 'outlined',
      selected: false,
      disabled: true,
      css: {
        backgroundColor: 'var(--components-chips-outlined-off-body-disabled)',
        color: 'var(--components-chips-outlined-off-text-disabled)',
        borderColor: 'var(--components-chips-outlined-off-border)',
      },
    },
    // Outlined - selected
    {
      variant: 'outlined',
      selected: true,
      disabled: false,
      css: {
        backgroundColor: 'var(--components-chips-outlined-on-body-normal)',
        color: 'var(--components-chips-outlined-on-text)',
        borderColor: 'var(--components-chips-outlined-on-border)',
        '&:hover': {
          backgroundColor: 'var(--components-chips-outlined-on-body-hover)',
        },
        '&:active': {
          backgroundColor: 'var(--components-chips-outlined-on-body-click)',
        },
      },
    },
    {
      variant: 'outlined',
      selected: true,
      disabled: true,
      css: {
        backgroundColor: 'var(--components-chips-outlined-on-body-disabled)',
        color: 'var(--components-chips-outlined-on-text-disabled)',
        borderColor: 'var(--components-chips-outlined-on-border)',
      },
    },
  ],
})

const ChipIcon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  color: 'inherit',
  '& svg': {
    width: '16px',
    height: '16px',
  },
})

const ChipAvatar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

const ChipText = styled('span', {
  display: 'flex',
  alignItems: 'center',
})

const ChipCounter = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '20px',
  height: '20px',
  padding: '0 var(--x-base-100)',
  borderRadius: '$x5',
  backgroundColor: 'currentColor',
  opacity: 0.2,
  fontSize: '12px',
  fontWeight: 500,
  color: 'inherit',
})

const RemoveButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',
  padding: 0,
  margin: 0,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: 'inherit',
  opacity: 0.7,
  transition: 'opacity 0.2s ease-in-out',
  flexShrink: 0,
  '&:hover': {
    opacity: 1,
  },
  '&:focus-visible': {
    outline: '2px solid currentColor',
    outlineOffset: '2px',
    borderRadius: '2px',
  },
  '& svg': {
    width: '14px',
    height: '14px',
  },
})

const HiddenInput = styled('input', {
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
  width: 0,
  height: 0,
})

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      text,
      variant = 'tonned',
      colorScheme = 'brandPrimary',
      selected = false,
      disabled = false,
      icon,
      avatar,
      counter,
      viewType,
      isOpen = false,
      onRemove,
      onChangeExpand,
      onClick,
      onChange,
      inputType,
      name,
      value,
      typography,
      size,
      paddingSize = 'tiny',
      rounded = false,
      asTag,
      counterBadgeProps,
      css,
      dataTestId,
      'data-test-id': dataTestIdProp,
      ...props
    },
    ref
  ) => {
    const [internalSelected, setInternalSelected] = React.useState(selected)
    const effectiveTypography = typography || size || 'bodyM'
    const finalDataTestId = dataTestIdProp || dataTestId || 'Chip'
    
    React.useEffect(() => {
      setInternalSelected(selected)
    }, [selected])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      setInternalSelected(newChecked)
      onChange?.(newChecked, value, e)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      
      onClick?.(e)
      onRemove?.(e)
      if (viewType === 'dropdown' && onChangeExpand) {
        onChangeExpand(!isOpen, e)
      }
    }

    const typographyMap = {
      bodyS: 'bodyS_tight_medium' as const,
      bodyM: 'bodyM_tight_medium' as const,
      bodyL: 'bodyL_tight_medium' as const,
    }

    // Определяем тег для компонента
    const getAsTag = () => {
      if (asTag) return asTag
      if (inputType) return 'label'
      return 'button'
    }

    const hasRightControl = !!viewType
    const hasCounter = counter !== undefined && counter !== null
    const isTonnedOrBrandPrimaryOutlined = variant === 'tonned' || (variant === 'outlined' && colorScheme === 'brandPrimary')

    return (
      <>
        {inputType && (
          <HiddenInput
            type={inputType}
            name={name}
            value={value}
            checked={internalSelected}
            onChange={handleInputChange}
            disabled={disabled}
            aria-label={props['aria-label'] || (typeof text === 'string' ? text : '')}
            data-test-id={dataTestId ? `${dataTestId}-input` : undefined}
          />
        )}
        <ChipContainer
          ref={ref}
          as={getAsTag()}
          type={getAsTag() === 'button' ? 'button' : undefined}
          variant={variant}
          selected={internalSelected}
          disabled={disabled}
          rounded={rounded}
          css={css}
          onClick={handleClick}
          role={inputType === 'checkbox' ? 'checkbox' : inputType === 'radio' ? 'radio' : undefined}
          aria-checked={inputType ? internalSelected : undefined}
          aria-disabled={disabled}
          data-test-id={finalDataTestId}
          {...props}
        >
          {icon && <ChipIcon>{icon}</ChipIcon>}
          {avatar && <ChipAvatar>{avatar}</ChipAvatar>}
          <ChipText aria-hidden={!!inputType}>
            <Typography typography={typographyMap[effectiveTypography]}>
              {text}
            </Typography>
          </ChipText>
          {hasCounter && !isTonnedOrBrandPrimaryOutlined && (
            <ChipCounter>{counter > 99 ? '99+' : counter}</ChipCounter>
          )}
          {hasCounter && isTonnedOrBrandPrimaryOutlined && (
            <ChipCounter>{counter > 99 ? '99+' : counter}</ChipCounter>
          )}
          {viewType === 'removable' && (
            <RemoveButton
              type="button"
              aria-hidden="true"
              onClick={(e) => {
                e.stopPropagation()
                handleClick(e as any)
              }}
            >
              <Icon variant="circle_cross" />
            </RemoveButton>
          )}
          {viewType === 'dropdown' && (
            <RemoveButton
              type="button"
              aria-hidden="true"
              onClick={(e) => {
                e.stopPropagation()
                handleClick(e as any)
              }}
            >
              <Icon variant={isOpen ? "arrow_up" : "arrow_down"} />
            </RemoveButton>
          )}
        </ChipContainer>
      </>
    )
  }
)

Chip.displayName = 'Chip'

