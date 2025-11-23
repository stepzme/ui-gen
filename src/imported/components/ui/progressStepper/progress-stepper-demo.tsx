'use client'

import * as React from 'react'
import { ProgressStepper } from './progressStepper'

export default function ProgressStepperDemo() {
  const [activeStep, setActiveStep] = React.useState(2)

  React.useEffect(() => {
    if (activeStep === 6) return
    const timer = setTimeout(() => setActiveStep((prev) => prev + 1), 2000)
    return () => clearTimeout(timer)
  }, [activeStep])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>ProgressStepper Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <ProgressStepper
          title="Данные по ИИС"
          description="Далее — Завершение операции"
          extraText="Extra Text"
          steps={['1 из 6 шагов', '2 из 6 шагов', '3 из 6 шагов', '4 из 6 шагов', '5 из 6 шагов', '6 из 6 шагов']}
          activeStep={activeStep}
        />
      </section>

      <section>
        <h2>С процентами</h2>
        <ProgressStepper title="Заголовок" description="Описание" percent={45} />
      </section>

      <section>
        <h2>Разные цветовые схемы</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ProgressStepper title="Brand" percent={50} colorScheme="brand" />
          <ProgressStepper title="Success" percent={50} colorScheme="success" />
          <ProgressStepper title="Info" percent={50} colorScheme="info" />
          <ProgressStepper title="Warning" percent={50} colorScheme="warning" />
          <ProgressStepper title="Critical" percent={50} colorScheme="critical" />
        </div>
      </section>

      <section>
        <h2>Без подписей</h2>
        <ProgressStepper
          title="Заголовок"
          description="Описание"
          steps={['Шаг 1', 'Шаг 2', 'Шаг 3']}
          activeStep={2}
          hideStepLabel
          hidePercentLabel
        />
      </section>

      <section>
        <h2>Прямоугольная форма</h2>
        <ProgressStepper title="Заголовок" percent={60} rect />
      </section>

      <section>
        <h2>Сброс</h2>
        <button onClick={() => setActiveStep(2)}>Сбросить до 2 шага</button>
      </section>
    </div>
  )
}

