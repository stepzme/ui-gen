'use client'

import * as React from 'react'
import { SwitchGroup } from './switchGroup'
import { Switch } from '@/imported/components/ui/switch'

export function SwitchGroupDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>SwitchGroup - Базовый пример</h2>
        <SwitchGroup groupName="demo1">
          <Switch id="1" value="option1" label="Опция 1" />
          <Switch id="2" value="option2" label="Опция 2" isActive />
          <Switch id="3" value="option3" label="Опция 3" disabled />
        </SwitchGroup>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>SwitchGroup - С label</h2>
        <SwitchGroup groupName="demo2" label="Настройки">
          <Switch id="4" value="option1" label="Опция 1" />
          <Switch id="5" value="option2" label="Опция 2" />
          <Switch id="6" value="option3" label="Опция 3" />
        </SwitchGroup>
      </div>
    </div>
  )
}

