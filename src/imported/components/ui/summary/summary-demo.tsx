'use client'

import * as React from 'react'
import { Summary } from './summary'
import { SummaryItem } from '@/imported/components/ui/summaryItem'
import { ButtonText } from '@/imported/components/ui/buttonText'

export default function SummaryDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <h1>Summary Component Demo</h1>

      <section>
        <h2>Базовый пример</h2>
        <Summary>
          <SummaryItem title="10%" subtitle="Ставка" />
          <SummaryItem title="100 000 ₽" subtitle="Платеж в месяц" />
          <SummaryItem title="1 500 000" text="500 000" subtitle="Сумма кредита" />
        </Summary>
      </section>

      <section>
        <h2>С футером</h2>
        <Summary
          footerContent={<ButtonText onClick={() => alert('Подробнее')}>Подробнее</ButtonText>}
          align="center"
        >
          <SummaryItem title="10%" subtitle="Ставка" />
          <SummaryItem title="100 000 ₽" subtitle="Платеж в месяц" />
          <SummaryItem title="1 500 000" text="500 000" subtitle="Сумма кредита" />
        </Summary>
      </section>

      <section>
        <h2>С цветовой схемой</h2>
        <Summary colorScheme="neutral">
          <SummaryItem title="10%" subtitle="Ставка" />
          <SummaryItem title="100 000 ₽" subtitle="Платеж в месяц" />
          <SummaryItem title="1 500 000" text="500 000" subtitle="Сумма кредита" />
        </Summary>
      </section>

      <section>
        <h2>Горизонтальное направление</h2>
        <Summary direction="horizontal" align="space-between">
          <SummaryItem title="10%" subtitle="Ставка" />
          <SummaryItem title="100 000 ₽" subtitle="Платеж в месяц" />
          <SummaryItem title="1 500 000" subtitle="Сумма кредита" />
        </Summary>
      </section>

      <section>
        <h2>С разделителями</h2>
        <Summary>
          <SummaryItem title="10%" subtitle="Ставка" hasDivider />
          <SummaryItem title="100 000 ₽" subtitle="Платеж в месяц" hasDivider />
          <SummaryItem title="1 500 000" subtitle="Сумма кредита" />
        </Summary>
      </section>
    </div>
  )
}

