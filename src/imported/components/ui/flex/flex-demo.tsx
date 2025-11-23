'use client'

import * as React from 'react'
import { Flex } from './flex'

export function FlexDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Flex - Базовый пример (row)</h2>
        <Flex direction="row" gap={16}>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 1</div>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 2</div>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 3</div>
        </Flex>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Flex - Column</h2>
        <Flex direction="column" gap={16}>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 1</div>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 2</div>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 3</div>
        </Flex>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Flex - С justify и align</h2>
        <Flex direction="row" justify="space-between" align="center" gap={16} css={{ height: '100px', background: '#f9f9f9', padding: '16px' }}>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 1</div>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 2</div>
          <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>Элемент 3</div>
        </Flex>
      </div>
    </div>
  )
}

