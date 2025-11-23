'use client'

import * as React from 'react'
import { List } from './list'

export function ListDemo() {
  const items = [
    {
      header: 'Первый',
      content: 'Краткое описание на две-три строки две строки текста две строки текста три строки текста три строки текста',
    },
    {
      header: 'Второй',
      content: 'Краткое описание на две-три строки две строки текста две строки текста три строки текста три строки текста',
    },
    {
      header: 'Третий',
      content: 'Краткое описание на две-три строки две строки текста две строки текста три строки текста три строки текста',
    },
  ]
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>List - Базовый пример (bullet)</h2>
        <List items={items} marker="bullet" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>List - С маркером check</h2>
        <List items={items} marker="check" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>List - С маркером number</h2>
        <List items={items} marker="number" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>List - С маркером numberIcon</h2>
        <List items={items} marker="numberIcon" />
      </div>
    </div>
  )
}

