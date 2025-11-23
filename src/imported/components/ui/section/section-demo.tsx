'use client'

import * as React from 'react'
import { Section } from './section'
import { Row } from '@/imported/components/ui/row'

export function SectionDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Section - Базовый пример</h2>
        <Section>
          <Row>Строка 1</Row>
          <Row>Строка 2</Row>
          <Row>Строка 3</Row>
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Section - Две колонки</h2>
        <Section col>
          <Row>Строка 1</Row>
          <Row>Строка 2</Row>
          <Row>Строка 3</Row>
          <Row>Строка 4</Row>
        </Section>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Section - С разными gap</h2>
        <Section gap="tiny">
          <Row>Строка 1 (tiny gap)</Row>
          <Row>Строка 2</Row>
        </Section>
        <Section gap="small">
          <Row>Строка 1 (small gap)</Row>
          <Row>Строка 2</Row>
        </Section>
        <Section gap="medium">
          <Row>Строка 1 (medium gap)</Row>
          <Row>Строка 2</Row>
        </Section>
      </div>
    </div>
  )
}

