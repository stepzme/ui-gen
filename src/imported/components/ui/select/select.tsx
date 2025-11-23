import * as React from 'react'
import { createPortal } from 'react-dom'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Icon } from '@/imported/components/ui/icon'

export type TextAlign = 'left' | 'right' | 'center'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  subtitle?: string
}

export interface SelectProps {
  /**
   * Опции для выбора
   */
  options: SelectOption[]
  /**
   * Выбранное значение
   */
  value?: string
  /**
   * Обработчик изменения значения
   */
  onValueChange?: (value: string) => void
  /**
   * Placeholder текст
   * @default 'Выберите значение'
   */
  placeholder?: string
  /**
   * Метка поля
   */
  label?: React.ReactNode
  /**
   * Описание поля
   */
  description?: React.ReactNode
  /**
   * Текст ошибки
   */
  errorText?: React.ReactNode
  /**
   * Текст предупреждения
   */
  warningText?: React.ReactNode
  /**
   * Дополнительный текст
   */
  additionalText?: React.ReactNode
  /**
   * Отключено ли поле
   * @default false
   */
  disabled?: boolean
  /**
   * Только для чтения
   * @default false
   */
  readOnly?: boolean
  /**
   * Есть ли предупреждение
   * @default false
   */
  warning?: boolean
  /**
   * Выравнивание текста
   * @default 'left'
   */
  textAlign?: TextAlign
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
  /**
   * Ref для корневого элемента
   */
  ref?: React.Ref<HTMLButtonElement>
  /**
   * ID для тестирования
   */
  dataTestId?: string
  /**
   * Компактный режим (меньше отступов)
   * @default false
   */
  tight?: boolean
}

// BackgroundWrapper - обертка области с фоном (похожа на Input)
const StyledBackgroundWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--x-base-100)', // x1 = 4px
  padding: 'var(--x-base-200) var(--x-base-400)', // x2 сверху/снизу, x4 слева/справа
  boxSizing: 'border-box',
  background: 'var(--semantic-neutral-4)',
  border: '1px solid transparent',
  borderRadius: '$x2',
  transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
  position: 'relative',
  
  variants: {
    tight: {
      true: {
        padding: 'var(--x-base-100) var(--x-base-300)', // x1 сверху/снизу, x3 слева/справа
      },
    },
    disabled: {
      true: {
        background: 'var(--semantic-neutral-4)',
        opacity: 0.6,
        cursor: 'not-allowed',
      },
    },
    readOnly: {
      true: {
        background: 'var(--semantic-neutral-4)',
        opacity: 0.6,
      },
    },
    warning: {
      true: {
        background: 'var(--semantic-warning-4)',
        borderColor: 'var(--components-input-border-warning)',
      },
    },
    isOpen: {
      true: {
        background: 'var(--semantic-neutral-8)',
        borderColor: 'var(--components-input-border-active)',
      },
    },
  },
  
  compoundVariants: [
    {
      warning: true,
      disabled: false,
      readOnly: false,
      isOpen: false,
      css: {
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--semantic-warning-8)',
          },
        },
        '&:focus-within': {
          background: 'var(--semantic-warning-8)',
          borderColor: 'var(--components-input-border-warning)',
        },
      },
    },
    {
      warning: true,
      isOpen: true,
      css: {
        background: 'var(--semantic-warning-8)',
        borderColor: 'var(--components-input-border-warning)',
      },
    },
    {
      warning: false,
      disabled: false,
      readOnly: false,
      isOpen: false,
      css: {
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--semantic-neutral-8)',
          },
        },
        '&:focus-within': {
          background: 'var(--semantic-neutral-8)',
          borderColor: 'var(--components-input-border-active)',
        },
      },
    },
  ],
  
  defaultVariants: {
    tight: false,
    disabled: false,
    readOnly: false,
    warning: false,
    isOpen: false,
  },
})

// Label - название поля
const StyledLabel = styled('label', {
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-tight"]',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  color: 'var(--semantic-text-secondary)',
  WebkitTapHighlightColor: 'transparent',
})

