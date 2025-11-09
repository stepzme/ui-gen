// Типы для работы с токенами

export type TokenType = 'float' | 'color' | 'string'

export interface TokenValue {
  $type: TokenType
  $value: string | number
  $libraryName?: string
  $collectionName?: string
  $scopes?: string[]
}

export interface Token {
  name: string
  path: string[] // ['xBase', '400'] или ['fontSizes', 'vtbGroup', 'x2']
  type: TokenType
  rawValue: string | number | TokenReference
  modes: Record<string, TokenValue>
  collection: string
  isReference: boolean
}

export interface TokenReference {
  type: 'reference'
  path: string // '{xBase.400}' или '{semantic.text.primary}'
  resolvedPath: string[] // ['xBase', '400']
}

export interface ResolvedToken {
  name: string
  path: string[]
  type: TokenType
  value: string | number
  cssVarName: string
  collection: string
}

export interface TokenCollection {
  name: string
  modes: Record<string, Record<string, any>>
}

export interface ParsedTokens {
  collections: Map<string, TokenCollection>
  tokens: Map<string, Token> // key: path.join('.')
  modeNames: {
    xbase: string[]
    semantic: string[]
    [key: string]: string[]
  }
}

