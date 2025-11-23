'use client'

import * as React from 'react'
import { Status } from './status'

export function StatusDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Status - Базовые примеры</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status colorScheme="info">Информация</Status>
          <Status colorScheme="success">Успешно</Status>
          <Status colorScheme="warning">Предупреждение</Status>
          <Status colorScheme="error">Ошибка</Status>
          <Status colorScheme="brand">Бренд</Status>
          <Status colorScheme="neutral">Нейтральный</Status>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Status - С описанием</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status colorScheme="info" description="Дополнительное описание">
            Информация
          </Status>
          <Status colorScheme="success" description="Операция выполнена успешно">
            Успешно
          </Status>
          <Status colorScheme="warning" description="Требуется внимание">
            Предупреждение
          </Status>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Status - Размеры</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status colorScheme="info" typography="bodyS">
            Маленький размер
          </Status>
          <Status colorScheme="info" typography="bodyM">
            Средний размер
          </Status>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Status - Положение иконки</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status colorScheme="info" iconPosition="left">
            Иконка слева
          </Status>
          <Status colorScheme="info" iconPosition="right">
            Иконка справа
          </Status>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Status - Без иконки</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Status colorScheme="info" hasIcon={false}>
            Без иконки
          </Status>
        </div>
      </div>
    </div>
  )
}

