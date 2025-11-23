import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Button } from '@/imported/components/ui/button'
import { Icon } from '@/imported/components/ui/icon'
import { Input } from '@/imported/components/ui/input'
import { Select } from '@/imported/components/ui/select'

export type PaginationMode = 'simple' | 'partial' | undefined

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Количество элементов пагинации (вычисляется как totalElements/itemsPerPage)
   */
  count?: number
  /**
   * Индекс выбранного элемента рендера для controlled компонента (deprecated)
   * @deprecated
   */
  selected?: number
  /**
   * Индекс выбранного элемента рендера по умолчанию
   */
  defaultSelected?: number
  /**
   * Значение для HTML-атрибута role контейнера
   * @default 'tablist'
   */
  containerRole?: string
  /**
   * Значение для HTML-атрибута role элемента
   * @default 'tab'
   */
  itemRole?: string
  /**
   * Значение для HTML-атрибута aria-label контейнера
   */
  ariaContainerLabel?: string
  /**
   * Значение для HTML-атрибута aria-roledescription элемента
   */
  ariaItemDescription?: string
  /**
   * Функция, вызывающаяся при переключении пагинатора
   */
  onChange: (pageIndex: number, pageSize: number) => void
  /**
   * Количество элементов, которые будут отображаться справа и слева от активного элемента
   * @default 1
   */
  siblingCount?: number
  /**
   * Общее количество элементов
   * @default 100
   */
  totalElements?: number
  /**
   * Количество элементов на странице
   * @default 10
   */
  itemsPerPage?: number
  /**
   * aria-label для элемента пагинации
   */
  ariaPaginationLabel?: string
  /**
   * Скрыть кнопки вперед/назад
   * @default false
   */
  hideControls?: boolean
  /**
   * Скрыть элементы пагинации
   * @default false
   */
  hideItems?: boolean
  /**
   * Текст слева от селекта
   */
  leftSelectText?: string
  /**
   * Текст справа от селекта
   */
  rightSelectText?: string
  /**
   * Текст справа от инпута
   */
  rightInputText?: string
  /**
   * Текст слева от инпута
   */
  leftInputText?: string
  /**
   * Опции для селекта
   */
  selectOptions?: Array<{ value: string; label: string }>
  /**
   * Показывать селект
   * @default false
   */
  showSelect?: boolean
  /**
   * Показывать инпут
   * @default false
   */
  showInput?: boolean
  /**
   * Режим пагинации
   */
  mode?: PaginationMode
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const PaginationContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$x3',
  flexWrap: 'wrap',
})

const PaginationControls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$x2',
})

const PaginationItems = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$x2',
})

const PaginationInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$x2',
})

