import * as React from 'react'
import { styled, type CSS, typography } from '@/imported/styles/stitches.config'

export type Typography = 'bodyS' | 'bodyM' | 'bodyL'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Метка чекбокса
   */
  label?: React.ReactNode
  /**
   * Описание чекбокса
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
   * Размер чекбокса через типографику
   * @default 'bodyM'
   */
  typography?: Typography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: Typography
  /**
   * Состояние: checked, unchecked, indeterminate
   */
  checked?: boolean | 'indeterminate'
  /**
   * Обработчик изменения состояния
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Что показывать только читалкам после лейбла (например, ссылки)
   */
  hiddenLabelSlot?: React.ReactNode
  /**
   * Что показывать только читалкам после описания (например, ссылки)
   */
  hiddenDescriptionSlot?: React.ReactNode
  /**
   * Пропсы для лейбла
   */
  labelProps?: React.HTMLAttributes<HTMLLabelElement>
  /**
   * Пропсы для описания
   */
  descriptionProps?: React.HTMLAttributes<HTMLDivElement>
  /**
   * Пропсы для сообщения об ошибке
   */
  warningProps?: React.HTMLAttributes<HTMLDivElement>
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

// Wrapper - обертка всего чекбокса
const StyledWrapper = styled('label', {
  display: 'inline-flex',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',
  ...typography.bodyM_tight_normal,
  
  variants: {
    disabled: {
      true: {
        opacity: 0.6,
        cursor: 'not-allowed',
      },
    },
  },
})

