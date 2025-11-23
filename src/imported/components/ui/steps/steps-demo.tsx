'use client'

import * as React from 'react'
import { Steps } from './steps'

export default function StepsDemo() {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>Steps Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <Steps count={5} onClick={setActiveIndex} activeIndex={activeIndex} />
      </section>

      <section>
        <h2>Разные цветовые схемы</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Steps count={5} onClick={setActiveIndex} activeIndex={activeIndex} colorScheme="brand" />
          <Steps count={5} onClick={setActiveIndex} activeIndex={activeIndex} colorScheme="constant" />
          <Steps count={5} onClick={setActiveIndex} activeIndex={activeIndex} colorScheme="primary" />
        </div>
      </section>

      <section>
        <h2>Uncontrolled</h2>
        <Steps count={7} onClick={(v) => console.log('Clicked:', v)} initialIndex={2} />
      </section>

      <section>
        <h2>Управление</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}>Назад</button>
          <Steps count={9} onClick={setActiveIndex} activeIndex={activeIndex} />
          <button onClick={() => setActiveIndex(Math.min(8, activeIndex + 1))}>Вперед</button>
        </div>
      </section>
    </div>
  )
}

