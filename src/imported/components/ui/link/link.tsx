import * as React from 'react'
import { styled, type CSS, typography } from '@/imported/styles/stitches.config'

export type Typography = 'bodyS' | 'bodyM' | 'bodyL'
export type ColorScheme = 'brand' | 'success' | 'info' | 'warning' | 'critical' | 'primary' | 'constant' | 'draft'

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'size'> {
  /**
   * Дочерние элементы (текст и/или иконки)
   */
  children: React.ReactNode
  /**
   * URL ссылки
   */
  href?: string
  /**
   * Целевой атрибут для ссылки
   */
  target?: string
  /**
   * Обработчик клика
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>) => void
  /**
   * Цветовая схема ссылки
   * @default 'brand'
   */
  colorScheme?: ColorScheme
  /**
   * Размер через типографику
   * @default 'bodyM'
   */
  typography?: Typography
  /**
   * Отключена ли ссылка
   * @default false
   */
  disabled?: boolean
  /**
   * Блочное отображение
   * @default false
   */
  block?: boolean
  /**
   * Кастомный элемент (as prop)
   */
  as?: React.ElementType
  /**
   * Автофокус
   * @default false
   */
  autoFocus?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
  /**
   * ID для тестирования
   */
  dataTestId?: string
}

// Container - базовая ссылка
const StyledContainer = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  verticalAlign: 'bottom',
  padding: 0,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  opacity: 1,
  textDecoration: 'none',
  WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',
  
  '&:focus-visible': {
    outline: '2px solid var(--color-scheme-brand-primary)',
    borderRadius: '2px',
    outlineOffset: '1px',
  },
  
  '&:disabled, &[disabled]': {
    cursor: 'not-allowed',
    opacity: 0.5,
    pointerEvents: 'none',
  },
  
  variants: {
    block: {
      true: {
        display: 'flex',
      },
    },
    typography: {
      bodyS: {
        ...typography.bodyS_tight_normal,
        gap: '$x2', // 8px
        '& svg': {
          fontSize: '$x4', // 16px
        },
      },
      bodyM: {
        ...typography.bodyM_tight_normal,
        gap: '$x2', // 8px
        '& svg': {
          fontSize: '$x5', // 20px
        },
      },
      bodyL: {
        ...typography.bodyL_tight_normal,
        gap: '$x3', // 12px
        '& svg': {
          fontSize: '$x6', // 24px
        },
      },
    },
    colorScheme: {
      brand: {
        color: 'var(--components-link-brand-text-normal)',
        '& svg': {
          fill: 'var(--components-link-brand-icon-normal)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--components-link-brand-text-hover)',
            '& svg': {
              fill: 'var(--components-link-brand-icon-hover)',
            },
          },
        },
        '&:active': {
          color: 'var(--components-link-brand-text-click)',
          '& svg': {
            fill: 'var(--components-link-brand-icon-click)',
          },
        },
      },
      success: {
        color: 'var(--components-link-success-text-normal)',
        '& svg': {
          fill: 'var(--components-link-success-icon-normal)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--components-link-success-text-hover)',
            '& svg': {
              fill: 'var(--components-link-success-icon-hover)',
            },
          },
        },
        '&:active': {
          color: 'var(--components-link-success-text-click)',
          '& svg': {
            fill: 'var(--components-link-success-icon-click)',
          },
        },
      },
      info: {
        color: 'var(--components-link-info-text-normal)',
        '& svg': {
          fill: 'var(--components-link-info-icon-normal)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--components-link-info-text-hover)',
            '& svg': {
              fill: 'var(--components-link-info-icon-hover)',
            },
          },
        },
        '&:active': {
          color: 'var(--components-link-info-text-click)',
          '& svg': {
            fill: 'var(--components-link-info-icon-click)',
          },
        },
      },
      warning: {
        color: 'var(--components-link-warning-text-normal)',
        '& svg': {
          fill: 'var(--components-link-warning-icon-normal)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--components-link-warning-text-hover)',
            '& svg': {
              fill: 'var(--components-link-warning-icon-hover)',
            },
          },
        },
        '&:active': {
          color: 'var(--components-link-warning-text-click)',
          '& svg': {
            fill: 'var(--components-link-warning-icon-click)',
          },
        },
      },
      critical: {
        color: 'var(--components-link-critical-text-normal)',
        '& svg': {
          fill: 'var(--components-link-critical-icon-normal)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--components-link-critical-text-hover)',
            '& svg': {
              fill: 'var(--components-link-critical-icon-hover)',
            },
          },
        },
        '&:active': {
          color: 'var(--components-link-critical-text-click)',
          '& svg': {
            fill: 'var(--components-link-critical-icon-click)',
          },
        },
      },
      primary: {
        color: 'var(--components-link-primary-text-normal)',
        '& svg': {
          fill: 'var(--components-link-primary-icon-normal)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--semantic-primary-70)',
            '& svg': {
              fill: 'var(--semantic-primary-70)',
            },
          },
        },
        '&:active': {
          color: 'var(--semantic-primary-80)',
          '& svg': {
            fill: 'var(--semantic-primary-80)',
          },
        },
      },
      constant: {
        color: 'var(--components-link-constant-text-normal)',
        '& svg': {
          fill: 'var(--components-link-constant-icon-normal)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--components-link-constant-text-hover)',
            '& svg': {
              fill: 'var(--components-link-constant-icon-hover)',
            },
          },
        },
        '&:active': {
          color: 'var(--components-link-constant-text-click)',
          '& svg': {
            fill: 'var(--components-link-constant-icon-click)',
          },
        },
      },
      draft: {
        color: 'var(--components-link-neutral-text-normal)',
        '& svg': {
          fill: 'var(--components-link-neutral-icon-normal)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--components-link-neutral-text-hover)',
            '& svg': {
              fill: 'var(--components-link-neutral-icon-hover)',
            },
          },
        },
        '&:active': {
          color: 'var(--components-link-neutral-text-click)',
          '& svg': {
            fill: 'var(--components-link-neutral-icon-click)',
          },
        },
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
        pointerEvents: 'none',
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
    colorScheme: 'brand',
    block: false,
    disabled: false,
  },
})

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      href,
      target,
      onClick,
      colorScheme = 'brand',
      typography = 'bodyM',
      disabled = false,
      block = false,
      as,
      autoFocus,
      className,
      css,
      dataTestId,
      ...props
    },
    ref
  ) => {
    const isAnchor = !as || as === 'a'
    const linkRef = React.useRef<HTMLAnchorElement>(null)
    const combinedRef = React.useMemo(() => {
      return (node: HTMLAnchorElement | null) => {
        linkRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLAnchorElement | null>).current = node
        }
      }
    }, [ref])
    
    React.useEffect(() => {
      if (autoFocus && linkRef.current) {
        linkRef.current.focus()
      }
    }, [autoFocus])
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      
      if (e.key === 'Enter') {
        if (onClick) {
          onClick(e)
        }
        if (href && !isAnchor) {
          window.open(href, target || '_blank')
        }
      }
    }
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      
      if (onClick) {
        onClick(e)
      }
      
      if (href && !isAnchor) {
        window.open(href, target || '_blank')
      }
    }
    
    const Component = as || 'a'
    
    return (
      <StyledContainer
        as={Component}
        ref={combinedRef}
        href={disabled ? undefined : href}
        target={target}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role={isAnchor ? undefined : 'link'}
        aria-disabled={disabled}
        colorScheme={colorScheme}
        typography={typography}
        block={block}
        disabled={disabled}
        className={className}
        css={css}
        data-test-id={dataTestId || 'Link'}
        {...props}
      >
        {children}
      </StyledContainer>
    )
  }
)

Link.displayName = 'Link'

