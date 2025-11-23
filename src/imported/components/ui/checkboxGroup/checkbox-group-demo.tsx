'use client'

import * as React from 'react'
import { CheckboxGroup } from './checkboxGroup'
import { Checkbox } from '@/imported/components/ui/checkbox'

export function CheckboxGroupDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>CheckboxGroup - Базовый пример</h2>
        <CheckboxGroup groupName="demo1">
          <Checkbox value="option1" label="Опция 1" description="Описание 1" />
          <Checkbox value="option2" label="Опция 2" description="Описание 2" />
          <Checkbox value="option3" label="Опция 3" description="Описание 3" disabled />
        </CheckboxGroup>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>CheckboxGroup - С label</h2>
        <CheckboxGroup groupName="demo2" label="Выберите опции">
          <Checkbox value="option1" label="Опция 1" />
          <Checkbox value="option2" label="Опция 2" />
          <Checkbox value="option3" label="Опция 3" />
        </CheckboxGroup>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>CheckboxGroup - Горизонтальное направление</h2>
        <CheckboxGroup groupName="demo3" direction="horizontal">
          <Checkbox value="option1" label="Опция 1" />
          <Checkbox value="option2" label="Опция 2" />
          <Checkbox value="option3" label="Опция 3" />
        </CheckboxGroup>
      </div>
    </div>
  )
}

