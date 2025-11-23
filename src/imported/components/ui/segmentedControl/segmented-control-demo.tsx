'use client'

import * as React from 'react'
import { SegmentedControl } from './segmentedControl'

export default function SegmentedControlDemo() {
  const [selected, setSelected] = React.useState('1')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>SegmentedControl Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <SegmentedControl
          items={[
            { key: '1', name: 'Value 1' },
            { key: '2', name: 'Value 2' },
            { key: '3', name: 'Value 3' },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </section>

      <section>
        <h2>С иконками</h2>
        <SegmentedControl
          items={[
            { key: '1', name: 'Value 1', icon: <span>📱</span> },
            { key: '2', name: 'Value 2' },
            { key: '3', name: 'Value 3', icon: <span>💻</span> },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </section>

      <section>
        <h2>Вариант filled</h2>
        <SegmentedControl
          variant="filled"
          items={[
            { key: '1', name: 'Value 1' },
            { key: '2', name: 'Value 2' },
            { key: '3', name: 'Value 3' },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </section>

      <section>
        <h2>На всю ширину</h2>
        <SegmentedControl
          fullWidth
          items={[
            { key: '1', name: 'Value 1' },
            { key: '2', name: 'Value 2' },
            { key: '3', name: 'Value 3' },
          ]}
          selected={selected}
          onChange={setSelected}
        />
      </section>

      <section>
        <h2>Разные размеры</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SegmentedControl
            typography="bodyS"
            paddingSize="small"
            items={[
              { key: '1', name: 'Small' },
              { key: '2', name: 'Small' },
            ]}
            selected={selected}
            onChange={setSelected}
          />
          <SegmentedControl
            typography="bodyM"
            items={[
              { key: '1', name: 'Medium' },
              { key: '2', name: 'Medium' },
            ]}
            selected={selected}
            onChange={setSelected}
          />
          <SegmentedControl
            typography="bodyL"
            items={[
              { key: '1', name: 'Large' },
              { key: '2', name: 'Large' },
            ]}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </section>
    </div>
  )
}