// SelectTrigger - кнопка-триггер для открытия списка
const StyledSelectTrigger = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--x-base-200)', // x2 = 8px
  width: '100%',
  minHeight: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  textAlign: 'left',
  
  fontSize: '$fontSizes.bodyM',
  lineHeight: '$lineHeights["body-m-tight"]',
  color: 'var(--components-input-text-value)',
  fontWeight: '$bodyMedium',
  
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  
  variants: {
    textAlign: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
    hasValue: {
      false: {
        color: 'var(--components-input-text-placeholder)',
        fontWeight: '$bodyRegular',
      },
    },
  },
  
  defaultVariants: {
    textAlign: 'left',
    hasValue: true,
  },
})

// SelectValue - отображаемое значение
const StyledSelectValue = styled('span', {
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

// SelectIcon - иконка стрелки
const StyledSelectIcon = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: 'var(--components-input-icon)',
  transition: 'transform 0.2s ease-in-out',
  
  variants: {
    isOpen: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
    disabled: {
      true: {
        color: 'var(--components-input-icon-disabled)',
      },
    },
  },
})

// SelectContent - контент выпадающего списка
const StyledSelectContent = styled('div', {
  position: 'fixed',
  zIndex: 50,
  overflow: 'hidden',
  backgroundColor: 'var(--colors-background1-primary)',
  borderRadius: '$x2',
  border: '1px solid var(--colors-elevation0-borderNormal)',
  boxShadow: '$md',
  maxHeight: '300px',
  overflowY: 'auto',
  padding: 'var(--x-base-100)', // x1 = 4px
})

// SelectItem - элемент списка
const StyledSelectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--x-base-200)', // x2 = 8px
  padding: 'var(--x-base-200) var(--x-base-300)', // x2 сверху/снизу, x3 слева/справа
  borderRadius: '$x1',
  cursor: 'pointer',
  outline: 'none',
  userSelect: 'none',
  
  fontSize: '$fontSizes.bodyM',
  lineHeight: '$lineHeights["body-m-tight"]',
  color: 'var(--colors-text-primary)',
  
  '&:hover': {
    backgroundColor: 'var(--semantic-neutral-8)',
  },
  
  variants: {
    selected: {
      true: {
        backgroundColor: 'var(--semantic-neutral-8)',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
})

// SelectItemText - текст элемента
const StyledSelectItemText = styled('span', {
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

// SelectItemIndicator - индикатор выбранного элемента
const StyledSelectItemIndicator = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  color: 'var(--color-scheme-brand-primary)',
})

// Description - описание поля
const StyledDescription = styled('div', {
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-paragraph"]',
  color: 'var(--components-input-text-description)',
})

// Error - сообщение об ошибке
const StyledError = styled('div', {
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-paragraph"]',
  color: 'var(--semantic-text-warning)',
})

// Warning - сообщение предупреждения
const StyledWarning = styled('div', {
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-paragraph"]',
  color: 'var(--semantic-text-warning)',
})

// AdditionalText - дополнительный текст
const StyledAdditionalText = styled('div', {
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-paragraph"]',
  color: 'var(--components-input-text-additional)',
  flexShrink: 0,
})

// Footer - футер с дополнительным текстом и описанием/ошибкой
const StyledFooter = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 'var(--x-base-200)', // x2 = 8px
  minHeight: 0,
})

