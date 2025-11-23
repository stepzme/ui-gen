'use client'

import * as React from 'react'
import { RadioGroup } from './radioGroup'
import { Radio } from '@/imported/components/ui/radio'

export function RadioGroupDemo() {
  const [value, setValue] = React.useState('option1')
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>RadioGroup - Базовый пример</h2>
        <RadioGroup
          groupName="demo1"
          onChange={(isSelected, value, groupName) => {
            if (isSelected) {
              setValue(value || '')
              console.log('Selected:', value, 'Group:', groupName)
            }
          }}
        >
          <Radio value="option1" label="Опция 1" description="Описание 1" />
          <Radio value="option2" label="Опция 2" description="Описание 2" />
          <Radio value="option3" label="Опция 3" description="Описание 3" disabled />
        </RadioGroup>
        <div>Выбрано: {value}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>RadioGroup - С label</h2>
        <RadioGroup
          groupName="demo2"
          label="Выберите опцию"
          onChange={() => {}}
        >
          <Radio value="option1" label="Опция 1" />
          <Radio value="option2" label="Опция 2" />
          <Radio value="option3" label="Опция 3" />
        </RadioGroup>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>RadioGroup - Горизонтальное направление</h2>
        <RadioGroup
          groupName="demo3"
          direction="horizontal"
          onChange={() => {}}
        >
          <Radio value="option1" label="Опция 1" />
          <Radio value="option2" label="Опция 2" />
          <Radio value="option3" label="Опция 3" />
        </RadioGroup>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>RadioGroup - Две колонки</h2>
        <RadioGroup
          groupName="demo4"
          direction="vertical"
          columnNumber="twoColumn"
          onChange={() => {}}
        >
          <Radio value="option1" label="Опция 1" />
          <Radio value="option2" label="Опция 2" />
          <Radio value="option3" label="Опция 3" />
          <Radio value="option4" label="Опция 4" />
        </RadioGroup>
      </div>
    </div>
  )
}

