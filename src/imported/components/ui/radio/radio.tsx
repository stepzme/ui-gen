import * as React from 'react'
import { styled, type CSS, typography } from '@/imported/styles/stitches.config'

export type Typography = 'bodyS' | 'bodyM' | 'bodyL'

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Метка радиокнопки
   */
  label?: React.ReactNode
  /**
   * Описание радиокнопки
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
   * Размер радиокнопки через типографику
   * @default 'bodyM'
   */
  typography?: Typography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: Typography
  /**
   * Имя группы радиокнопок (обязательно для группировки)
   */
  name?: string
  /**
   * Значение радиокнопки
   */
  value?: string
  /**
   * Выбрана ли радиокнопка
   */
  checked?: boolean
  /**
   * Обработчик изменения состояния
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
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

// Wrapper - обертка всего радиокнопки
const StyledWrapper = styled('label', {
  display: 'flex',
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
    typography: {
      bodyS: {
        gap: '$x2', // 8px
      },
      bodyM: {
        gap: '$x3', // 12px
      },
      bodyL: {
        gap: '$x4', // 16px
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
    disabled: false,
  },
})

// Container - сам input элемент
const StyledContainer = styled('input', {
  position: 'relative',
  margin: 0,
  flex: '0 0 auto',
  appearance: 'none',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  outline: 'none',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    border: '2px solid',
    borderRadius: '50%',
    borderColor: 'var(--semantic-neutral-40)',
    backgroundColor: 'transparent',
    transitionProperty: 'border-color, background-color',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
  },
  
  '&:checked': {
    '&::before': {
      borderColor: 'var(--semantic-primary-60)',
      backgroundColor: 'var(--semantic-primary-60)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: 'var(--semantic-neutral-100)',
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
    '&:checked': {
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
        '&:checked::after': {
          width: '$x1', // 4px
          height: '$x1',
        },
      },
      bodyM: {
        width: '$x5', // 20px
        height: '$x5',
        minWidth: '$x5',
        minHeight: '$x5',
        '&:checked::after': {
          width: '6px',
          height: '6px',
        },
      },
      bodyL: {
        width: '$x6', // 24px
        height: '$x6',
        minWidth: '$x6',
        minHeight: '$x6',
        '&:checked::after': {
          width: '$x2', // 8px
          height: '$x2',
        },
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
            '&:checked': {
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

// Content - контент справа от радиокнопки
const StyledContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x1', // 4px
  flex: 1,
  
  variants: {
    typography: {
      bodyS: {
        paddingTop: '$x1', // 4px
      },
      bodyM: {
        paddingTop: '$x2', // 8px
      },
      bodyL: {
        paddingTop: '$x3', // 12px
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
  },
})

// Label - метка радиокнопки
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
  },
  
  defaultVariants: {
    typography: 'bodyM',
    checked: false,
  },
})

// Description - описание
const StyledDescription = styled('div', {
  ...typography.bodyM_tight_normal,
  color: 'var(--semantic-text-secondary)',
  
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
  },
  
  defaultVariants: {
    typography: 'bodyM',
  },
})

// Warning - текст предупреждения/ошибки
const StyledWarning = styled('div', {
  ...typography.bodyM_tight_normal,
  color: 'var(--semantic-text-warning)',
  
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
  },
  
  defaultVariants: {
    typography: 'bodyM',
  },
})

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      id,
      label,
      description,
      warning,
      hasError = false,
      typography,
      size,
      name,
      value,
      checked,
      onChange,
      disabled,
      className,
      css,
      dataTestId,
      'data-test-id': dataTestIdProp,
      ...props
    },
    ref
  ) => {
    const radioId = React.useId()
    const finalId = id || radioId
    const effectiveTypography = typography || size || 'bodyM'
    const finalDataTestId = dataTestIdProp || dataTestId || 'Radio'
    const descriptionId = React.useMemo(() => `${finalId}_description`, [finalId])
    
    return (
      <StyledWrapper
        disabled={disabled}
        typography={effectiveTypography}
        className={className}
        css={css}
      >
        <StyledContainer
          {...props}
          ref={ref}
          id={finalId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          typography={effectiveTypography}
          hasError={hasError}
          aria-describedby={description || warning ? descriptionId : undefined}
          data-test-id={finalDataTestId}
        />
        {(label || description || warning) && (
          <StyledContent typography={effectiveTypography}>
            {label && (
              <StyledLabel
                typography={effectiveTypography}
                checked={checked}
                aria-hidden="true"
              >
                {label}
              </StyledLabel>
            )}
            {description && (
              <StyledDescription
                id={descriptionId}
                typography={effectiveTypography}
                aria-hidden="true"
              >
                {description}
              </StyledDescription>
            )}
            {warning && (
              <StyledWarning
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

Radio.displayName = 'Radio'

