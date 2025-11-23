import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export type TextAlign = 'left' | 'right' | 'center'

export interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Значение инпута
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
   * Дополнительный текст
   */
  additionalText?: React.ReactNode
  /**
   * Описание поля
   */
  description?: React.ReactNode
  /**
   * Текст ошибки
   */
  errorText?: React.ReactNode
  /**
   * Элемент слева внутри поля ввода
   */
  leftSide?: React.ReactNode
  /**
   * Элемент справа внутри поля ввода
   */
  rightSide?: React.ReactNode
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
   * Ref для input элемента
   */
  inputRef?: React.Ref<HTMLInputElement>
  /**
   * Обработчик изменения значения
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Обработчик клика
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  /**
   * ID для input элемента
   */
  id?: string
  /**
   * Тип input элемента
   */
  type?: string
  /**
   * Имя input элемента
   */
  name?: string
  /**
   * Автофокус
   */
  autoFocus?: boolean
  /**
   * Скрыть поле ввода
   * @default false
   */
  hideInputField?: boolean
  /**
   * Предупреждение
   * @default false
   */
  warning?: boolean
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
   * Узкий вариант
   * @default false
   */
  tight?: boolean
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

// InputRow - горизонтальная обертка для InputContainer и RightText (layout из meta)
const StyledInputRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 'var(--x-base-200)', // x2 = 8px
  width: '100%',
})

// InputContainer - обертка элемента инпута (layout из meta)
const StyledInputContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 'var(--x-base-200)', // x2 = 8px
  flex: 1,
  minWidth: 0,
})

// LeftSide - обертка элемента слева внутри поля ввода (layout из meta)
const StyledLeftSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
})

// RightSide - обертка элемента справа внутри поля ввода (layout из meta)
const StyledRightSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
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

// Input - элемент поля ввода (layout + typography из meta + визуальные стили)
const StyledInput = styled('input', {
  // Layout из meta
  flex: 1,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  // Typography из meta
  fontSize: '$fontSizes.bodyM',
  lineHeight: '$lineHeights["body-m-tight"]',
  // Визуальные стили из UI
  backgroundColor: 'transparent',
  color: 'var(--components-input-text-value)',
  opacity: 1,
  fontWeight: '$bodyRegular',
  width: '100%',
  
  '&::placeholder': {
    color: 'var(--components-input-text-placeholder)',
    fontWeight: '$bodyRegular',
  },
  
  '&:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px var(--semantic-neutral-4) inset !important',
    WebkitTextFillColor: 'var(--components-input-text-value) !important',
    caretColor: 'var(--components-input-text-value) !important',
    transition: 'background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s',
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

// AdditionalText - дополнительное описание (typography + layout из meta + визуальные стили)
const StyledAdditionalText = styled('div', {
  // Typography из meta
  fontSize: '$fontSizes.bodyS',
  lineHeight: '$lineHeights["body-s-paragraph"]',
  // Layout из meta
  flexShrink: 0,
  // Визуальные стили из UI
  color: 'var(--components-input-text-additional)',
})

// RightText - дополнительный текст внутри поля (typography из meta + визуальные стили)
const StyledRightText = styled('div', {
  // Typography из meta
  fontSize: '$fontSizes.bodyM',
  lineHeight: '$lineHeights["body-m-tight"]',
  // Визуальные стили из UI
  color: 'var(--semantic-text-secondary)',
})

// Placeholder - текст-заглушка (typography из meta + визуальные стили)
const StyledPlaceholder = styled('div', {
  // Typography из meta
  fontSize: '$fontSizes.bodyM',
  lineHeight: '$lineHeights["body-m-tight"]',
  // Визуальные стили из UI
  color: 'var(--semantic-primary-70)',
  fontWeight: '$bodyRegular',
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
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
  gap: 'var(--x-base-200)', // x2 = 8px
  marginTop: 'var(--x-base-200)', // x2 = 8px
  width: '100%',
})

// FooterColumn - вертикальная колонка для description и error (layout из meta)
const StyledFooterColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--x-base-100)', // x1 = 4px
  flex: 1,
  minWidth: 0,
})

