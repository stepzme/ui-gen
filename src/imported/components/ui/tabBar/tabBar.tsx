import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Button } from '@/imported/components/ui/button'
import { Dropdown } from '@/imported/components/ui/dropdown'
import { Icon } from '@/imported/components/ui/icon'

export type TabBarTypography = 'bodyS' | 'bodyM' | 'bodyL'
export type TabBarPaddingSize = 'tiny' | 'small' | 'medium'

export interface TabBarItem {
  /**
   * Уникальный ключ элемента
   */
  key: string | number
  /**
   * Название вкладки
   */
  name: string
  /**
   * Иконка
   */
  icon?: React.ReactNode
  /**
   * Бейдж
   */
  badge?: React.ReactNode
  /**
   * aria-label для элемента
   */
  'aria-label'?: string
}

export interface TabBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Айтемы
   */
  items: TabBarItem[]
  /**
   * Выбранный элемент
   * @default ''
   */
  selectedTab?: string | number
  /**
   * Колбэк, вызываемый при изменении
   */
  onChange: (value: string | number) => void
  /**
   * Размер через типографику
   * @default 'bodyM'
   */
  typography?: TabBarTypography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: TabBarTypography
  /**
   * Размер внутренних отступов
   * @default 'small'
   */
  paddingSize?: TabBarPaddingSize
  /**
   * Определяет переполнение меню
   * @default false
   */
  hasOverflowMenu?: boolean
  /**
   * Подчеркивание снизу (серая полоса)
   * @default false
   */
  underlined?: boolean
  /**
   * Растягивать на всю ширину
   * @default false
   */
  fullWidth?: boolean
  /**
   * Растягивать на всю ширину (deprecated, используйте fullWidth)
   * @deprecated
   */
  fluid?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const TabBarContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  
  variants: {
    underlined: {
      true: {
        borderBottom: '1px solid var(--semantic-neutral-8)',
      },
    },
  },
})

const TabBarList = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$x2',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  
  variants: {
    fullWidth: {
      true: {
        width: '100%',
        '& > *': {
          flex: 1,
        },
      },
    },
    typography: {
      bodyS: {
        ...typographyStyles.bodyS_tight_normal,
      },
      bodyM: {
        ...typographyStyles.bodyM_tight_normal,
      },
      bodyL: {
        ...typographyStyles.bodyL_tight_normal,
      },
    },
  },
  defaultVariants: {
    typography: 'bodyM',
  },
})

const TabBarItemButton = styled(Button, {
  whiteSpace: 'nowrap',
  flexShrink: 0,
  
  variants: {
    active: {
      true: {
        color: 'var(--semantic-text-brand)',
      },
      false: {
        color: 'var(--semantic-text-secondary)',
      },
    },
  },
})

const TabBarItemContent = styled('span', {
  display: 'flex',
  alignItems: 'center',
  gap: '$x1',
})

export const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>(
  (
    {
      items,
      selectedTab = '',
      onChange,
      typography,
      size,
      paddingSize = 'small',
      hasOverflowMenu = false,
      underlined = false,
      fullWidth = false,
      fluid,
      css,
      ...props
    },
    ref
  ) => {
    const effectiveTypography = typography || size || 'bodyM'
    const effectiveFullWidth = fullWidth || fluid || false
    const [overflowItems, setOverflowItems] = React.useState<TabBarItem[]>([])
    const [isOverflowOpen, setIsOverflowOpen] = React.useState(false)
    const overflowAnchorRef = React.useRef<HTMLDivElement>(null)
    
    const visibleItems = hasOverflowMenu
      ? items.filter((item) => !overflowItems.some((oi) => oi.key === item.key))
      : items
    
    const handleItemClick = (key: string | number) => {
      onChange(key)
    }
    
    return (
      <TabBarContainer
        ref={ref}
        underlined={underlined}
        css={css}
        {...props}
      >
        <TabBarList
          role="tablist"
          typography={effectiveTypography}
          fullWidth={effectiveFullWidth}
        >
          {visibleItems.map((item) => {
            const isActive = selectedTab === item.key
            
            return (
              <TabBarItemButton
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                active={isActive}
                variant={isActive ? 'transparent' : 'transparent'}
                colorScheme={isActive ? 'brand' : 'draft'}
                paddingSize={paddingSize}
                onClick={() => handleItemClick(item.key)}
                aria-label={item['aria-label'] || item.name}
              >
                <TabBarItemContent>
                  {item.icon && <span aria-hidden="true">{item.icon}</span>}
                  {item.name}
                  {item.badge && <span aria-hidden="true">{item.badge}</span>}
                </TabBarItemContent>
              </TabBarItemButton>
            )
          })}
        </TabBarList>
        
        {hasOverflowMenu && overflowItems.length > 0 && (
          <div ref={overflowAnchorRef}>
            <Button
              variant="transparent"
              paddingSize="tiny"
              rounded={true}
              onClick={() => setIsOverflowOpen(!isOverflowOpen)}
            >
              <Icon variant="dots_horizontal" />
            </Button>
            <Dropdown
              anchorElement={overflowAnchorRef.current}
              isOpen={isOverflowOpen}
              onOpenChange={setIsOverflowOpen}
              placement="bottom-end"
              content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '$x1' }}>
                  {overflowItems.map((item) => (
                    <Button
                      key={item.key}
                      type="button"
                      variant="transparent"
                      onClick={() => {
                        handleItemClick(item.key)
                        setIsOverflowOpen(false)
                      }}
                    >
                      <TabBarItemContent>
                        {item.icon && <span aria-hidden="true">{item.icon}</span>}
                        {item.name}
                        {item.badge && <span aria-hidden="true">{item.badge}</span>}
                      </TabBarItemContent>
                    </Button>
                  ))}
                </div>
              }
            />
          </div>
        )}
      </TabBarContainer>
    )
  }
)

TabBar.displayName = 'TabBar'

