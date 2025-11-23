'use client'

import * as React from 'react'
import { Breadcrumbs } from './breadcrumbs'

export function BreadcrumbsDemo() {
  const items1 = [
    { title: 'Главная' },
    { title: 'Операции' },
    { title: 'Доверенности и завещательные распоряжения' },
    { title: 'Работа с недееспособными/ограниченно дееспособными' },
  ]
  
  const items2 = [
    { title: 'Breadcrumb 1', href: 'https://example.com' },
    { title: 'Breadcrumb 2', href: 'https://example.com', onClick: () => console.log('clicked 2') },
    { title: 'Breadcrumb 3', onClick: () => console.log('clicked 3') },
    { title: 'Breadcrumb 4', onClick: () => console.log('clicked 4') },
  ]
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Breadcrumbs - Базовый пример</h2>
        <Breadcrumbs items={items1} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Breadcrumbs - С ссылками и обработчиками</h2>
        <Breadcrumbs items={items2} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Breadcrumbs - Размеры</h2>
        <Breadcrumbs items={items1} typography="bodyS" />
        <Breadcrumbs items={items1} typography="bodyM" />
        <Breadcrumbs items={items1} typography="bodyL" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Breadcrumbs - Типы разделителей</h2>
        <Breadcrumbs items={items1} dividerType="chevron" />
        <Breadcrumbs items={items1} dividerType="slash" />
      </div>
    </div>
  )
}

