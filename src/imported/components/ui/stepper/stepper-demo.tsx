'use client'

import * as React from 'react'
import { Stepper } from './stepper'

export default function StepperDemo() {
  const [activeStep, setActiveStep] = React.useState(2)
  const [selectedStep, setSelectedStep] = React.useState<number | undefined>()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>Stepper Component Demo</h1>

      <section>
        <h2>Базовый пример (горизонтальный)</h2>
        <Stepper
          width="200px"
          activeStep={activeStep}
          items={[
            { key: 1, label: 'Название 1', description: 'Краткое описание на две-три строки' },
            { key: 2, label: 'Название 2', description: 'Краткое описание на две-три строки', link: { text: 'Link', href: '#' } },
            { key: 3, label: 'Название 3', link: { text: 'Link', href: '#' } },
            { key: 4, label: 'Название 4' },
            { key: 5, label: 'Название 5', description: 'Create an account' },
          ]}
        />
      </section>

      <section>
        <h2>Вертикальный</h2>
        <Stepper
          direction="vertical"
          activeStep={activeStep}
          items={[
            { key: 1, label: 'Название 1', description: 'Краткое описание' },
            { key: 2, label: 'Название 2', description: 'Краткое описание' },
            { key: 3, label: 'Название 3' },
          ]}
        />
      </section>

      <section>
        <h2>С кликом по шагам</h2>
        <Stepper
          width="200px"
          activeStep={activeStep}
          selectedStep={selectedStep}
          onStepClick={setSelectedStep}
          items={[
            { key: 1, label: 'Название 1' },
            { key: 2, label: 'Название 2' },
            { key: 3, label: 'Название 3' },
            { key: 4, label: 'Название 4' },
          ]}
        />
        <p style={{ marginTop: '8px', color: '#666' }}>
          Выбранный шаг: {selectedStep !== undefined ? selectedStep + 1 : 'нет'}
        </p>
      </section>

      <section>
        <h2>Управление</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setActiveStep(Math.max(0, activeStep - 1))}>Назад</button>
          <button onClick={() => setActiveStep(Math.min(4, activeStep + 1))}>Вперед</button>
        </div>
      </section>
    </div>
  )
}

