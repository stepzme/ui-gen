'use client'

import * as React from 'react'
import { BottomSheet } from './bottomSheet'
import { Button } from '@/imported/components/ui/button'

export function BottomSheetDemo() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(false)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>BottomSheet - Базовый пример</h2>
        <Button onClick={() => setIsOpen(true)}>
          Открыть BottomSheet
        </Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Заголовок"
          description="Описание"
        >
          <div style={{ padding: '16px' }}>
            <p>Содержимое BottomSheet</p>
          </div>
        </BottomSheet>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>BottomSheet - С футером</h2>
        <Button onClick={() => setIsOpen2(true)}>
          Открыть BottomSheet с футером
        </Button>
        <BottomSheet
          isOpen={isOpen2}
          onClose={() => setIsOpen2(false)}
          title="Заголовок"
          footer={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="transparent" onClick={() => setIsOpen2(false)}>
                Отмена
              </Button>
              <Button onClick={() => setIsOpen2(false)}>
                Сохранить
              </Button>
            </div>
          }
        >
          <div style={{ padding: '16px' }}>
            <p>Содержимое с футером</p>
          </div>
        </BottomSheet>
      </div>
    </div>
  )
}

