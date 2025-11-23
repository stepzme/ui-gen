/**
 * Утилиты для работы с токенами и режимами
 * Использует функции из tokens.ts для переключения режимов
 */

import {
  setXBaseMode,
  setSemanticMode,
  getXBaseMode,
  getSemanticMode,
  initializeTokenModes,
} from '@/imported/styles/tokens'

// Реэкспортируем функции из tokens.ts
export {
  setXBaseMode,
  setSemanticMode,
  getXBaseMode,
  getSemanticMode,
  initializeTokenModes,
}

// Инициализация режимов при загрузке модуля (только в браузере)
if (typeof window !== 'undefined') {
  initializeTokenModes()
}

