import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export type TextAlign = 'left' | 'right' | 'center'
export type TextareaVariant = 'filled' | 'outlined'
export type TextareaViewType = 'filled' | 'outlined'
export type TextareaPaddingSize = 'tiny' | 'small' | 'medium'
export type TextareaTypography = 'bodyS' | 'bodyM' | 'bodyL'

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /**
   * Значение textarea
   */
  value?: string
  /**
   * Placeholder текст
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
   * Текст предупреждения/ошибки
   */
  warning?: React.ReactNode
  /**
   * Есть ли ошибка
   * @default false
   */
  hasError?: boolean
  /**
   * Вариант textarea
   * @default 'outlined'
   */
  variant?: TextareaVariant
  /**
   * Тип отображения (deprecated, используйте variant)
   * @deprecated
   */
  viewType?: TextareaViewType
  /**
   * Размер внутренних отступов
   * @default 'small'
   */
  paddingSize?: TextareaPaddingSize
  /**
   * Размер через типографику
   * @default 'bodyM'
   */
  typography?: TextareaTypography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: TextareaTypography
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
   * Ref для textarea элемента
   */
  textareaRef?: React.Ref<HTMLTextAreaElement>
  /**
   * Обработчик изменения значения
   */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  /**
   * Обработчик потери фокуса
   */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  /**
   * Обработчик получения фокуса
   */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
  /**
   * Обработчик нажатия клавиши
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  /**
   * Обработчик очистки поля
   */
  onClear?: () => void
  /**
   * ID для textarea элемента
   */
  id?: string
  /**
   * Имя textarea элемента
   */
  name?: string
  /**
   * Автофокус
   */
  autoFocus?: boolean
  /**
   * Отключено
   * @default false
   */
  disabled?: boolean
  /**
   * Только для чтения
   * @default false
   */
  readOnly?: boolean
  /**
   * Автосайз режим для поля
   * @default false
   */
  autosize?: boolean
  /**
   * Максимальное количество символов
   */
  maxLength?: number
  /**
   * Показывать счетчик символов
   * @default false
   */
  showCounter?: boolean
  /**
   * Минимальное количество строк
   * @default 3
   */
  minRows?: number
  /**
   * Максимальное количество строк (для auto-resize)
   */
  maxRows?: number
}

// BackgroundWrapper - обертка области с фоном (layout из meta + визуальные стили)
const StyledBackgroundWrapper = styled('div', {
  // Layout из meta
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--x-base-100)', // x1 = 4px
  padding: 'var(--x-base-200) var(--x-base-400)', // x2 сверху/снизу, x4 слева/справа
  boxSizing: 'border-box',
  // Визуальные стили из UI
  background: 'var(--semantic-neutral-4)',
  border: '1px solid transparent',
  borderRadius: '$x2',
  transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
})

// Label - название поля (typography из meta + визуальные стили)
const StyledLabel = styled('label', {
  // Typography из meta
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-tight"]',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  // Визуальные стили из UI
  color: 'var(--semantic-text-secondary)',
  WebkitTapHighlightColor: 'transparent',
})

// Textarea - элемент поля ввода (layout + typography из meta + визуальные стили)
const StyledTextarea = styled('textarea', {
  // Layout из meta
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  resize: 'none',
  // Typography из meta
  fontSize: '$fontSizes.bodyM',
  lineHeight: '$lineHeights["body-m-tight"]',
  // Визуальные стили из UI
  backgroundColor: 'transparent',
  color: 'var(--components-input-text-value)',
  opacity: 1,
  fontWeight: '$bodyRegular',
  width: '100%',
  fontFamily: 'inherit',
  
  '&::placeholder': {
    color: 'var(--components-input-text-placeholder)',
    fontWeight: '$bodyRegular',
  },
  
  variants: {
    textAlign: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
  },
  defaultVariants: {
    textAlign: 'left',
  },
})

// Error - сообщение об ошибке (typography из meta + визуальные стили)
const StyledError = styled('div', {
  // Typography из meta
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-paragraph"]',
  // Визуальные стили из UI
  color: 'var(--semantic-text-warning)',
})

// Description - описание поля (typography из meta + визуальные стили)
const StyledDescription = styled('div', {
  // Typography из meta
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-paragraph"]',
  // Визуальные стили из UI
  color: 'var(--components-input-text-description)',
})

// Footer - обертка футера (layout из meta)
const StyledFooter = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 'var(--x-base-300)', // x3 = 12px
  marginTop: 'var(--x-base-200)', // x2 = 8px
  width: '100%',
})

// FooterLeft - левая часть футера (description и error)
const StyledFooterLeft = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--x-base-100)', // x1 = 4px
  flex: 1,
  minWidth: 0,
})

// Counter - счетчик символов
const StyledCounter = styled('div', {
  // Typography из meta
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-tight"]',
  // Визуальные стили из UI
  color: 'var(--semantic-text-secondary)',
  flexShrink: 0,
})

