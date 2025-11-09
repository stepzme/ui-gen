import type { ResolvedToken } from './types'

/**
 * Генерирует TypeScript файл с типами и утилитами для токенов
 */
export class TypeScriptGenerator {
  /**
   * Генерирует TypeScript код
   */
  generate(
    resolvedTokens: Map<string, Map<string, ResolvedToken>>,
    xbaseModes: string[],
    semanticModes: string[]
  ): string {
    const lines: string[] = []

    // Импорты
    lines.push('// Auto-generated file. Do not edit manually.')
    lines.push('// Generated from Figma tokens export.json')
    lines.push('')
    lines.push('export type XBaseMode = ' + xbaseModes.map((m) => `'${m}'`).join(' | '))
    lines.push('export type SemanticMode = ' + semanticModes.map((m) => `'${m}'`).join(' | '))
    lines.push('')

    // Генерируем объект с путями токенов
    const defaultResolved = resolvedTokens.get(`${xbaseModes[0]}:${semanticModes[0]}`)
    if (defaultResolved) {
      lines.push('export const tokenPaths = {')
      this.generateTokenPaths(defaultResolved, lines, 1)
      lines.push('} as const')
      lines.push('')
    }

    // Утилиты
    lines.push('/**')
    lines.push(' * Получить значение токена по пути')
    lines.push(' */')
    lines.push('export function getTokenValue(path: string): string {')
    lines.push('  return getComputedStyle(document.documentElement).getPropertyValue(path)')
    lines.push('}')
    lines.push('')

    lines.push('/**')
    lines.push(' * Установить режим xBase')
    lines.push(' */')
    lines.push('export function setXBaseMode(mode: XBaseMode): void {')
    lines.push('  if (typeof document !== "undefined") {')
    lines.push('    document.documentElement.setAttribute("data-xbase-mode", mode)')
    lines.push('  }')
    lines.push('}')
    lines.push('')

    lines.push('/**')
    lines.push(' * Установить режим semantic')
    lines.push(' */')
    lines.push('export function setSemanticMode(mode: SemanticMode): void {')
    lines.push('  if (typeof document !== "undefined") {')
    lines.push('    document.documentElement.setAttribute("data-semantic-mode", mode)')
    lines.push('  }')
    lines.push('}')
    lines.push('')

    lines.push('/**')
    lines.push(' * Получить текущий режим xBase')
    lines.push(' */')
    lines.push('export function getXBaseMode(): XBaseMode {')
    lines.push('  if (typeof document === "undefined") return "4px"')
    lines.push(
      `  return (document.documentElement.getAttribute("data-xbase-mode") || "${xbaseModes[0]}") as XBaseMode`
    )
    lines.push('}')
    lines.push('')

    lines.push('/**')
    lines.push(' * Получить текущий режим semantic')
    lines.push(' */')
    lines.push('export function getSemanticMode(): SemanticMode {')
    lines.push('  if (typeof document === "undefined") return "classic"')
    lines.push(
      `  return (document.documentElement.getAttribute("data-semantic-mode") || "${semanticModes[0]}") as SemanticMode`
    )
    lines.push('}')
    lines.push('')

    lines.push('/**')
    lines.push(' * Инициализация дефолтных режимов')
    lines.push(' */')
    lines.push('export function initializeTokenModes(): void {')
    lines.push('  if (typeof document === "undefined") return')
    lines.push('  if (!document.documentElement.getAttribute("data-xbase-mode")) {')
    lines.push(`    setXBaseMode("${xbaseModes[0]}")`)
    lines.push('  }')
    lines.push('  if (!document.documentElement.getAttribute("data-semantic-mode")) {')
    lines.push(`    setSemanticMode("${semanticModes[0]}")`)
    lines.push('  }')
    lines.push('}')
    lines.push('')

    return lines.join('\n')
  }

  /**
   * Рекурсивно генерирует пути токенов
   */
  private generateTokenPaths(
    resolved: Map<string, ResolvedToken>,
    lines: string[],
    indent: number
  ): void {
    const indentStr = '  '.repeat(indent)
    const tokens = Array.from(resolved.values()).sort((a, b) =>
      a.path.join('.').localeCompare(b.path.join('.'))
    )

    // Создаем дерево из токенов
    const tree: any = {}

    for (const token of tokens) {
      let current = tree
      for (let i = 0; i < token.path.length - 1; i++) {
        const part = token.path[i]
        if (!current[part]) {
          current[part] = {}
        }
        current = current[part]
      }
      const lastPart = token.path[token.path.length - 1]
      current[lastPart] = token.cssVarName
    }

    // Рекурсивно выводим дерево
    this.printTree(tree, lines, indent)
  }

  /**
   * Рекурсивно выводит дерево токенов
   */
  private printTree(tree: any, lines: string[], indent: number): void {
    const indentStr = '  '.repeat(indent)

    for (const [key, value] of Object.entries(tree)) {
      if (typeof value === 'string') {
        // Это конечное значение (CSS переменная)
        lines.push(`${indentStr}${key}: '${value}',`)
      } else {
        // Это объект, продолжаем рекурсию
        lines.push(`${indentStr}${key}: {`)
        this.printTree(value, lines, indent + 1)
        lines.push(`${indentStr}},`)
      }
    }
  }
}