// Функция для генерации массива страниц
function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | string)[] {
  const totalNumbers = siblingCount * 2 + 5
  const totalBlocks = totalNumbers + 2

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, '...', totalPages]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    )
    return [1, '...', ...rightRange]
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    )
    return [1, '...', ...middleRange, '...', totalPages]
  }

  return []
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      count,
      selected,
      defaultSelected = 0,
      containerRole = 'tablist',
      itemRole = 'tab',
      ariaContainerLabel,
      ariaItemDescription,
      onChange,
      siblingCount = 1,
      totalElements = 100,
      itemsPerPage = 10,
      ariaPaginationLabel,
      hideControls = false,
      hideItems = false,
      leftSelectText,
      rightSelectText,
      rightInputText,
      leftInputText,
      selectOptions = [
        { value: '10', label: '10' },
        { value: '20', label: '20' },
        { value: '50', label: '50' },
      ],
      showSelect = false,
      showInput = false,
      mode,
      css,
      ...props
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = React.useState(defaultSelected)
    const [currentPageSize, setCurrentPageSize] = React.useState(itemsPerPage)
    const [inputValue, setInputValue] = React.useState('')
    
    const effectiveCount = count || Math.ceil(totalElements / itemsPerPage)
    const effectivePage = selected !== undefined ? selected : currentPage
    
    const handlePageChange = (page: number) => {
      const newPage = Math.max(0, Math.min(page, effectiveCount - 1))
      if (selected === undefined) {
        setCurrentPage(newPage)
      }
      onChange(newPage, currentPageSize)
    }
    
    const handlePrevious = () => {
      if (effectivePage > 0) {
        handlePageChange(effectivePage - 1)
      }
    }
    
    const handleNext = () => {
      if (effectivePage < effectiveCount - 1) {
        handlePageChange(effectivePage + 1)
      }
    }
    
    const handleSelectChange = (value: string) => {
      const newPageSize = Number(value)
      setCurrentPageSize(newPageSize)
      const newCount = Math.ceil(totalElements / newPageSize)
      const newPage = Math.min(effectivePage, newCount - 1)
      onChange(newPage, newPageSize)
    }
    
    const handleInputChange = (value: string) => {
      setInputValue(value)
    }
    
    const handleInputKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        const page = Number(inputValue)
        if (!isNaN(page) && page > 0 && page <= effectiveCount) {
          handlePageChange(page - 1)
          setInputValue('')
        }
      }
    }
    
    const handleInputBlur = () => {
      const page = Number(inputValue)
      if (!isNaN(page) && page > 0 && page <= effectiveCount) {
        handlePageChange(page - 1)
        setInputValue('')
      } else {
        setInputValue('')
      }
    }
    
    const pageNumbers = generatePageNumbers(effectivePage + 1, effectiveCount, siblingCount)
    const startItem = effectivePage * currentPageSize + 1
    const endItem = Math.min((effectivePage + 1) * currentPageSize, totalElements)
    const rangeText = `${startItem} - ${endItem} ${rightSelectText || ''} ${totalElements}`
    
    const isSimple = mode === 'simple'
    
    return (
      <PaginationContainer
        ref={ref}
        role={containerRole}
        aria-label={ariaContainerLabel}
        css={css}
        {...props}
      >
        {showSelect && !isSimple && (
          <PaginationInfo>
            {leftSelectText && <span>{leftSelectText}</span>}
            <Select
              options={selectOptions.map(opt => ({ value: opt.value, label: opt.label }))}
              value={String(currentPageSize)}
              onValueChange={handleSelectChange}
              placeholder=""
            />
            {rightSelectText && <span>{rightSelectText}</span>}
            {rightSelectText && <span>{rangeText}</span>}
          </PaginationInfo>
        )}
        
        {!hideItems && (
          <PaginationItems role={containerRole}>
            {!hideControls && (
              <Button
                variant="tonned"
                paddingSize="tiny"
                onClick={handlePrevious}
                disabled={effectivePage === 0}
                aria-label="Предыдущая страница"
              >
                <Icon variant="arrow_left" />
              </Button>
            )}
            
            {pageNumbers.map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`dots-${index}`} style={{ padding: '0 8px' }}>
                    ...
                  </span>
                )
              }
              
              const pageNumber = page as number
              const isActive = pageNumber === effectivePage + 1
              
              return (
                <Button
                  key={pageNumber}
                  variant={isActive ? 'filled' : 'transparent'}
                  colorScheme={isActive ? 'brand' : 'draft'}
                  paddingSize="tiny"
                  onClick={() => handlePageChange(pageNumber - 1)}
                  role={itemRole}
                  aria-roledescription={ariaItemDescription}
                  aria-label={ariaPaginationLabel || `Страница ${pageNumber}`}
                  css={{
                    width: '$x9',
                    minWidth: '$x9',
                  }}
                >
                  {pageNumber}
                </Button>
              )
            })}
            
            {!hideControls && (
              <Button
                variant="tonned"
                paddingSize="tiny"
                onClick={handleNext}
                disabled={effectivePage >= effectiveCount - 1}
                aria-label="Следующая страница"
              >
                <Icon variant="arrow_right" />
              </Button>
            )}
          </PaginationItems>
        )}
        
        {showInput && !isSimple && (
          <PaginationInfo>
            {leftInputText && <span>{leftInputText}</span>}
            <Input
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={handleInputBlur}
              placeholder=""
              textAlign="center"
              css={{ width: '60px' }}
            />
            {rightInputText && <span>{rightInputText}</span>}
          </PaginationInfo>
        )}
      </PaginationContainer>
    )
  }
)

Pagination.displayName = 'Pagination'

