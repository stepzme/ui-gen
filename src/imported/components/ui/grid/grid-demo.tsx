'use client'

import * as React from 'react'
import { Grid } from './grid'
import { GridItem } from './gridItem'

export function GridDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Grid - Базовый пример (12 колонок)</h2>
        <Grid columns={12} gap="x2">
          <GridItem columnSpan={6}>
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              Колонка 1-6
            </div>
          </GridItem>
          <GridItem columnSpan={6}>
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              Колонка 7-12
            </div>
          </GridItem>
          <GridItem columnSpan={4}>
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              Колонка 1-4
            </div>
          </GridItem>
          <GridItem columnSpan={4}>
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              Колонка 5-8
            </div>
          </GridItem>
          <GridItem columnSpan={4}>
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              Колонка 9-12
            </div>
          </GridItem>
        </Grid>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Grid - 3 колонки</h2>
        <Grid columns={3} gap="x3">
          <GridItem>
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              Элемент 1
            </div>
          </GridItem>
          <GridItem>
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              Элемент 2
            </div>
          </GridItem>
          <GridItem>
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              Элемент 3
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

