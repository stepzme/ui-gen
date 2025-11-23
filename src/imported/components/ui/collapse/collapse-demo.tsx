'use client'

import * as React from 'react'
import { Collapse } from './collapse'
import { Button } from '@/imported/components/ui/button'

export function CollapseDemo() {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isHorizontalOpen, setIsHorizontalOpen] = React.useState(false)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Collapse - Вертикальный</h2>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Свернуть' : 'Развернуть'}
        </Button>
        <Collapse isOpen={isOpen}>
          <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </Collapse>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Collapse - Горизонтальный</h2>
        <Button onClick={() => setIsHorizontalOpen(!isHorizontalOpen)}>
          {isHorizontalOpen ? 'Свернуть' : 'Развернуть'}
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Collapse isOpen={isHorizontalOpen} isHorizontal>
            <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '4px', whiteSpace: 'nowrap' }}>
              Горизонтальный контент
            </div>
          </Collapse>
          <div>Текст после collapse</div>
        </div>
      </div>
    </div>
  )
}

