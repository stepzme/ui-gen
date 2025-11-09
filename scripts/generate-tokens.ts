#!/usr/bin/env node

import * as fs from 'fs'
import * as path from 'path'
import { parseTokens } from './token-parser'
import { TokenResolver } from './token-resolver'
import { CssGenerator } from './css-generator'
import { TypeScriptGenerator } from './ts-generator'

const ROOT_DIR = path.resolve(__dirname, '..')
const EXPORT_JSON_PATH = path.join(ROOT_DIR, '.cursor', 'instructions', 'export.json')
const OUTPUT_CSS_PATH = path.join(ROOT_DIR, 'src', 'styles', 'tokens.css')
const OUTPUT_TS_PATH = path.join(ROOT_DIR, 'src', 'styles', 'tokens.ts')

function main() {
  console.log('🚀 Starting token generation...')
  console.log(`📂 Reading tokens from: ${EXPORT_JSON_PATH}`)

  // Шаг 1: Парсинг
  console.log('\n📖 Step 1: Parsing tokens...')
  const parsedTokens = parseTokens(EXPORT_JSON_PATH)
  console.log(`✅ Parsed ${parsedTokens.tokens.size} tokens`)
  console.log(`✅ Found ${parsedTokens.collections.size} collections`)
  console.log(`✅ XBase modes: ${parsedTokens.modeNames.xbase.join(', ')}`)
  console.log(`✅ Semantic modes: ${parsedTokens.modeNames.semantic.join(', ')}`)

  // Шаг 2: Разрешение зависимостей
  console.log('\n🔗 Step 2: Resolving dependencies...')
  const resolver = new TokenResolver(parsedTokens)
  
  // Разрешаем токены для всех комбинаций режимов
  const resolvedTokens = new Map<string, Map<string, any>>()
  
  for (const xbaseMode of parsedTokens.modeNames.xbase) {
    for (const semanticMode of parsedTokens.modeNames.semantic) {
      const resolved = resolver.resolveTokensForMode(xbaseMode, semanticMode)
      resolvedTokens.set(`${xbaseMode}:${semanticMode}`, resolved)
      console.log(`  ✅ Resolved tokens for xBase:${xbaseMode}, semantic:${semanticMode}`)
    }
  }

  // Если нет semantic режимов, используем дефолтные
  if (parsedTokens.modeNames.semantic.length === 0) {
    for (const xbaseMode of parsedTokens.modeNames.xbase) {
      const resolved = resolver.resolveTokensForMode(xbaseMode, 'classic')
      resolvedTokens.set(`${xbaseMode}:classic`, resolved)
    }
  }

  // Шаг 3: Генерация CSS
  console.log('\n🎨 Step 3: Generating CSS...')
  const cssGenerator = new CssGenerator()
  const cssContent = cssGenerator.generate(
    resolvedTokens,
    parsedTokens.modeNames.xbase,
    parsedTokens.modeNames.semantic.length > 0
      ? parsedTokens.modeNames.semantic
      : ['classic']
  )

  // Создаем директорию если её нет
  const cssDir = path.dirname(OUTPUT_CSS_PATH)
  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_CSS_PATH, cssContent, 'utf-8')
  console.log(`✅ Generated CSS: ${OUTPUT_CSS_PATH}`)

  // Шаг 4: Генерация TypeScript
  console.log('\n📝 Step 4: Generating TypeScript...')
  const tsGenerator = new TypeScriptGenerator()
  const tsContent = tsGenerator.generate(
    resolvedTokens,
    parsedTokens.modeNames.xbase,
    parsedTokens.modeNames.semantic.length > 0
      ? parsedTokens.modeNames.semantic
      : ['classic']
  )

  const tsDir = path.dirname(OUTPUT_TS_PATH)
  if (!fs.existsSync(tsDir)) {
    fs.mkdirSync(tsDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_TS_PATH, tsContent, 'utf-8')
  console.log(`✅ Generated TypeScript: ${OUTPUT_TS_PATH}`)

  console.log('\n✨ Token generation completed successfully!')
  console.log(`\n📊 Summary:`)
  console.log(`   - Tokens parsed: ${parsedTokens.tokens.size}`)
  console.log(`   - Collections: ${parsedTokens.collections.size}`)
  console.log(`   - XBase modes: ${parsedTokens.modeNames.xbase.length}`)
  console.log(`   - Semantic modes: ${parsedTokens.modeNames.semantic.length || 1}`)
}

try {
  main()
} catch (error) {
  console.error('❌ Error:', error)
  process.exit(1)
}

