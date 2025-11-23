import * as React from 'react'
import { styled, type CSS, typography } from '@/imported/styles/stitches.config'

export type Typography = 'bodyS' | 'bodyM' | 'bodyL'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Метка переключателя
   */
  label?: React.ReactNode
  /**
   * Описание переключателя
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
   * Размер переключателя через типографику
   * @default 'bodyM'
   */
  typography?: Typography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: Typography
  /**
   * Активен ли переключатель (checked)
   */
  isActive?: boolean
  /**
   * Обработчик изменения состояния
   */
  onChange?: (isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void
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

// Wrapper - обертка всего переключателя
const StyledWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  ...typography.bodyM_tight_normal,
  
  variants: {
    typography: {
      bodyS: {
        gap: '$x1', // 4px
      },
      bodyM: {
        gap: '$x1', // 4px
      },
      bodyL: {
        gap: '$x1', // 4px
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
  },
})

// Label - обертка для Container и LabelValue
const StyledLabel = styled('label', {
  display: 'flex',
  alignItems: 'center',
  gap: '$x3', // 12px для bodyM
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',
  
  variants: {
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
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
    disabled: false,
  },
})

// Container - сам input элемент (переключатель)
const StyledContainer = styled('input', {
  position: 'relative',
  margin: 0,
  border: 0,
  borderRadius: '$x6', // 24px
  appearance: 'none',
  cursor: 'pointer',
  opacity: 1,
  overflow: 'hidden',
  transitionProperty: 'background-color',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-in-out',
  flexShrink: 0,
  backgroundColor: 'var(--semantic-neutral-40)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '$x50', // 2px
    bottom: '$x50',
    left: '$x50',
    boxSizing: 'border-box',
    borderRadius: '$x6',
    backgroundColor: 'var(--semantic-neutral-100)',
    transition: 'left 0.2s ease-in-out, right 0.2s ease-in-out',
  },
  
  '&:focus-visible': {
    outline: '2px solid var(--semantic-primary-60)',
    outlineOffset: '1px',
  },
  
  '@media (hover: hover)': {
    '&:hover': {
      backgroundColor: 'var(--semantic-neutral-48)',
    },
  },
  
  '&:active': {
    backgroundColor: 'var(--semantic-neutral-56)',
  },
  
  '&:disabled': {
    cursor: 'not-allowed',
    '&:hover, &:focus, &:active': {
      backgroundColor: 'var(--semantic-neutral-40)',
    },
  },
  
  variants: {
    typography: {
      bodyS: {
        width: '$x8', // 32px
        height: '$x4', // 16px
        '&::before': {
          width: '$x3', // 12px
          height: '$x3',
        },
      },
      bodyM: {
        width: '$x9', // 36px
        height: '$x5', // 20px
        '&::before': {
          width: '$x4', // 16px
          height: '$x4',
        },
      },
      bodyL: {
        width: '$x10', // 40px
        height: '$x6', // 24px
        '&::before': {
          width: '$x5', // 20px
          height: '$x5',
        },
      },
    },
    isActive: {
      true: {
        backgroundColor: 'var(--semantic-primary-60)',
        '&::before': {
          left: 'auto',
          right: '$x50', // 2px
        },
        '@media (hover: hover)': {
          '&:hover': {
            backgroundColor: 'var(--semantic-primary-70)',
          },
        },
        '&:active': {
          backgroundColor: 'var(--semantic-primary-80)',
        },
        '&:disabled': {
          backgroundColor: 'var(--semantic-primary-60)',
          '&:hover, &:focus, &:active': {
            backgroundColor: 'var(--semantic-primary-60)',
          },
        },
      },
    },
    hasError: {
      true: {
        '&:focus-visible': {
          outline: '2px solid var(--semantic-warning-60)',
          outlineOffset: '1px',
        },
        '&:active': {
          backgroundColor: 'var(--semantic-warning-60)',
        },
        '&, &:disabled': {
          '&, &:hover, &:focus, &:active': {
            backgroundColor: 'var(--semantic-warning-60)',
          },
        },
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
    isActive: false,
    hasError: false,
  },
})

// LabelValue - текст метки
const StyledLabelValue = styled('span', {
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
    isActive: {
      true: {
        fontWeight: '$bodySemiBold',
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
    isActive: false,
  },
})

// Content - контент для description и warning
const StyledContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x1', // 4px
  
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

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      id,
      label,
      description,
      warning,
      hasError = false,
      typography,
      size,
      isActive,
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
    const switchId = React.useId()
    const finalId = id || switchId
    const effectiveTypography = typography || size || 'bodyM'
    const finalDataTestId = dataTestIdProp || dataTestId || 'Switch'
    const descriptionId = React.useMemo(() => `${finalId}_description`, [finalId])
    
    const [internalActive, setInternalActive] = React.useState(!!isActive)
    
    React.useEffect(() => {
      if (isActive !== undefined) {
        setInternalActive(!!isActive)
      }
    }, [isActive])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.checked
      setInternalActive(newValue)
      if (onChange) {
        onChange(newValue, e)
      }
    }
    
    const currentActive = isActive !== undefined ? isActive : internalActive
    
    return (
      <StyledWrapper
        typography={effectiveTypography}
        className={className}
        css={{ ...css, opacity: disabled ? 0.6 : undefined }}
      >
        <StyledLabel
          htmlFor={finalId}
          typography={effectiveTypography}
          disabled={disabled}
        >
          <StyledContainer
            {...props}
            ref={ref}
            id={finalId}
            type="checkbox"
            role="switch"
            checked={currentActive}
            disabled={disabled}
            onChange={handleChange}
            typography={effectiveTypography}
            isActive={currentActive}
            hasError={hasError}
            aria-describedby={description || warning ? descriptionId : undefined}
            data-test-id={finalDataTestId}
          />
          {label && (
            <StyledLabelValue
              typography={effectiveTypography}
              isActive={currentActive}
              aria-hidden="true"
            >
              {label}
            </StyledLabelValue>
          )}
        </StyledLabel>
        {(description || warning) && (
          <StyledContent typography={effectiveTypography}>
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

Switch.displayName = 'Switch'

