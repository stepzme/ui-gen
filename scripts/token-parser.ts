import * as fs from 'fs'
import * as path from 'path'
import type { ParsedTokens, Token, TokenCollection, TokenValue } from './types'

/**
 * Парсит export.json и извлекает все токены с их режимами
 */
export function parseTokens(jsonPath: string): ParsedTokens {
  const jsonContent = fs.readFileSync(jsonPath, 'utf-8')
  const data = JSON.parse(jsonContent)

  const collections = new Map<string, TokenCollection>()
  const tokens = new Map<string, Token>()
  const modeNames: Record<string, string[]> = {
    xbase: [],
    semantic: [],
  }

  // Проходим по всем коллекциям в массиве
  for (const collectionObj of data) {
    for (const [collectionName, collectionData] of Object.entries(collectionObj)) {
      const collection = collectionData as any

      if (!collection.modes) {
        continue
      }

      // Определяем тип коллекции для группировки режимов
      let collectionType = 'other'
      if (collectionName.includes('xBase')) {
        collectionType = 'xbase'
      } else if (collectionName.includes('semantic')) {
        collectionType = 'semantic'
      }

      // Собираем все режимы
      const modes: Record<string, Record<string, any>> = {}
      const modeList: string[] = []

      for (const [modeName, modeData] of Object.entries(collection.modes)) {
        modes[modeName] = modeData as Record<string, any>
        modeList.push(modeName)

        if (collectionType === 'xbase' && !modeNames.xbase.includes(modeName)) {
          modeNames.xbase.push(modeName)
        }
        if (collectionType === 'semantic' && !modeNames.semantic.includes(modeName)) {
          modeNames.semantic.push(modeName)
        }
      }

      collections.set(collectionName, {
        name: collectionName,
        modes,
      })

      // Извлекаем токены из всех режимов
      for (const [modeName, modeData] of Object.entries(modes)) {
        extractTokensFromMode(
          modeData,
          [],
          collectionName,
          modeName,
          tokens,
          modeNames
        )
      }
    }
  }

  return {
    collections,
    tokens,
    modeNames,
  }
}

/**
 * Рекурсивно извлекает токены из объекта режима
 */
function extractTokensFromMode(
  obj: any,
  currentPath: string[],
  collectionName: string,
  modeName: string,
  tokens: Map<string, Token>,
  modeNames: Record<string, string[]>
): void {
  for (const [key, value] of Object.entries(obj)) {
    // Пропускаем служебные поля
    if (key.startsWith('$')) {
      continue
    }

    const newPath = [...currentPath, key]

    // Если это токен (имеет $type и $value)
    if (value && typeof value === 'object' && '$type' in value && '$value' in value) {
      const tokenValue = value as TokenValue
      const tokenKey = newPath.join('.')

      // Проверяем, является ли значение ссылкой
      const isReference =
        typeof tokenValue.$value === 'string' &&
        tokenValue.$value.startsWith('{') &&
        tokenValue.$value.endsWith('}')

      let existingToken = tokens.get(tokenKey)

      if (!existingToken) {
        existingToken = {
          name: key,
          path: newPath,
          type: tokenValue.$type,
          rawValue: tokenValue.$value,
          modes: {},
          collection: collectionName,
          isReference,
        }
        tokens.set(tokenKey, existingToken)
      }

      // Добавляем значение для этого режима
      existingToken.modes[modeName] = tokenValue
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Рекурсивно обрабатываем вложенные объекты
      extractTokensFromMode(
        value,
        newPath,
        collectionName,
        modeName,
        tokens,
        modeNames
      )
    }
  }
}

/**
 * Извлекает путь из ссылки типа "{xBase.400}" или "{semantic.text.primary}"
 */
export function parseReference(ref: string): string[] {
  if (!ref.startsWith('{') || !ref.endsWith('}')) {
    throw new Error(`Invalid reference format: ${ref}`)
  }

  const pathStr = ref.slice(1, -1) // Убираем фигурные скобки
  return pathStr.split('.')
}

