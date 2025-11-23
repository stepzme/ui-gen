'use client'

import * as React from 'react'
import { Modal } from './modal'
import { Button } from '@/imported/components/ui/button'

export function ModalDemo() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(false)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Modal - Базовый пример</h2>
        <Button onClick={() => setIsOpen(true)}>
          Открыть Modal
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Заголовок модального окна"
          description="Описание модального окна"
        >
          <div style={{ padding: '16px' }}>
            <p>Содержимое модального окна</p>
          </div>
        </Modal>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Modal - С футером и разными размерами</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={() => setIsOpen2(true)}>
            Открыть Modal (size: m)
          </Button>
        </div>
        <Modal
          isOpen={isOpen2}
          onClose={() => setIsOpen2(false)}
          size="m"
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
            <p>Содержимое модального окна с футером</p>
          </div>
        </Modal>
      </div>
    </div>
  )
}

