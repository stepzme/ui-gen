'use client'

import * as React from 'react'
import { ChipsGroup } from './chipsGroup'
import { Chip } from '@/imported/components/ui/chip'

export default function ChipsGroupDemo() {
  const [selectedRadio, setSelectedRadio] = React.useState<string | null>(null)
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>([])

  const handleRadioChange = (selected: boolean, value?: string) => {
    if (selected) {
      setSelectedRadio(value || null)
    } else {
      setSelectedRadio(null)
    }
  }

  const handleCheckboxChange = (selected: boolean, value?: string) => {
    if (selected) {
      setSelectedCheckboxes((prev) => [...prev, value || ''])
    } else {
      setSelectedCheckboxes((prev) => prev.filter((v) => v !== value))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>ChipsGroup Component Demo</h1>

      <section>
        <h2>Базовый пример (без inputType)</h2>
        <ChipsGroup groupName="basic">
          <Chip text="Текст 1" value="input_1" />
          <Chip text="Текст 2" value="input_2" />
          <Chip text="Текст 3" value="input_3" />
          <Chip text="Текст 4" value="input_4" />
          <Chip text="Текст 5" value="input_5" />
          <Chip text="Текст 6" value="input_6" />
        </ChipsGroup>
      </section>

      <section>
        <h2>С лейблом</h2>
        <ChipsGroup groupName="with-label" label="Выберите опции">
          <Chip text="Опция 1" value="opt_1" />
          <Chip text="Опция 2" value="opt_2" />
          <Chip text="Опция 3" value="opt_3" />
        </ChipsGroup>
      </section>

      <section>
        <h2>Radio группа</h2>
        <ChipsGroup
          groupName="radio-group"
          label="Выберите один вариант"
          inputType="radio"
          onChange={handleRadioChange}
        >
          <Chip text="Вариант 1" value="radio_1" selected={selectedRadio === 'radio_1'} />
          <Chip text="Вариант 2" value="radio_2" selected={selectedRadio === 'radio_2'} />
          <Chip text="Вариант 3" value="radio_3" selected={selectedRadio === 'radio_3'} />
        </ChipsGroup>
        <p style={{ marginTop: '8px', color: '#666' }}>
          Выбрано: {selectedRadio || 'ничего'}
        </p>
      </section>

      <section>
        <h2>Checkbox группа</h2>
        <ChipsGroup
          groupName="checkbox-group"
          label="Выберите несколько вариантов"
          inputType="checkbox"
          onChange={handleCheckboxChange}
        >
          <Chip text="Чекбокс 1" value="check_1" selected={selectedCheckboxes.includes('check_1')} />
          <Chip text="Чекбокс 2" value="check_2" selected={selectedCheckboxes.includes('check_2')} />
          <Chip text="Чекбокс 3" value="check_3" selected={selectedCheckboxes.includes('check_3')} />
          <Chip text="Чекбокс 4" value="check_4" selected={selectedCheckboxes.includes('check_4')} />
        </ChipsGroup>
        <p style={{ marginTop: '8px', color: '#666' }}>
          Выбрано: {selectedCheckboxes.length > 0 ? selectedCheckboxes.join(', ') : 'ничего'}
        </p>
      </section>

      <section>
        <h2>Прокручиваемый (scrollable)</h2>
        <ChipsGroup groupName="scrollable" scrollable={true}>
          <Chip text="Длинный текст 1" value="s1" />
          <Chip text="Длинный текст 2" value="s2" />
          <Chip text="Длинный текст 3" value="s3" />
          <Chip text="Длинный текст 4" value="s4" />
          <Chip text="Длинный текст 5" value="s5" />
          <Chip text="Длинный текст 6" value="s6" />
          <Chip text="Длинный текст 7" value="s7" />
          <Chip text="Длинный текст 8" value="s8" />
          <Chip text="Длинный текст 9" value="s9" />
          <Chip text="Длинный текст 10" value="s10" />
        </ChipsGroup>
      </section>

      <section>
        <h2>Отключенная группа</h2>
        <ChipsGroup groupName="disabled" label="Отключенная группа" disabled>
          <Chip text="Чип 1" value="d1" />
          <Chip text="Чип 2" value="d2" />
          <Chip text="Чип 3" value="d3" />
        </ChipsGroup>
      </section>

      <section>
        <h2>С иконками</h2>
        <ChipsGroup groupName="with-icons" label="Чипы с иконками">
          <Chip text="С иконкой" value="i1" icon={<span>🎨</span>} />
          <Chip text="Еще один" value="i2" icon={<span>🚀</span>} />
          <Chip text="И еще" value="i3" icon={<span>⭐</span>} />
        </ChipsGroup>
      </section>
    </div>
  )
}

