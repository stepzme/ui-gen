import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { ButtonIcon } from '@/imported/components/ui/buttonIcon'
import { Icon } from '@/imported/components/ui/icon'

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Дочерние элементы (слайды)
   */
  children: React.ReactNode
  /**
   * Режим бесконечного пролистывания
   * @default false
   */
  isLoop?: boolean
  /**
   * Отступ между слайдами
   * @default 0
   */
  spaceBetween?: number
  /**
   * Выбранный элемент по умолчанию (uncontrolled)
   * @default 0
   */
  defaultSelected?: number
  /**
   * Выбранный элемент (controlled)
   */
  selected?: number
  /**
   * Обработчик изменения
   */
  onChange?: (item: number) => void
  /**
   * Показывать навигацию
   * @default false
   */
  showNavigation?: boolean
  /**
   * Скрыть пагинацию
   * @default false
   */
  hidePagination?: boolean
  /**
   * Скрыть сегменты
   * @default false
   */
  hideSegments?: boolean
  /**
   * Заголовок карусели
   */
  title?: string
  /**
   * Действие справа сверху
   */
  action?: React.ReactNode
  /**
   * Отступ по краям
   * @default 0
   */
  edgePadding?: number | string
  /**
   * Слайдов в группе
   * @default 1
   */
  slidesPerGroup?: number
  /**
   * Растянуть каждый слайд на 100%
   * @default false
   */
  wideSlides?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const CarouselContainer = styled(Container, {
  position: 'relative',
  overflow: 'hidden',
  touchAction: 'pan-y',
})

const CarouselTrack = styled(Container, {
  display: 'flex',
  transition: 'transform 0.3s ease',
  willChange: 'transform',
})

const CarouselSlide = styled(Container, {
  flexShrink: 0,
  variants: {
    wideSlides: {
      true: {
        width: '100%',
      },
      false: {},
    },
  },
})

const CarouselNavigation = styled(ButtonIcon, {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: 'var(--semantic-elevation-0-body)',
  boxShadow: 'var(--semantic-shadow-sm)',
  borderRadius: '60px',
  width: '$x9',
  height: '$x9',
  variants: {
    side: {
      left: {
        left: 0,
        transform: 'translate(-50%, -50%)',
      },
      right: {
        right: 0,
        transform: 'translate(50%, -50%)',
        '& svg': {
          transform: 'rotate(180deg)',
        },
      },
    },
  },
})

const CarouselPagination = styled(Container, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$x2',
  marginTop: '$x4',
})

const CarouselPaginationDot = styled('button', {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  backgroundColor: 'var(--semantic-divider-thin)',
  transition: 'all 0.2s ease',

  variants: {
    active: {
      true: {
        backgroundColor: 'var(--semantic-brand-primary)',
        width: '24px',
        borderRadius: '$x1',
      },
      false: {},
    },
  },
})

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      isLoop = false,
      spaceBetween = 0,
      defaultSelected = 0,
      selected,
      onChange,
      showNavigation = false,
      hidePagination = false,
      hideSegments = false,
      title,
      action,
      edgePadding = 0,
      slidesPerGroup = 1,
      wideSlides = false,
      css,
      ...props
    },
    ref
  ) => {
    const [internalSelected, setInternalSelected] = React.useState(defaultSelected)
    const isControlled = selected !== undefined
    const currentSelected = isControlled ? selected : internalSelected
    const slidesCount = React.Children.count(children)

    const handleNext = () => {
      const next = isLoop
        ? (currentSelected + slidesPerGroup) % slidesCount
        : Math.min(currentSelected + slidesPerGroup, slidesCount - 1)
      if (!isControlled) {
        setInternalSelected(next)
      }
      onChange?.(next)
    }

    const handlePrev = () => {
      const prev = isLoop
        ? (currentSelected - slidesPerGroup + slidesCount) % slidesCount
        : Math.max(currentSelected - slidesPerGroup, 0)
      if (!isControlled) {
        setInternalSelected(prev)
      }
      onChange?.(prev)
    }

    const handleDotClick = (index: number) => {
      if (!isControlled) {
        setInternalSelected(index)
      }
      onChange?.(index)
    }

    const slideWidth = wideSlides ? '100%' : `calc((100% - ${edgePadding}px * 2) / ${slidesPerGroup})`

    return (
      <CarouselContainer ref={ref} css={css} {...props}>
        {(title || action) && (
          <Container
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '$x4',
            }}
          >
            {title && <Typography typography="bodyM_tight_medium">{title}</Typography>}
            {action}
          </Container>
        )}
        <CarouselTrack
          css={{
            transform: `translateX(-${currentSelected * (100 / slidesPerGroup)}%)`,
            gap: `${spaceBetween}px`,
          }}
        >
          {React.Children.map(children, (child, index) => (
            <CarouselSlide key={index} wideSlides={wideSlides} css={{ width: slideWidth }}>
              {child}
            </CarouselSlide>
          ))}
        </CarouselTrack>
        {showNavigation && (
          <>
            <CarouselNavigation side="left" onClick={handlePrev} aria-label="Предыдущий слайд">
              <Icon variant="arrow_left" />
            </CarouselNavigation>
            <CarouselNavigation side="right" onClick={handleNext} aria-label="Следующий слайд">
              <Icon variant="arrow_right" />
            </CarouselNavigation>
          </>
        )}
        {!hidePagination && (
          <CarouselPagination>
            {Array.from({ length: Math.ceil(slidesCount / slidesPerGroup) }, (_, index) => (
              <CarouselPaginationDot
                key={index}
                type="button"
                active={Math.floor(currentSelected / slidesPerGroup) === index}
                onClick={() => handleDotClick(index * slidesPerGroup)}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
          </CarouselPagination>
        )}
      </CarouselContainer>
    )
  }
)

Carousel.displayName = 'Carousel'

