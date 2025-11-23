'use client'

import * as React from 'react'
import { Row } from './row'

export function RowDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Row - Базовый пример</h2>
        <Row>Строка с одним элементом</Row>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Row - С разным количеством колонок</h2>
        <Row columns={2}>
          <div>Колонка 1</div>
          <div>Колонка 2</div>
        </Row>
        <Row columns={3}>
          <div>Колонка 1</div>
          <div>Колонка 2</div>
          <div>Колонка 3</div>
        </Row>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Row - С preset</h2>
        <Row preset="pageHeadline">Page Headline</Row>
        <Row preset="sectionHeadline">Section Headline</Row>
        <Row preset="text">Text</Row>
      </div>
    </div>
  )
}

