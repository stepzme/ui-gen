import * as React from 'react'
import { createPortal } from 'react-dom'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'

export type DropdownPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end'

export interface DropdownProps {
  /**
   * Дочерний элемент (триггер для открытия меню)
   */
  children: React.ReactNode
  /**
   * Содержимое выпадающего меню
   */
  content: React.ReactNode
  /**
   * Футер меню (отображается под контентом)
   */
  footer?: React.ReactNode
  /**
   * Открыто ли меню
   */
  isOpen: boolean
  /**
   * Обработчик закрытия меню
   */
  onClose: () => void
  /**
   * Позиционирование меню
   * @default 'bottom'
   */
  placement?: DropdownPlacement
  /**
   * Смещение по оси X
   * @default 0
   */
  shift?: number
  /**
   * Отступ от триггера
   * @default 8
   */
  space?: number
  /**
   * Растягивать меню по ширине триггера
   * @default false
   */
  grow?: boolean
  /**
   * Фиксированная позиция (не переворачивается)
   * @default false
   */
  fixedPosition?: boolean
  /**
   * Контейнер для портала
   */
  portalRoot?: HTMLElement | null
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
  /**
   * ID для тестирования
   */
  dataTestId?: string
}

const DropdownTrigger = styled(Container, {
  display: 'inline-block',
})

const DropdownContent = styled('div', {
  zIndex: 50,
  position: 'fixed',
  backgroundColor: 'var(--colors-background1-primary)',
  border: '1px solid var(--colors-elevation0-borderNormal)',
  borderRadius: '$x2',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
  minWidth: '120px',
  maxWidth: '320px',
  maxHeight: '400px',
  overflowY: 'auto',
})

const DropdownContentInner = styled('div', {
  padding: 'var(--x-base-100)',
})

const DropdownFooter = styled('div', {
  padding: 'var(--x-base-200)',
  borderTop: '1px solid var(--colors-elevation0-borderNormal)',
  backgroundColor: 'var(--colors-background0-primary)',
})

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      children,
      content,
      footer,
      isOpen,
      onClose,
      placement = 'bottom',
      shift = 0,
      space = 8,
      grow = false,
      fixedPosition = false,
      portalRoot,
      css,
      dataTestId,
      ...props
    },
    ref
  ) => {
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [position, setPosition] = React.useState({ top: 0, left: 0 })

    // Вычисление позиции
    React.useEffect(() => {
      if (!isOpen || !triggerRef.current || !contentRef.current) return

      const updatePosition = () => {
        const triggerRect = triggerRef.current!.getBoundingClientRect()
        const contentRect = contentRef.current!.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let top = 0
        let left = 0

        // Определяем базовую позицию в зависимости от placement
        const isTop = placement.startsWith('top')
        const isBottom = placement.startsWith('bottom')
        const isLeft = placement.startsWith('left')
        const isRight = placement.startsWith('right')
        const isStart = placement.endsWith('start')
        const isEnd = placement.endsWith('end')

        if (isBottom) {
          top = triggerRect.bottom + space
        } else if (isTop) {
          top = triggerRect.top - contentRect.height - space
        } else {
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
        }

        if (isRight) {
          left = triggerRect.right + space
        } else if (isLeft) {
          left = triggerRect.left - contentRect.width - space
        } else {
          left = triggerRect.left + shift
          if (isStart) {
            // Выравнивание по левому краю
          } else if (isEnd) {
            left = triggerRect.right - contentRect.width
          } else {
            // Центрирование
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
          }
        }

        // Если grow, растягиваем по ширине триггера
        if (grow) {
          left = triggerRect.left
          if (contentRef.current) {
            contentRef.current.style.width = `${triggerRect.width}px`
          }
        }

        // Проверка границ viewport и корректировка (если не fixedPosition)
        if (!fixedPosition) {
          if (left + contentRect.width > viewportWidth) {
            left = viewportWidth - contentRect.width - 8
          }
          if (left < 8) {
            left = 8
          }
          if (top + contentRect.height > viewportHeight) {
            if (isBottom) {
              top = triggerRect.top - contentRect.height - space
            } else {
              top = viewportHeight - contentRect.height - 8
            }
          }
          if (top < 8) {
            top = 8
          }
        }

        setPosition({ top, left })
      }

      updatePosition()

      // Обновляем позицию при скролле и ресайзе
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)

      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }, [isOpen, placement, shift, space, grow, fixedPosition])

    // Обработка клика вне меню
    React.useEffect(() => {
      if (!isOpen) return

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node
        if (
          triggerRef.current &&
          contentRef.current &&
          !triggerRef.current.contains(target) &&
          !contentRef.current.contains(target)
        ) {
          onClose()
        }
      }

      // Небольшая задержка, чтобы не закрыть сразу после открытия
      const timeout = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 0)

      return () => {
        clearTimeout(timeout)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen, onClose])

    // Обработка Escape
    React.useEffect(() => {
      if (!isOpen) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }, [isOpen, onClose])

    const contentElement = isOpen ? (
      <DropdownContent
        ref={contentRef}
        css={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          ...css,
        }}
        data-test-id={dataTestId ? `${dataTestId}-content` : undefined}
      >
        <DropdownContentInner>{content}</DropdownContentInner>
        {footer && <DropdownFooter>{footer}</DropdownFooter>}
      </DropdownContent>
    ) : null

    return (
      <>
        <DropdownTrigger
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
            }
            triggerRef.current = node
          }}
          data-test-id={dataTestId}
          {...props}
        >
          {children}
        </DropdownTrigger>
        {contentElement &&
          createPortal(
            contentElement,
            portalRoot || document.body
          )}
      </>
    )
  }
)

Dropdown.displayName = 'Dropdown'

