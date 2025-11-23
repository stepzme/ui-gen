import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Link } from '@/imported/components/ui/link'
import { Icon } from '@/imported/components/ui/icon'

export type BreadcrumbsTypography = 'bodyS' | 'bodyM' | 'bodyL'
export type BreadcrumbsDividerType = 'chevron' | 'slash'

export interface BreadcrumbsItem {
  /**
   * Заголовок элемента
   */
  title: string
  /**
   * URL ссылки
   */
  href?: string
  /**
   * Обработчик клика
   */
  onClick?: () => void
  /**
   * ID для тестирования
   */
  'data-test-id'?: string
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * Элементы хлебных крошек
   */
  items: BreadcrumbsItem[]
  /**
   * Размер через типографику
   * @default 'bodyS'
   */
  typography?: BreadcrumbsTypography
  /**
   * Тип разделителя
   * @default 'chevron'
   */
  dividerType?: BreadcrumbsDividerType
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const BreadcrumbsList = styled('ol', {
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  width: '100%',
  flexWrap: 'wrap',
  
  variants: {
    typography: {
      bodyS: {
        gap: '$x2',
        '& a, & button': {
          ...typographyStyles.bodyS_tight_normal,
        },
      },
      bodyM: {
        gap: '$x3',
        '& a, & button': {
          ...typographyStyles.bodyM_tight_normal,
        },
      },
      bodyL: {
        gap: '$x4',
        '& a, & button': {
          ...typographyStyles.bodyL_tight_normal,
        },
      },
    },
  },
  defaultVariants: {
    typography: 'bodyS',
  },
})

const BreadcrumbsItem = styled('li', {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  WebkitTapHighlightColor: 'transparent',
})

const BreadcrumbsLink = styled(Link, {
  color: 'var(--semantic-text-brand)',
  textDecoration: 'none',
  flexWrap: 'nowrap',
  flexShrink: 0,
  verticalAlign: 'bottom',
  padding: 0,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  
  variants: {
    active: {
      true: {
        color: 'var(--semantic-text-secondary)',
        pointerEvents: 'none',
      },
    },
  },
})

const BreadcrumbsDivider = styled('span', {
  display: 'flex',
  alignItems: 'center',
  color: 'var(--semantic-text-secondary)',
  margin: '0 $x2',
  flexShrink: 0,
  
  variants: {
    typography: {
      bodyS: {
        fontSize: '$x4',
      },
      bodyM: {
        fontSize: '$x5',
      },
      bodyL: {
        fontSize: '$x6',
      },
    },
  },
  defaultVariants: {
    typography: 'bodyS',
  },
})

export const Breadcrumbs = React.forwardRef<HTMLOListElement, BreadcrumbsProps>(
  (
    {
      items,
      typography = 'bodyS',
      dividerType = 'chevron',
      css,
      ...props
    },
    ref
  ) => {
    if (!items || items.length === 0) {
      return null
    }
    
    const dividerContent = dividerType === 'chevron' ? (
      <Icon variant="arrow_right" />
    ) : (
      <span>/</span>
    )
    
    return (
      <BreadcrumbsList
        ref={ref}
        typography={typography}
        css={css}
        {...props}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <React.Fragment key={index}>
              <BreadcrumbsItem>
                <BreadcrumbsLink
                  href={isLast ? undefined : item.href}
                  onClick={item.onClick}
                  active={isLast}
                  data-test-id={item['data-test-id']}
                  tabIndex={isLast ? undefined : 0}
                >
                  {item.title}
                </BreadcrumbsLink>
              </BreadcrumbsItem>
              {!isLast && (
                <BreadcrumbsDivider typography={typography} aria-hidden="true">
                  {dividerContent}
                </BreadcrumbsDivider>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbsList>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'

