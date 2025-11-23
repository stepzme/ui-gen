// Auto-generated file. Do not edit manually.
// Generated from Figma tokens export.json

export type XBaseMode = '4px' | '5px' | '6px' | '3px'
export type SemanticMode = 'classic' | 'vtbo'

/**
 * Получить значение токена по пути
 */
export function getTokenValue(path: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(path)
}

/**
 * Установить режим xBase
 */
export function setXBaseMode(mode: XBaseMode): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-xbase-mode", mode)
  }
}

/**
 * Установить режим semantic
 */
export function setSemanticMode(mode: SemanticMode): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-semantic-mode", mode)
  }
}

/**
 * Получить текущий режим xBase
 */
export function getXBaseMode(): XBaseMode {
  if (typeof document === "undefined") return "4px"
  return (document.documentElement.getAttribute("data-xbase-mode") || "4px") as XBaseMode
}

/**
 * Получить текущий режим semantic
 */
export function getSemanticMode(): SemanticMode {
  if (typeof document === "undefined") return "classic"
  return (document.documentElement.getAttribute("data-semantic-mode") || "classic") as SemanticMode
}

/**
 * Инициализация дефолтных режимов
 */
export function initializeTokenModes(): void {
  if (typeof document === "undefined") return
  if (!document.documentElement.getAttribute("data-xbase-mode")) {
    setXBaseMode("4px")
  }
  if (!document.documentElement.getAttribute("data-semantic-mode")) {
    setSemanticMode("classic")
  }
}
