import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Icon } from '@/imported/components/ui/icon'

export type ListMarker = 'check' | 'number' | 'bullet' | 'numberIcon'

export interface ListItem {
  /**
   * Заголовок элемента
   */
  header: React.ReactNode
  /**
   * Содержимое элемента
   */
  content: React.ReactNode
  /**
   * Маркер элемента (переопределяет общий marker)
   */
  marker?: ListMarker | React.ReactNode
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /**
   * Айтемы
   */
  items: ListItem[]
  /**
   * Маркер списка
   * @default 'bullet'
   */
  marker?: ListMarker
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const ListContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  rowGap: '$x4',
  margin: 0,
  padding: 0,
  color: 'var(--semantic-text-primary)',
  counterReset: 'list',
  listStyleType: 'none',
})

const ListItemElement = styled('li', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '$x2',
})

const ListItemContent = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x2',
})

const ListMarkerContainer = styled('span', {
  flexShrink: 0,
  width: '$x5',
  height: '$x6',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  
  variants: {
    variant: {
      bullet: {
        fill: 'var(--semantic-text-secondary)',
        fontSize: '$x4',
      },
      numberIcon: {
        backgroundColor: 'var(--semantic-primary-4)',
        width: '$x10',
        height: '$x10',
        borderRadius: '50%',
        position: 'relative',
        '&::before': {
          counterIncrement: 'list',
          content: 'counter(list)',
          fontSize: '$x4',
          color: 'var(--semantic-text-primary)',
          ...typographyStyles.bodyM_tight_medium,
        },
      },
      number: {
        '&::before': {
          counterIncrement: 'list',
          content: 'counter(list) "."',
          color: 'var(--semantic-text-secondary)',
          ...typographyStyles.bodyM_tight_normal,
        },
      },
      check: {
        fill: 'var(--semantic-text-secondary)',
        fontSize: '$x5',
      },
    },
  },
})

const ListHeader = styled(Typography, {
  ...typographyStyles.headlineS,
})

const ListContent = styled(Typography, {
  ...typographyStyles.bodyM_paragraph_normal,
  color: 'var(--semantic-text-secondary)',
})

const ListIconContainer = styled(Container, {
  display: 'flex',
  justifyContent: 'center',
  width: '$x10',
  height: '$x10',
  backgroundColor: 'var(--semantic-primary-4)',
  fill: 'var(--semantic-icon-primary)',
  borderRadius: '$x5',
  flexShrink: 0,
  '& svg': {
    fontSize: '$x5',
  },
})

// Иконки для маркеров
const markerIcons: Record<ListMarker, string> = {
  bullet: 'dot',
  check: 'checkmark',
  number: '',
  numberIcon: '',
}

export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (
    {
      items,
      marker = 'bullet',
      css,
      ...props
    },
    ref
  ) => {
    const isNumbered = marker === 'number' || marker === 'numberIcon'
    const ListTag = isNumbered ? 'ol' : 'ul'
    
    return (
      <ListContainer
        ref={ref as any}
        as={ListTag}
        css={css}
        {...props}
      >
        {items.map((item, index) => {
          const itemMarker = item.marker || marker
          const isCustomMarker = typeof itemMarker === 'object' && itemMarker !== null
          const isNumberIcon = itemMarker === 'numberIcon' || (marker === 'numberIcon' && !item.marker)
          
          return (
            <ListItemElement key={index}>
              {isCustomMarker ? (
                <ListIconContainer aria-hidden="true">
                  {itemMarker}
                </ListIconContainer>
              ) : (
                <ListMarkerContainer
                  variant={itemMarker as ListMarker}
                  aria-hidden="true"
                  css={isNumberIcon ? { marginTop: '$x2' } : undefined}
                >
                  {itemMarker === 'bullet' && <Icon variant={markerIcons.bullet} />}
                  {itemMarker === 'check' && <Icon variant={markerIcons.check} />}
                </ListMarkerContainer>
              )}
              <ListItemContent css={isNumberIcon ? { marginTop: '$x2' } : undefined}>
                <ListHeader>{item.header}</ListHeader>
                <ListContent>{item.content}</ListContent>
              </ListItemContent>
            </ListItemElement>
          )
        })}
      </ListContainer>
    )
  }
)

List.displayName = 'List'

