import type {
  ParsedTokens,
  Token,
  ResolvedToken,
  TokenReference,
} from './types'
import { parseReference } from './token-parser'

/**
 * Разрешает зависимости между токенами
 */
export class TokenResolver {
  private tokens: Map<string, Token>
  private resolvedCache: Map<string, Map<string, ResolvedToken>> = new Map()

  constructor(private parsedTokens: ParsedTokens) {
    this.tokens = parsedTokens.tokens
  }

  /**
   * Разрешает все токены для указанного режима
   */
  resolveTokensForMode(
    xbaseMode: string = '4px',
    semanticMode: string = 'classic'
  ): Map<string, ResolvedToken> {
    const cacheKey = `${xbaseMode}:${semanticMode}`
    if (this.resolvedCache.has(cacheKey)) {
      return this.resolvedCache.get(cacheKey)!
    }

    const resolved = new Map<string, ResolvedToken>()

    // Определяем режимы для разных коллекций
    const modeMap: Record<string, string> = {
      '00 - xBase': xbaseMode,
      '01 - palette': 'value',
      '02 - color tokens': 'light', // или 'dark', но используем light как дефолт
      '02 - semantic': semanticMode,
      '03 - sizes, spaces, radii': 'static',
      '04 - typography': 'vtbGroup', // или 'omegaUI'
    }

    // Сначала разрешаем базовые токены (xBase)
    for (const [tokenKey, token] of this.tokens.entries()) {
      if (token.collection === '00 - xBase') {
        const resolvedToken = this.resolveToken(token, xbaseMode, modeMap)
        if (resolvedToken) {
          resolved.set(tokenKey, resolvedToken)
        }
      }
    }

    // Затем разрешаем остальные токены
    for (const [tokenKey, token] of this.tokens.entries()) {
      if (token.collection !== '00 - xBase') {
        const collectionMode = modeMap[token.collection] || Object.keys(token.modes)[0]
        const resolvedToken = this.resolveToken(token, collectionMode, modeMap, resolved)
        if (resolvedToken) {
          resolved.set(tokenKey, resolvedToken)
        }
      }
    }

    this.resolvedCache.set(cacheKey, resolved)
    return resolved
  }

  /**
   * Разрешает один токен
   */
  private resolveToken(
    token: Token,
    mode: string,
    modeMap: Record<string, string>,
    alreadyResolved?: Map<string, ResolvedToken>
  ): ResolvedToken | null {
    const tokenMode = token.modes[mode] || token.modes[Object.keys(token.modes)[0]]

    if (!tokenMode) {
      console.warn(`No mode found for token ${token.path.join('.')}`)
      return null
    }

    let value: string | number = tokenMode.$value

    // Если это ссылка (начинается с { и заканчивается }), разрешаем её
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      const resolved = this.resolveReference(value, modeMap, alreadyResolved)
      if (resolved === null) {
        console.warn(`Could not resolve reference: ${value} for token ${token.path.join('.')}`)
        return null
      }
      value = resolved
    }

    // Форматируем значение
    if (token.type === 'float') {
      value = typeof value === 'number' ? value : parseFloat(value as string)
    } else if (token.type === 'color') {
      value = value as string
    }

    const cssVarName = this.generateCssVarName(token.path)

    return {
      name: token.name,
      path: token.path,
      type: token.type,
      value,
      cssVarName,
      collection: token.collection,
    }
  }

  /**
   * Разрешает ссылку типа "{xBase.400}"
   */
  private resolveReference(
    ref: string,
    modeMap: Record<string, string>,
    alreadyResolved?: Map<string, ResolvedToken>
  ): string | number | null {
    try {
      const refPath = parseReference(ref)
      const refKey = refPath.join('.')

      // Если токен уже разрешен, используем его значение
      if (alreadyResolved) {
        const resolved = alreadyResolved.get(refKey)
        if (resolved) {
          return resolved.value
        }
      }

      // Ищем токен по пути
      let targetToken: Token | undefined

      // Пробуем найти точное совпадение
      targetToken = this.tokens.get(refKey)

      // Если не нашли, ищем по частичному совпадению (последние части пути)
      if (!targetToken) {
        for (const [key, token] of this.tokens.entries()) {
          if (this.pathMatches(token.path, refPath)) {
            targetToken = token
            break
          }
        }
      }

      // Если все еще не нашли, пробуем найти по последним частям пути
      if (!targetToken && refPath.length > 0) {
        const lastParts = refPath.slice(-2) // Берем последние 2 части
        for (const [key, token] of this.tokens.entries()) {
          if (token.path.length >= lastParts.length) {
            const tokenLastParts = token.path.slice(-lastParts.length)
            if (tokenLastParts.join('.') === lastParts.join('.')) {
              targetToken = token
              break
            }
          }
        }
      }

      if (!targetToken) {
        console.warn(`Token not found for reference: ${ref} (path: ${refPath.join('.')})`)
        return null
      }

      // Определяем режим для целевого токена
      const targetMode = modeMap[targetToken.collection] || Object.keys(targetToken.modes)[0]

      // Разрешаем целевой токен
      const resolved = this.resolveToken(targetToken, targetMode, modeMap, alreadyResolved)
      if (!resolved) {
        return null
      }

      return resolved.value
    } catch (error) {
      console.error(`Error resolving reference ${ref}:`, error)
      return null
    }
  }

  /**
   * Проверяет, соответствует ли путь токена пути ссылки
   */
  private pathMatches(tokenPath: string[], refPath: string[]): boolean {
    if (tokenPath.length !== refPath.length) {
      return false
    }

    for (let i = 0; i < tokenPath.length; i++) {
      if (tokenPath[i] !== refPath[i]) {
        return false
      }
    }

    return true
  }

  /**
   * Генерирует имя CSS переменной из пути токена
   */
  private generateCssVarName(path: string[]): string {
    // Преобразуем путь в имя переменной
    // ['xBase', '400'] -> '--xBase-400'
    // ['fontSizes', 'vtbGroup', 'x2'] -> '--fontSizes-vtbGroup-x2'
    // ['semantic', 'colorScheme', 'brand', 'primary'] -> '--semantic-colorScheme-brand-primary'

    const parts = path.map((part) => {
      // Преобразуем camelCase в kebab-case, но сохраняем числа
      return part.replace(/([A-Z])/g, '-$1').toLowerCase()
    })

    return `--${parts.join('-')}`
  }
}

