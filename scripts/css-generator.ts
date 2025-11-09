import type { ResolvedToken } from './types'

/**
 * Генерирует CSS файл с переменными для всех режимов
 */
export class CssGenerator {
  private defaultXBaseMode = '4px'
  private defaultSemanticMode = 'classic'

  /**
   * Генерирует CSS для всех режимов
   */
  generate(
    resolvedTokens: Map<string, Map<string, ResolvedToken>>,
    xbaseModes: string[],
    semanticModes: string[]
  ): string {
    const lines: string[] = []

    // Генерируем CSS для каждого режима xBase
    for (const xbaseMode of xbaseModes) {
      const resolved = resolvedTokens.get(`${xbaseMode}:${this.defaultSemanticMode}`)
      if (!resolved) continue

      lines.push(`:root[data-xbase-mode="${xbaseMode}"] {`)
      this.addTokensForCollection(resolved, '00 - xBase', lines)
      lines.push('}')
      lines.push('')
    }

    // Генерируем CSS для каждого режима semantic
    for (const semanticMode of semanticModes) {
      const resolved = resolvedTokens.get(`${this.defaultXBaseMode}:${semanticMode}`)
      if (!resolved) continue

      lines.push(`:root[data-semantic-mode="${semanticMode}"] {`)
      this.addTokensForCollection(resolved, '02 - semantic', lines)
      lines.push('}')
      lines.push('')
    }

    // Генерируем дефолтные значения на :root
    const defaultResolved = resolvedTokens.get(
      `${this.defaultXBaseMode}:${this.defaultSemanticMode}`
    )
    if (defaultResolved) {
      lines.push(':root {')
      this.addAllTokens(defaultResolved, lines)
      lines.push('}')
      lines.push('')
    }

    return lines.join('\n')
  }

  /**
   * Добавляет токены для конкретной коллекции
   */
  private addTokensForCollection(
    resolved: Map<string, ResolvedToken>,
    collectionName: string,
    lines: string[]
  ): void {
    const tokens = Array.from(resolved.values()).filter(
      (token) => token.collection === collectionName
    )

    for (const token of tokens) {
      const value = this.formatTokenValue(token)
      lines.push(`  ${token.cssVarName}: ${value};`)
    }
  }

  /**
   * Добавляет все токены
   */
  private addAllTokens(resolved: Map<string, ResolvedToken>, lines: string[]): void {
    const tokens = Array.from(resolved.values())

    // Сортируем токены по коллекциям и путям
    tokens.sort((a, b) => {
      if (a.collection !== b.collection) {
        return a.collection.localeCompare(b.collection)
      }
      return a.path.join('.').localeCompare(b.path.join('.'))
    })

    for (const token of tokens) {
      const value = this.formatTokenValue(token)
      lines.push(`  ${token.cssVarName}: ${value};`)
    }
  }

  /**
   * Форматирует значение токена для CSS
   */
  private formatTokenValue(token: ResolvedToken): string {
    if (token.type === 'float') {
      return `${token.value}px`
    } else if (token.type === 'color') {
      return token.value as string
    } else {
      return String(token.value)
    }
  }
}

