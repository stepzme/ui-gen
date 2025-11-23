'use client'

import * as React from 'react'
import { Drawer } from './drawer'
import { Button } from '@/imported/components/ui/button'

export function DrawerDemo() {
  const [isOpenLeft, setIsOpenLeft] = React.useState(false)
  const [isOpenRight, setIsOpenRight] = React.useState(false)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Drawer - Слева</h2>
        <Button onClick={() => setIsOpenLeft(true)}>
          Открыть Drawer слева
        </Button>
        <Drawer
          isOpen={isOpenLeft}
          onClose={() => setIsOpenLeft(false)}
          position="left"
          title="Заголовок"
          description="Описание"
        >
          <div style={{ padding: '16px' }}>
            <p>Содержимое Drawer</p>
          </div>
        </Drawer>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Drawer - Справа</h2>
        <Button onClick={() => setIsOpenRight(true)}>
          Открыть Drawer справа
        </Button>
        <Drawer
          isOpen={isOpenRight}
          onClose={() => setIsOpenRight(false)}
          position="right"
          title="Заголовок"
          footer={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="transparent" onClick={() => setIsOpenRight(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsOpenRight(false)}>
                Сохранить
              </Button>
            </div>
          }
        >
          <div style={{ padding: '16px' }}>
            <p>Содержимое Drawer справа</p>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

