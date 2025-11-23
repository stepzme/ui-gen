'use client'

import * as React from 'react'
import { Suggest } from './suggest'

export default function SuggestDemo() {
  const [selected, setSelected] = React.useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', maxWidth: '400px' }}>
      <h1>Suggest Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Suggest label="Москва" value="moscow" onClick={(v) => setSelected(v)} selected={selected === 'moscow'} />
          <Suggest label="Санкт-Петербург" value="spb" onClick={(v) => setSelected(v)} selected={selected === 'spb'} />
          <Suggest label="Новосибирск" value="novosibirsk" onClick={(v) => setSelected(v)} selected={selected === 'novosibirsk'} />
        </div>
      </section>

      <section>
        <h2>С иконками</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Suggest label="Пользователь" value="user" icon={<span>👤</span>} />
          <Suggest label="Настройки" value="settings" icon={<span>⚙️</span>} />
          <Suggest label="Выход" value="logout" icon={<span>🚪</span>} />
        </div>
      </section>

      <section>
        <h2>С эмоджи</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Suggest label="Счастливый" value="happy" emoji="😊" />
          <Suggest label="Грустный" value="sad" emoji="😢" />
          <Suggest label="Удивленный" value="surprised" emoji="😲" />
        </div>
      </section>

      <section>
        <h2>Разные размеры</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Suggest label="Small" value="s" typography="bodyS" />
          <Suggest label="Medium" value="m" typography="bodyM" />
          <Suggest label="Large" value="l" typography="bodyL" />
        </div>
      </section>
    </div>
  )
}