// Основной контейнер (variants структура из meta + визуальные стили)
const InputContainer = styled('div', {
  '&:focus-visible': {
    outline: '2px solid var(--color-scheme-brand-primary)',
    outlineOffset: '-2px',
  },
  
  '&:focus-within': {
    [`& ${StyledRightText}`]: {
      display: 'none',
    },
    [`& ${StyledPlaceholder}`]: {
      display: 'none',
    },
  },
  
  '&:hover': {
    [`& ${StyledBackgroundWrapper}`]: {
      background: 'var(--semantic-neutral-8)',
    },
  },
  
  [`&:has(${StyledInput}:focus)`]: {
    [`& ${StyledBackgroundWrapper}`]: {
      background: 'var(--semantic-neutral-8)',
      border: '1px solid var(--components-input-border-active)',
    },
  },
  
  '&:has(input:focus):hover': {
    [`& ${StyledBackgroundWrapper}`]: {
      background: 'var(--semantic-neutral-8)',
      border: '1px solid var(--components-input-border-active)',
    },
  },
  
  variants: {
    hideInputField: {
      true: {
        [`& ${StyledInput}`]: {
          position: 'absolute',
          opacity: 0,
          height: 1,
          width: 1,
        },
      },
    },
    warning: {
      true: {
        [`& ${StyledBackgroundWrapper}`]: {
          background: 'var(--semantic-warning-4)',
        },
        '&:hover': {
          [`& ${StyledBackgroundWrapper}`]: {
            background: 'var(--semantic-warning-8)',
          },
        },
        [`&:has(${StyledInput}:focus)`]: {
          [`& ${StyledBackgroundWrapper}`]: {
            background: 'var(--semantic-warning-8)',
            border: '1px solid var(--components-input-border-warning)',
          },
        },
        '&:has(input:focus):hover': {
          [`& ${StyledBackgroundWrapper}`]: {
            background: 'var(--semantic-warning-8)',
            border: '1px solid var(--components-input-border-warning)',
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
        [`& ${StyledRightText}`]: {
          display: 'block',
        },
      },
    },
    readOnly: {
      true: {
        [`& ${StyledBackgroundWrapper}`]: {
          background: 'var(--semantic-neutral-4)',
          opacity: 0.6,
        },
        [`& ${StyledInput}`]: {
          color: 'var(--components-input-text-value)',
        },
        [`& ${StyledRightText}`]: {
          display: 'block',
        },
      },
    },
    filled: {
      true: {
        [`& ${StyledInput}`]: {
          fontWeight: '$bodyMedium',
        },
      },
    },
    tight: {
      true: {},
    },
    textAlign: {
      left: {},
      right: {},
      center: {},
    },
  },
})

export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  (
    {
      label,
      placeholder,
      additionalText,
      description,
      errorText,
      leftSide,
      rightSide,
      textAlign = 'left',
      value,
      inputRef,
      onChange,
      onClick,
      id,
      type = 'text',
      name,
      autoFocus,
      css,
      hideInputField,
      warning,
      disabled,
      readOnly,
      tight,
      ...containerProps
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const hasValue = !!value
    const showPlaceholder = !hasValue && !!placeholder

    return (
      <InputContainer
        ref={ref}
        css={css}
        textAlign={textAlign}
        filled={hasValue}
        hideInputField={hideInputField}
        warning={warning}
        disabled={disabled}
        readOnly={readOnly}
        tight={tight}
        {...containerProps}
      >
        <StyledBackgroundWrapper onClick={onClick}>
          {label && (
            <StyledLabel 
              htmlFor={inputId} 
              aria-hidden="true"
              onMouseDown={(e) => {
                e.preventDefault()
                inputRef && 'current' in inputRef && inputRef.current?.focus()
              }}
            >
              {label}
            </StyledLabel>
          )}
          <StyledInputRow>
            <StyledInputContainer
              onMouseDown={(e) => {
                if (inputRef && 'current' in inputRef && inputRef.current && e.target !== inputRef.current) {
                  e.preventDefault()
                  inputRef.current.focus()
                }
              }}
            >
              {leftSide && (
                <StyledLeftSide aria-hidden="true">
                  {leftSide}
                </StyledLeftSide>
              )}
              <div style={{ position: 'relative', flex: 1, minWidth: 0, width: '100%' }}>
                <StyledInput
                  ref={inputRef}
                  id={inputId}
                  type={type}
                  name={name}
                  value={value}
                  placeholder={showPlaceholder ? undefined : placeholder}
                  onChange={onChange}
                  autoFocus={autoFocus}
                  textAlign={textAlign}
                  disabled={disabled}
                  readOnly={readOnly}
                />
                {showPlaceholder && (
                  <StyledPlaceholder aria-hidden="true" textAlign={textAlign}>
                    {placeholder}
                  </StyledPlaceholder>
                )}
              </div>
              {rightSide && (
                <StyledRightSide>
                  {rightSide}
                </StyledRightSide>
              )}
            </StyledInputContainer>
          </StyledInputRow>
        </StyledBackgroundWrapper>
        {(description || errorText || additionalText) && (
          <StyledFooter>
            <StyledFooterColumn>
              {description && (
                <StyledDescription>{description}</StyledDescription>
              )}
              {errorText && <StyledError>{errorText}</StyledError>}
            </StyledFooterColumn>
            {additionalText && !disabled && (
              <StyledAdditionalText>{additionalText}</StyledAdditionalText>
            )}
          </StyledFooter>
        )}
      </InputContainer>
    )
  }
)

Input.displayName = 'Input'
