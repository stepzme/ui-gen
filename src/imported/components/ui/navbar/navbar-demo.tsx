'use client'

import * as React from 'react'
import { Navbar } from './navbar'
import { Avatar } from '@/imported/components/ui/avatar'
import { Icon } from '@/imported/components/ui/icon'

export default function NavbarDemo() {
  const [progress, setProgress] = React.useState(30)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>Navbar Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar
            title="Headline"
            right={
              <Avatar width="36px" height="36px">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ddd',
                    borderRadius: '50%',
                  }}
                />
              </Avatar>
            }
          />
        </div>
      </section>

      <section>
        <h2>С прогрессом без заголовка</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar
            progress={progress}
            right={
              <Avatar width="36px" height="36px">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ddd',
                    borderRadius: '50%',
                  }}
                />
              </Avatar>
            }
          />
        </div>
        <div style={{ marginTop: '8px' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
          <span style={{ marginLeft: '8px' }}>{progress}%</span>
        </div>
      </section>

      <section>
        <h2>С заголовком и прогрессом</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar
            title="Title"
            progress={80}
            right={
              <Avatar width="36px" height="36px">
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#ddd',
                    borderRadius: '50%',
                  }}
                />
              </Avatar>
            }
          />
        </div>
      </section>

      <section>
        <h2>С заголовком и подзаголовком</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar right="Все" title="Title" subtitle="subtitle" />
        </div>
      </section>

      <section>
        <h2>С текстом слева</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar left="Назад" title="Title" subtitle="subtitle" />
        </div>
      </section>

      <section>
        <h2>С текстом слева и справа</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar left="Назад" right="Все" title="Title" />
        </div>
      </section>

      <section>
        <h2>Без левой кнопки</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar
            left={false}
            title="Профиль"
            right="Готово"
            onRightClick={() => console.log('Готово')}
          />
        </div>
      </section>

      <section>
        <h2>С иконкой справа</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar
            title="Профиль"
            right={<Icon variant="three_dots_vert" css={{ fill: 'var(--semantic-icon-primary)' }} />}
          />
        </div>
      </section>

      <section>
        <h2>Зафиксированный</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar title="Fixed Navbar" fixed />
        </div>
      </section>

      <section>
        <h2>С обработчиками</h2>
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <Navbar
            left="Назад"
            title="Title"
            right="Действие"
            onBackClick={() => alert('Назад')}
            onRightClick={() => alert('Действие')}
          />
        </div>
      </section>
    </div>
  )
}

