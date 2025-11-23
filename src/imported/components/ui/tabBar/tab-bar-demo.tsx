'use client'

import * as React from 'react'
import { TabBar } from './tabBar'

export function TabBarDemo() {
  const [selectedTab, setSelectedTab] = React.useState<string | number>('1')
  
  const items = [
    { key: '1', name: 'Вкладка 1' },
    { key: '2', name: 'Вкладка 2' },
    { key: '3', name: 'Вкладка 3' },
    { key: '4', name: 'Вкладка 4' },
  ]
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>TabBar - Базовый пример</h2>
        <TabBar
          items={items}
          selectedTab={selectedTab}
          onChange={(value) => {
            setSelectedTab(value)
            console.log('Selected tab:', value)
          }}
        />
        <div>Выбрана вкладка: {selectedTab}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>TabBar - С подчеркиванием</h2>
        <TabBar
          items={items}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
          underlined={true}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>TabBar - На всю ширину</h2>
        <TabBar
          items={items}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
          fullWidth={true}
        />
      </div>
    </div>
  )
}