// FooterColumn - колонка в футере
const StyledFooterColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--x-base-100)', // x1 = 4px
  flex: 1,
  minWidth: 0,
})

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Выберите значение',
      label,
      description,
      errorText,
      warningText,
      additionalText,
      disabled = false,
      readOnly = false,
      warning = false,
      textAlign = 'left',
      css,
      dataTestId,
      tight = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [position, setPosition] = React.useState<{ top: number; left: number; width: number } | null>(null)
    const triggerRef = React.useRef<HTMLButtonElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)
    
    const selectedOption = options.find(opt => opt.value === value)
    const hasValue = !!value && !!selectedOption
    
    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current) return
      
      const rect = triggerRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const scrollX = window.scrollX
      
      setPosition({
        top: rect.bottom + scrollY + 4,
        left: rect.left + scrollX,
        width: rect.width,
      })
    }, [])
    
    React.useEffect(() => {
      if (isOpen) {
        updatePosition()
        const handleScroll = () => updatePosition()
        const handleResize = () => updatePosition()
        
        window.addEventListener('scroll', handleScroll, true)
        window.addEventListener('resize', handleResize)
        
        return () => {
          window.removeEventListener('scroll', handleScroll, true)
          window.removeEventListener('resize', handleResize)
        }
      }
    }, [isOpen, updatePosition])
    
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          triggerRef.current &&
          contentRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          !contentRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }
      
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }
    }, [isOpen])
    
    const handleToggle = () => {
      if (!disabled && !readOnly) {
        setIsOpen(!isOpen)
      }
    }
    
    const handleSelect = (optionValue: string) => {
      if (onValueChange) {
        onValueChange(optionValue)
      }
      setIsOpen(false)
    }
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleToggle()
      }
    }
    
    return (
      <>
        <StyledBackgroundWrapper
          css={css}
          disabled={disabled}
          readOnly={readOnly}
          warning={warning}
          tight={tight}
          isOpen={isOpen}
        >
          {label && (
            <StyledLabel htmlFor={dataTestId}>
              {label}
            </StyledLabel>
          )}
          
          <StyledSelectTrigger
            ref={(node) => {
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
              }
              triggerRef.current = node
            }}
            id={dataTestId}
            textAlign={textAlign}
            hasValue={hasValue}
            disabled={disabled || readOnly}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            data-test-id={dataTestId || 'Select'}
            {...props}
          >
            <StyledSelectValue>
              {selectedOption ? selectedOption.label : placeholder}
            </StyledSelectValue>
            <StyledSelectIcon isOpen={isOpen} disabled={disabled || readOnly}>
              <Icon icon="chevron_down" />
            </StyledSelectIcon>
          </StyledSelectTrigger>
          
          {(description || errorText || warningText || additionalText) && (
            <StyledFooter>
              <StyledFooterColumn>
                {description && !errorText && !warningText && (
                  <StyledDescription>{description}</StyledDescription>
                )}
                {errorText && <StyledError>{errorText}</StyledError>}
                {warningText && <StyledWarning>{warningText}</StyledWarning>}
              </StyledFooterColumn>
              {additionalText && <StyledAdditionalText>{additionalText}</StyledAdditionalText>}
            </StyledFooter>
          )}
        </StyledBackgroundWrapper>
        
        {isOpen && typeof document !== 'undefined' && position && createPortal(
          <StyledSelectContent
            ref={contentRef}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
          >
            {options.map((option) => (
              <StyledSelectItem
                key={option.value}
                selected={option.value === value}
                disabled={option.disabled}
                onClick={() => !option.disabled && handleSelect(option.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !option.disabled) {
                    handleSelect(option.value)
                  }
                }}
                tabIndex={option.disabled ? -1 : 0}
              >
                {option.icon && (
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {option.icon}
                  </div>
                )}
                <StyledSelectItemText>
                  {option.label}
                </StyledSelectItemText>
                {option.subtitle && (
                  <span style={{ 
                    fontSize: 'var(--font-sizes-body-s)', 
                    color: 'var(--colors-text-secondary)',
                    marginLeft: 'auto'
                  }}>
                    {option.subtitle}
                  </span>
                )}
                {option.value === value && (
                  <StyledSelectItemIndicator>
                    <Icon icon="circle_checkmark" />
                  </StyledSelectItemIndicator>
                )}
              </StyledSelectItem>
            ))}
          </StyledSelectContent>,
          document.body
        )}
      </>
    )
  }
)

Select.displayName = 'Select'