// Container - сам input элемент
const StyledContainer = styled('input', {
  display: 'inline-block',
  position: 'relative',
  flex: '0 0 auto',
  margin: 0,
  appearance: 'none',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  outline: 'none',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: '2px solid',
    borderRadius: '$x1',
    opacity: 1,
    transitionProperty: 'background-color, opacity, border-color',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
    borderColor: 'var(--semantic-neutral-40)',
    backgroundColor: 'transparent',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    height: '50%',
    border: `0 solid var(--semantic-neutral-100)`,
    boxSizing: 'border-box',
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
  },
  
  '&:checked': {
    '&::before': {
      backgroundColor: 'var(--semantic-primary-60)',
      borderColor: 'var(--semantic-primary-60)',
    },
    '&::after': {
      left: '38%',
      top: '18%',
      width: '25%',
      borderRightWidth: '2px',
      borderBottomWidth: '2px',
      opacity: 1,
      transform: 'rotate(45deg)',
      transformOrigin: 'center',
    },
  },
  
  '&:indeterminate': {
    '&::before': {
      backgroundColor: 'var(--semantic-primary-60)',
      borderColor: 'var(--semantic-primary-60)',
    },
    '&::after': {
      left: 0,
      top: '1px',
      width: '50%',
      borderBottomWidth: '2px',
      opacity: 1,
      transform: 'rotate(0) translateX(50%)',
    },
  },
  
  '&:focus-visible': {
    '&::before': {
      outline: '2px solid var(--semantic-primary-60)',
      outlineOffset: '1px',
    },
  },
  
  '&:disabled': {
    cursor: 'not-allowed',
    '&::before': {
      borderColor: 'var(--semantic-neutral-32)',
    },
    '&:checked, &:indeterminate': {
      '&::before': {
        backgroundColor: 'var(--semantic-neutral-32)',
        borderColor: 'var(--semantic-neutral-32)',
      },
    },
  },
  
  variants: {
    typography: {
      bodyS: {
        width: '$x4', // 16px
        height: '$x4',
        minWidth: '$x4',
        minHeight: '$x4',
      },
      bodyM: {
        width: '$x5', // 20px
        height: '$x5',
        minWidth: '$x5',
        minHeight: '$x5',
      },
      bodyL: {
        width: '$x6', // 24px
        height: '$x6',
        minWidth: '$x6',
        minHeight: '$x6',
      },
    },
    hasError: {
      true: {
        '&:focus-visible': {
          '&::before': {
            outline: '2px solid var(--semantic-warning-60)',
            outlineOffset: '1px',
          },
        },
        '&, &:disabled': {
          '&, &:hover, &:active': {
            '&::before': {
              borderColor: 'var(--semantic-warning-60)',
            },
            '&:checked, &:indeterminate': {
              '&::before': {
                backgroundColor: 'var(--semantic-warning-60)',
                borderColor: 'var(--semantic-warning-60)',
              },
            },
          },
        },
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
    hasError: false,
  },
})

// Content - контент справа от чекбокса
const StyledContent = styled('div', {
  marginLeft: '$x3', // 12px для bodyM
  display: 'flex',
  flexDirection: 'column',
  gap: '$x1', // 4px
  flex: 1,
  
  variants: {
    typography: {
      bodyS: {
        marginLeft: '$x2', // 8px
      },
      bodyM: {
        marginLeft: '$x3', // 12px
      },
      bodyL: {
        marginLeft: '$x4', // 16px
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
  },
})

// Label - метка чекбокса
const StyledLabel = styled('span', {
  ...typography.bodyM_tight_normal,
  color: 'var(--semantic-text-primary)',
  
  variants: {
    typography: {
      bodyS: {
        ...typography.bodyS_tight_normal,
      },
      bodyM: {
        ...typography.bodyM_tight_normal,
      },
      bodyL: {
        ...typography.bodyL_tight_normal,
      },
    },
    checked: {
      true: {
        fontWeight: '$bodySemiBold',
      },
    },
    indeterminate: {
      true: {
        fontWeight: '$bodySemiBold',
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
    checked: false,
    indeterminate: false,
  },
})

// Description - описание
const StyledDescription = styled('div', {
  ...typography.bodyM_tight_normal,
  color: 'var(--semantic-text-secondary)',
  paddingTop: '$x2', // 8px для bodyM
  
  variants: {
    typography: {
      bodyS: {
        ...typography.bodyS_tight_normal,
        paddingTop: '$x1', // 4px
      },
      bodyM: {
        ...typography.bodyM_tight_normal,
        paddingTop: '$x2', // 8px
      },
      bodyL: {
        ...typography.bodyL_tight_normal,
        paddingTop: '$x3', // 12px
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
  },
})

// Warning - текст предупреждения/ошибки
const StyledWarning = styled('div', {
  ...typography.bodyM_tight_normal,
  color: 'var(--semantic-text-warning)',
  paddingTop: '$x2', // 8px для bodyM
  
  variants: {
    typography: {
      bodyS: {
        ...typography.bodyS_tight_normal,
        paddingTop: '$x1', // 4px
      },
      bodyM: {
        ...typography.bodyM_tight_normal,
        paddingTop: '$x2', // 8px
      },
      bodyL: {
        ...typography.bodyL_tight_normal,
        paddingTop: '$x3', // 12px
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
  },
})

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      description,
      warning,
      hasError = false,
      typography,
      size,
      checked,
      onChange,
      disabled,
      className,
      css,
      dataTestId,
      hiddenLabelSlot,
      hiddenDescriptionSlot,
      labelProps,
      descriptionProps,
      warningProps,
      'data-test-id': dataTestIdProp,
      ...props
    },
    ref
  ) => {
    const checkboxId = React.useId()
    const finalId = id || checkboxId
    const effectiveTypography = typography || size || 'bodyM'
    const finalDataTestId = dataTestIdProp || dataTestId || 'Checkbox'
    
    const isChecked = checked === true
    const isIndeterminate = checked === 'indeterminate'
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked, e)
      }
    }
    
    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = isIndeterminate
      }
    }, [isIndeterminate, ref])
    
    return (
      <StyledWrapper disabled={disabled} className={className} css={css}>
        <StyledContainer
          {...props}
          ref={ref}
          id={finalId}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          typography={effectiveTypography}
          hasError={hasError}
          data-test-id={finalDataTestId}
        />
        {(label || description || warning || hiddenLabelSlot || hiddenDescriptionSlot) && (
          <StyledContent typography={effectiveTypography}>
            {label && (
              <StyledLabel
                {...labelProps}
                htmlFor={finalId}
                typography={effectiveTypography}
                checked={isChecked}
                indeterminate={isIndeterminate}
                aria-hidden="true"
              >
                {label}
              </StyledLabel>
            )}
            {hiddenLabelSlot && <span style={{ display: 'none' }}>{hiddenLabelSlot}</span>}
            {description && (
              <StyledDescription 
                {...descriptionProps}
                typography={effectiveTypography} 
                aria-hidden="true"
              >
                {description}
              </StyledDescription>
            )}
            {hiddenDescriptionSlot && <span style={{ display: 'none' }}>{hiddenDescriptionSlot}</span>}
            {warning && (
              <StyledWarning
                {...warningProps}
                typography={effectiveTypography}
                role="alert"
                aria-live="polite"
                aria-atomic="true"
              >
                {warning}
              </StyledWarning>
            )}
          </StyledContent>
        )}
      </StyledWrapper>
    )
  }
)

Checkbox.displayName = 'Checkbox'

