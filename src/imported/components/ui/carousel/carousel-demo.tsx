'use client'

import * as React from 'react'
import { Carousel } from './carousel'
import { Card } from '@/imported/components/ui/card'

export default function CarouselDemo() {
  const [selected, setSelected] = React.useState(0)

  const renderCards = (count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <Card key={i} variant="filled" paddingSize="medium">
        <h3>Слайд {i + 1}</h3>
        <p>Содержимое слайда {i + 1}</p>
      </Card>
    ))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>Carousel Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <div style={{ maxWidth: '600px' }}>
          <Carousel selected={selected} onChange={setSelected} spaceBetween={20}>
            {renderCards(5)}
          </Carousel>
        </div>
      </section>

      <section>
        <h2>С навигацией</h2>
        <div style={{ maxWidth: '600px' }}>
          <Carousel
            selected={selected}
            onChange={setSelected}
            spaceBetween={20}
            showNavigation
            hidePagination
            hideSegments
          >
            {renderCards(10)}
          </Carousel>
        </div>
      </section>

      <section>
        <h2>С пагинацией</h2>
        <div style={{ maxWidth: '600px' }}>
          <Carousel
            selected={selected}
            onChange={setSelected}
            spaceBetween={20}
            hideSegments
          >
            {renderCards(6)}
          </Carousel>
        </div>
      </section>

      <section>
        <h2>Бесконечная прокрутка</h2>
        <div style={{ maxWidth: '600px' }}>
          <Carousel
            selected={selected}
            onChange={setSelected}
            spaceBetween={20}
            isLoop
            showNavigation
            hidePagination
            hideSegments
          >
            {renderCards(6)}
          </Carousel>
        </div>
      </section>

      <section>
        <h2>С заголовком и действием</h2>
        <div style={{ maxWidth: '600px' }}>
          <Carousel
            title="Заголовок карусели"
            action={<button>Действие</button>}
            selected={selected}
            onChange={setSelected}
            spaceBetween={20}
          >
            {renderCards(5)}
          </Carousel>
        </div>
      </section>

      <section>
        <h2>Группировка слайдов</h2>
        <div style={{ maxWidth: '600px' }}>
          <Carousel
            selected={selected}
            onChange={setSelected}
            spaceBetween={20}
            slidesPerGroup={2}
            hidePagination
            hideSegments
            showNavigation
          >
            {renderCards(6)}
          </Carousel>
        </div>
      </section>
    </div>
  )
}

