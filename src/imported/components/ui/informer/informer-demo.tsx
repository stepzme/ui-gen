'use client'

import * as React from 'react'
import { Informer } from './informer'

export default function InformerDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>Informer Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <Informer title="Title" text="Текст" />
      </section>

      <section>
        <h2>С действием</h2>
        <Informer
          title="Title"
          text="Текст"
          actionText="Some link"
          onClick={() => alert('Clicked')}
        />
      </section>

      <section>
        <h2>С кнопкой закрытия</h2>
        <Informer
          title="Title"
          text="Текст"
          onClose={() => alert('Closed')}
        />
      </section>

      <section>
        <h2>Разные цветовые схемы</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Informer title="Info" text="Информационное сообщение" colorScheme="info" />
          <Informer title="Success" text="Успешное сообщение" colorScheme="success" />
          <Informer title="Warning" text="Предупреждение" colorScheme="warning" />
          <Informer title="Critical" text="Критическая ошибка" colorScheme="critical" />
          <Informer title="Brand" text="Брендовое сообщение" colorScheme="brand" />
          <Informer title="Draft" text="Черновик" colorScheme="draft" />
        </div>
      </section>

      <section>
        <h2>Разные размеры</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Informer title="Small" text="Текст" typography="bodyS" />
          <Informer title="Medium" text="Текст" typography="bodyM" />
          <Informer title="Large" text="Текст" typography="bodyL" />
        </div>
      </section>

      <section>
        <h2>Без иконки</h2>
        <Informer title="Title" text="Текст" icon={false} />
      </section>

      <section>
        <h2>Только текст</h2>
        <Informer text="Текст без заголовка" />
      </section>
    </div>
  )
}