// Основной контейнер (variants структура из meta + визуальные стили)
const TextareaContainer = styled('div', {
  '&:focus-visible': {
    outline: '2px solid var(--color-scheme-brand-primary)',
    outlineOffset: '-2px',
  },
  
  '&:focus-within': {
    [`& ${StyledBackgroundWrapper}`]: {
      background: 'var(--semantic-neutral-8)',
      borderColor: 'var(--components-input-border-active)',
    },
  },
  
  '@media (hover: hover)': {
    '&:hover:not(:focus-within)': {
      [`& ${StyledBackgroundWrapper}`]: {
        background: 'var(--semantic-neutral-8)',
      },
    },
  },
  
  variants: {
    warning: {
      true: {
        '&:focus-within': {
          [`& ${StyledBackgroundWrapper}`]: {
            background: 'var(--semantic-warning-8)',
            borderColor: 'var(--components-input-border-warning)',
          },
        },
        '@media (hover: hover)': {
          '&:hover:not(:focus-within)': {
            [`& ${StyledBackgroundWrapper}`]: {
              background: 'var(--semantic-warning-8)',
            },
          },
        },
      },
    },
    disabled: {
      true: {
        [`& ${StyledBackgroundWrapper}`]: {
          background: 'var(--semantic-neutral-4)',
          opacity: 0.6,
        },
        [`& ${StyledTextarea}`]: {
          cursor: 'not-allowed',
        },
      },
    },
    readOnly: {
      true: {
        [`& ${StyledBackgroundWrapper}`]: {
          background: 'var(--semantic-neutral-4)',
          opacity: 0.6,
        },
      },
    },
    tight: {
      true: {
        [`& ${StyledBackgroundWrapper}`]: {
          padding: 'var(--x-base-100) var(--x-base-300)', // x1 сверху/снизу, x3 слева/справа
        },
      },
    },
  },
})

export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  (
    {
      value = '',
      placeholder,
      label,
      description,
      warning,
      hasError = false,
      variant,
      viewType,
      paddingSize = 'small',
      typography,
      size,
      textAlign = 'left',
      css,
      textareaRef,
      onChange = () => {},
      onBlur = () => {},
      onFocus = () => {},
      onKeyDown = () => {},
      onClear,
      id,
      name,
      autoFocus,
      disabled = false,
      readOnly = false,
      autosize = false,
      maxLength,
      showCounter = false,
      minRows = 3,
      maxRows,
      className,
      ...props
    },
    ref
  ) => {
    const textareaId = React.useId()
    const finalId = id || textareaId
    const effectiveVariant = variant || viewType || 'outlined'
    const effectiveTypography = typography || size || 'bodyM'
    const textareaElementRef = React.useRef<HTMLTextAreaElement>(null)
    const combinedRef = React.useMemo(() => {
      return (node: HTMLTextAreaElement | null) => {
        textareaElementRef.current = node
        if (typeof textareaRef === 'function') {
          textareaRef(node)
        } else if (textareaRef) {
          (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
        }
      }
    }, [textareaRef])
    
    // Auto-resize functionality
    React.useEffect(() => {
      const textarea = textareaElementRef.current
      if (!textarea || (!autosize && maxRows === undefined)) return
      
      const adjustHeight = () => {
        textarea.style.height = 'auto'
        const scrollHeight = textarea.scrollHeight
        if (autosize) {
          textarea.style.height = `${scrollHeight}px`
        } else if (maxRows !== undefined) {
          const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight)
          const maxHeight = lineHeight * maxRows
          if (scrollHeight <= maxHeight) {
            textarea.style.height = `${scrollHeight}px`
          } else {
            textarea.style.height = `${maxHeight}px`
            textarea.style.overflowY = 'auto'
          }
        }
      }
      
      adjustHeight()
      textarea.addEventListener('input', adjustHeight)
      
      return () => {
        textarea.removeEventListener('input', adjustHeight)
      }
    }, [value, autosize, maxRows])
    
    React.useEffect(() => {
      if (autosize && value) {
        const textarea = textareaElementRef.current
        if (textarea) {
          textarea.style.height = 'auto'
          textarea.style.height = `${textarea.scrollHeight}px`
        }
      }
    }, [value, autosize])
    
    const currentLength = value?.length || 0
    const effectiveHasError = hasError || (maxLength !== undefined && currentLength > maxLength)
    const hasWarning = !!warning
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e)
    }
    
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onBlur(e)
    }
    
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      onFocus(e)
    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown(e)
    }
    
    return (
      <TextareaContainer
        ref={ref}
        warning={hasWarning}
        disabled={disabled}
        readOnly={readOnly}
        className={className}
        css={css}
      >
        <StyledBackgroundWrapper>
          {effectiveVariant === 'filled' && label && (
            <StyledLabel htmlFor={finalId}>
              {label}
            </StyledLabel>
          )}
          {effectiveVariant === 'outlined' && label && (
            <StyledLabel htmlFor={finalId}>
              {label}
            </StyledLabel>
          )}
          <StyledTextarea
            {...props}
            ref={combinedRef}
            id={finalId}
            name={name}
            value={value}
            placeholder={effectiveVariant === 'filled' ? undefined : placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            readOnly={readOnly}
            autoFocus={autoFocus}
            maxLength={maxLength}
            rows={autosize ? 1 : minRows}
            textAlign={textAlign}
            aria-describedby={description || warning ? `${finalId}_description` : undefined}
            aria-invalid={effectiveHasError}
            role="textbox"
            aria-multiline={true}
          />
          {!!value && !!onClear && !disabled && !readOnly && (
            <button
              type="button"
              title="Очистить"
              tabIndex={0}
              onClick={onClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onClear()
                }
              }}
            >
              ×
            </button>
          )}
        </StyledBackgroundWrapper>
        {(description || warning || showCounter) && (
          <StyledFooter>
            <StyledFooterLeft>
              {description && (
                <StyledDescription id={`${finalId}_description`}>
                  {description}
                </StyledDescription>
              )}
              {warning && (
                <StyledError role="alert" aria-live="polite" aria-atomic={true}>
                  {warning}
                </StyledError>
              )}
            </StyledFooterLeft>
            {showCounter && maxLength !== undefined && (
              <StyledCounter>
                {currentLength} / {maxLength}
              </StyledCounter>
            )}
          </StyledFooter>
        )}
      </TextareaContainer>
    )
  }
)

Textarea.displayName = 'Textarea'

