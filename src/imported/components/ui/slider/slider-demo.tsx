'use client'

import * as React from 'react'
import { Slider } from './slider'

export function SliderDemo() {
  const [value, setValue] = React.useState<number>(20)
  const [rangeValue, setRangeValue] = React.useState<number[]>([20, 80])
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Slider - Базовый пример</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' }}>
          <Slider
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={(val) => setValue(val as number)}
          />
          <div>Значение: {value}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Slider - Range</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' }}>
          <Slider
            min={0}
            max={100}
            step={1}
            isRange={true}
            value={rangeValue}
            onChange={(val) => setRangeValue(val as number[])}
          />
          <div>Значение: [{rangeValue[0]}, {rangeValue[1]}]</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Slider - С шагом 10</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '400px' }}>
          <Slider
            min={0}
            max={100}
            step={10}
            value={value}
            onChange={(val) => setValue(val as number)}
          />
          <div>Значение: {value}</div>
        </div>
      </div>
    </div>
  )
}

