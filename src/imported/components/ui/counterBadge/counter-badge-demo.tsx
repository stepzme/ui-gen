'use client'

import * as React from 'react'
import { CounterBadge } from './counterBadge'

export default function CounterBadgeDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>CounterBadge Component Demo</h1>

      <section>
        <h2>Базовые примеры</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <CounterBadge value={1} />
          <CounterBadge value={5} />
          <CounterBadge value={9} />
          <CounterBadge value={10} />
          <CounterBadge value={99} />
          <CounterBadge value={999} />
        </div>
      </section>

      <section>
        <h2>Размеры (typography)</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <span>bodyS</span>
            <CounterBadge value={2} typography="bodyS" />
            <CounterBadge value={12} typography="bodyS" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <span>bodyM</span>
            <CounterBadge value={2} typography="bodyM" />
            <CounterBadge value={12} typography="bodyM" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            <span>bodyL</span>
            <CounterBadge value={2} typography="bodyL" />
            <CounterBadge value={12} typography="bodyL" />
          </div>
        </div>
      </section>

      <section>
        <h2>С горизонтальными отступами (hPaddings)</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <CounterBadge value={1} hPaddings={true} />
          <CounterBadge value={5} hPaddings={true} />
          <CounterBadge value={9} hPaddings={true} />
          <CounterBadge value={10} hPaddings={true} />
          <CounterBadge value={99} hPaddings={true} />
        </div>
      </section>

      <section>
        <h2>Автоматические отступы (value &gt; 9)</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <CounterBadge value={1} />
          <CounterBadge value={5} />
          <CounterBadge value={9} />
          <CounterBadge value={10} />
          <CounterBadge value={99} />
        </div>
        <p style={{ marginTop: '8px', color: '#666' }}>
          Отступы автоматически включаются, если value &gt; 9
        </p>
      </section>

      <section>
        <h2>Строковые значения</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <CounterBadge value="1" />
          <CounterBadge value="5" />
          <CounterBadge value="10" />
          <CounterBadge value="99+" />
        </div>
      </section>

      <section>
        <h2>Кастомные стили</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <CounterBadge
            value={5}
            css={{
              backgroundColor: 'var(--semantic-success-primary)',
              color: 'var(--semantic-success-text-primary)',
            }}
          />
          <CounterBadge
            value={10}
            css={{
              backgroundColor: 'var(--semantic-warning-primary)',
              color: 'var(--semantic-warning-text-primary)',
            }}
          />
          <CounterBadge
            value={3}
            css={{
              backgroundColor: 'var(--semantic-critical-primary)',
              color: 'var(--semantic-critical-text-primary)',
            }}
          />
        </div>
      </section>

      <section>
        <h2>Deprecated size prop</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <CounterBadge value={2} size="small" />
          <CounterBadge value={5} size="medium" />
          <CounterBadge value={10} size="large" />
        </div>
        <p style={{ marginTop: '8px', color: '#666' }}>
          Используйте typography вместо size
        </p>
      </section>
    </div>
  )
}

