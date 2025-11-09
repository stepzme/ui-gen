# План миграции на Stitches с токенами из Figma

## Обзор

Полная миграция проекта с Tailwind CSS на Stitches с использованием токенов из Figma. Миграция выполняется в 4 фазы: сначала токены, затем компоненты, без обратной совместимости.

---

## Фаза 1: Генератор токенов из Figma

### Цель
Создать систему генерации CSS переменных и TypeScript типов из `export.json` с поддержкой режимов (themes).

### Задачи

#### 1.1. Создать структуру генератора
**Файлы:**
- `scripts/generate-tokens.ts` - основной скрипт генерации
- `scripts/token-parser.ts` - парсинг export.json
- `scripts/token-resolver.ts` - разрешение зависимостей
- `scripts/css-generator.ts` - генерация CSS
- `scripts/ts-generator.ts` - генерация TypeScript типов

**Структура данных:**
```typescript
interface Token {
  name: string
  path: string[] // ['xBase', '400']
  type: 'float' | 'color' | 'string'
  value: string | number | TokenReference
  modes: Record<string, TokenValue>
  collection: string
}

interface TokenReference {
  type: 'reference'
  path: string // '{xBase.400}'
  resolvedPath: string[] // ['xBase', '400']
}
```

#### 1.2. Парсинг export.json
**Алгоритм:**
1. Загрузить `export.json`
2. Обойти все коллекции:
   - `00 - xBase` → modes: `4px`, `5px`, `6px`, `3px`
   - `01 - palette` → modes: `value`
   - `02 - color tokens` → modes: `light`, `dark`
   - `02 - semantic` → modes: `classic`, `vtbo`
   - `03 - sizes, spaces, radii` → modes: `static`
   - `04 - typography` → modes: `vtbGroup`, `omegaUI`
3. Извлечь все токены с их путями и значениями
4. Определить зависимости (`{xBase.400}`)

**Результат:** Дерево токенов с полной информацией о режимах

#### 1.3. Разрешение зависимостей
**Алгоритм:**
1. Построить граф зависимостей
2. Топологическая сортировка для определения порядка разрешения
3. Рекурсивное разрешение:
   - `{xBase.400}` → найти значение в текущем режиме
   - Если зависимость сама ссылается на другой токен → рекурсия
   - Кэширование разрешенных значений
4. Валидация циклических зависимостей

**Пример:**
```typescript
// Вход: {xBase.400}
// Режим: 4px
// Выход: 16

// Вход: fontSizes.vtbGroup.x2 → {xBase.400}
// Режим: 4px
// Выход: 16
```

#### 1.4. Генерация tokens.css
**Структура:**
```css
:root[data-xbase-mode="4px"] {
  --xBase-0: 0px;
  --xBase-50: 2px;
  --xBase-100: 4px;
  --xBase-400: 16px;
  /* ... */
}

:root[data-xbase-mode="5px"] {
  --xBase-0: 0px;
  --xBase-50: 2.5px;
  --xBase-100: 5px;
  --xBase-400: 20px;
  /* ... */
}

:root[data-semantic-mode="classic"] {
  --semantic-colorScheme-brand-primary: #...;
  /* ... */
}

:root[data-semantic-mode="vtbo"] {
  --semantic-colorScheme-brand-primary: #...;
  /* ... */
}

/* Дефолтные режимы */
:root {
  --xBase-0: var(--xBase-0);
  --xBase-50: var(--xBase-50);
  /* ... */
}
```

**Правила именования:**
- `xBase.400` → `--xBase-400`
- `fontSizes.vtbGroup.x2` → `--fontSizes-vtbGroup-x2`
- `semantic.colorScheme.brand.primary` → `--semantic-colorScheme-brand-primary`
- Заменить точки на дефисы, camelCase сохранить

**Дефолтные режимы:**
- `data-xbase-mode="4px"` (установить на :root)
- `data-semantic-mode="classic"` (установить на :root)

#### 1.5. Генерация tokens.ts
**Структура:**
```typescript
// Автогенерируемые типы
export type XBaseMode = '3px' | '4px' | '5px' | '6px'
export type SemanticMode = 'classic' | 'vtbo'

export const tokenPaths = {
  xBase: {
    '0': '--xBase-0',
    '50': '--xBase-50',
    '400': '--xBase-400',
    // ...
  },
  fontSizes: {
    vtbGroup: {
      x1: '--fontSizes-vtbGroup-x1',
      x2: '--fontSizes-vtbGroup-x2',
      // ...
    }
  },
  // ...
} as const

export function getTokenValue(path: string): string {
  // Утилита для получения значения токена
}

export function setMode(type: 'xbase' | 'semantic', mode: string): void {
  // Утилита для переключения режимов
}
```

#### 1.6. Запуск генератора
**Команда:**
```bash
npm run generate:tokens
```

**Скрипт в package.json:**
```json
{
  "scripts": {
    "generate:tokens": "tsx scripts/generate-tokens.ts"
  }
}
```

**Выходные файлы:**
- `src/styles/tokens.css` (перезаписывается)
- `src/styles/tokens.ts` (перезаписывается)

---

## Фаза 2: Настройка Stitches

### Цель
Настроить Stitches для работы с токенами из Figma и CSS переменными.

### Задачи

#### 2.1. Установка зависимостей
```bash
npm install @stitches/react
npm install -D tsx  # для запуска скриптов генерации
```

#### 2.2. Создание stitches.config.ts
**Расположение:** `src/styles/stitches.config.ts`

**Структура:**
```typescript
import { createStitches } from '@stitches/react'
import * as tokens from './tokens'

const { styled, css, getCssText, theme, createTheme, globalCss } = createStitches({
  theme: {
    // Маппинг токенов из Figma
    colors: {
      // Палитра
      'venusOrange-0': 'var(--venusOrange-0)',
      'venusOrange-50': 'var(--venusOrange-50)',
      // ...
      
      // Семантические цвета
      'semantic-colorScheme-brand-primary': 'var(--semantic-colorScheme-brand-primary)',
      'semantic-text-primary': 'var(--semantic-text-primary)',
      // ...
      
      // Компоненты
      'button-filled-primary-bodyNormal': 'var(--button-filled-primary-bodyNormal)',
      // ...
    },
    
    space: {
      'x0': 'var(--xBase-0)',
      'x50': 'var(--xBase-50)',
      'x100': 'var(--xBase-100)',
      'x200': 'var(--xBase-200)',
      'x400': 'var(--xBase-400)',
      // ...
    },
    
    sizes: {
      'x0': 'var(--xBase-0)',
      'x50': 'var(--xBase-50)',
      // ... (дублирование space для удобства)
    },
    
    radii: {
      'x0': 'var(--radii-x0)',
      'x1': 'var(--radii-x1)',
      'x2': 'var(--radii-x2)',
      // ...
    },
    
    fontSizes: {
      'vtbGroup-x1': 'var(--fontSizes-vtbGroup-x1)',
      'vtbGroup-x2': 'var(--fontSizes-vtbGroup-x2)',
      'omegaUI-x1': 'var(--fontSizes-omegaUI-x1)',
      // ...
    },
    
    lineHeights: {
      'x1': 'var(--lineHeights-x1)',
      'x2': 'var(--lineHeights-x2)',
      // ...
    },
    
    fonts: {
      sans: 'var(--fonts-display)',
      display: 'var(--fonts-display)',
      headline: 'var(--fonts-headline)',
      body: 'var(--fonts-body)',
    },
    
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    shadows: {
      xxs: 'var(--shadows-xxs)',
      sm: 'var(--shadows-sm)',
      md: 'var(--shadows-md)',
      lg: 'var(--shadows-lg)',
    },
  },
  
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  },
  
  utils: {
    // Кастомные утилиты для удобства
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    mx: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: string) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
})

export { styled, css, getCssText, theme, createTheme, globalCss }
export type { CSS } from '@stitches/react'
```

#### 2.3. Интеграция с Next.js
**Файл:** `src/app/layout.tsx`

**Изменения:**
```typescript
import { getCssText } from '@/styles/stitches.config'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**Или через `_document.tsx`** (если используется Pages Router)

#### 2.4. Подключение tokens.css
**Файл:** `src/styles/globals.css`

**Изменения:**
```css
@import "./tokens.css";  /* Токены из Figma */
/* Удалить @import "tailwindcss"; */
```

#### 2.5. Утилиты для переключения режимов
**Файл:** `src/lib/token-utils.ts`

```typescript
import type { XBaseMode, SemanticMode } from '@/styles/tokens'

export function setXBaseMode(mode: XBaseMode): void {
  document.documentElement.setAttribute('data-xbase-mode', mode)
}

export function setSemanticMode(mode: SemanticMode): void {
  document.documentElement.setAttribute('data-semantic-mode', mode)
}

export function getXBaseMode(): XBaseMode {
  return (document.documentElement.getAttribute('data-xbase-mode') || '4px') as XBaseMode
}

export function getSemanticMode(): SemanticMode {
  return (document.documentElement.getAttribute('data-semantic-mode') || 'classic') as SemanticMode
}

// Инициализация дефолтных режимов
if (typeof document !== 'undefined') {
  if (!document.documentElement.getAttribute('data-xbase-mode')) {
    setXBaseMode('4px')
  }
  if (!document.documentElement.getAttribute('data-semantic-mode')) {
    setSemanticMode('classic')
  }
}
```

#### 2.6. Обновление globals.css
**Удалить:**
- `@import "tailwindcss";`
- `@import "tw-animate-css";`
- `@theme inline { ... }` (если есть)

**Оставить:**
- `@font-face` определения
- Базовые стили (если есть)

---

## Фаза 3: Миграция компонентов

### Цель
Переписать все UI компоненты с Tailwind на Stitches.

### Стратегия миграции

#### 3.1. Порядок миграции компонентов
1. **Базовые компоненты:**
   - `Text` → использует типографику
   - `Button` → использует цвета, spacing, radii
   - `Input` → использует spacing, radii, colors
   - `Label` → простой компонент

2. **Средние компоненты:**
   - `Badge`
   - `Avatar`
   - `Cell`
   - `Separator`
   - `Skeleton`

3. **Сложные компоненты:**
   - `Dialog`
   - `Sheet`
   - `DropdownMenu`
   - `Select`
   - `Switch`
   - `Tooltip`
   - `Collapsible`

4. **Специальные компоненты:**
   - `Icon`
   - `Image`
   - `ButtonIcon`
   - `Textarea`

#### 3.2. Шаблон миграции компонента

**До (Tailwind + CVA):**
```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x2",
  {
    variants: {
      variant: { primary: "", secondary: "" },
      size: { default: "h-9 px-x4", sm: "h-8 px-x3" }
    }
  }
)

export function Button({ variant, size, className, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
```

**После (Stitches):**
```typescript
import { styled } from "@/styles/stitches.config"
import type { CSS } from "@stitches/react"

const Button = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$space.x200',
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$colors.button-filled-primary-bodyNormal',
        color: '$colors.button-filled-primary-text',
        '&:hover': {
          backgroundColor: '$colors.button-filled-primary-bodyHover',
        },
      },
      secondary: {
        backgroundColor: '$colors.button-filled-secondary-bodyNormal',
        color: '$colors.button-filled-secondary-text',
      },
    },
    size: {
      default: {
        height: '$space.x900',
        paddingX: '$space.x400',
      },
      sm: {
        height: '$space.x800',
        paddingX: '$space.x300',
      },
    },
  },
  
  compoundVariants: [
    {
      variant: 'primary',
      size: 'default',
      css: {
        borderRadius: '$radii.x2',
      },
    },
  ],
  
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

export { Button }
export type ButtonProps = React.ComponentProps<typeof Button>
```

#### 3.3. Замена утилит

**Удалить:**
- `cn()` из `@/lib/utils` (или оставить для совместимости временно)
- `class-variance-authority` (заменить на Stitches variants)

**Использовать:**
- `styled()` для создания компонентов
- `css()` для создания стилей
- `getCssText()` для SSR

#### 3.4. Обработка условных стилей

**До:**
```typescript
className={cn(
  "base-classes",
  condition && "conditional-classes"
)}
```

**После:**
```typescript
const Component = styled('div', {
  baseStyles: { ... },
  variants: {
    condition: {
      true: { conditionalStyles: { ... } },
      false: {},
    },
  },
})
```

#### 3.5. Работа с motion (framer-motion)

**Если используется:**
```typescript
import { motion } from "motion/react"
import { styled } from "@/styles/stitches.config"

// Stitches компонент можно использовать с motion
const MotionButton = motion(Button)
```

---

## Фаза 4: Очистка

### Цель
Удалить все зависимости от Tailwind и старые токены.

### Задачи

#### 4.1. Удаление зависимостей
```bash
npm uninstall tailwindcss @tailwindcss/postcss tw-animate-css
npm uninstall tailwind-merge  # если больше не используется
npm uninstall class-variance-authority  # если больше не используется
```

#### 4.2. Удаление конфигурационных файлов
- `postcss.config.mjs` → обновить (убрать Tailwind плагин)
- `tailwind.config.*` → удалить (если есть)

#### 4.3. Обновление postcss.config.mjs
```javascript
const config = {
  plugins: [
    // Убрать "@tailwindcss/postcss"
    // Оставить только необходимые плагины
  ],
};

export default config;
```

#### 4.4. Удаление старых токенов
- `src/styles/tokens.css` → заменить на сгенерированный из Figma
- `src/styles/colors.css` → удалить (токены теперь в tokens.css)

#### 4.5. Обновление импортов
Найти и заменить все импорты:
- `@/lib/utils` → проверить использование `cn()`
- Удалить неиспользуемые импорты

#### 4.6. Финальная проверка
1. Запустить `npm run build`
2. Проверить отсутствие ошибок
3. Проверить визуально все компоненты
4. Проверить переключение режимов

---

## Временная шкала

### Фаза 1: Генератор токенов (2-3 дня)
- День 1: Парсинг и структура данных
- День 2: Разрешение зависимостей
- День 3: Генерация CSS и TypeScript

### Фаза 2: Настройка Stitches (1 день)
- Настройка конфигурации
- Интеграция с Next.js
- Утилиты для режимов

### Фаза 3: Миграция компонентов (5-7 дней)
- День 1-2: Базовые компоненты (Text, Button, Input, Label)
- День 3-4: Средние компоненты
- День 5-6: Сложные компоненты
- День 7: Специальные компоненты и финальная проверка

### Фаза 4: Очистка (0.5 дня)
- Удаление зависимостей
- Обновление конфигураций
- Финальная проверка

**Итого: 8.5-11.5 дней**

---

## Риски и митигация

### Риск 1: Сложность разрешения зависимостей
**Митигация:** Начать с простых случаев, постепенно усложнять. Добавить валидацию и тесты.

### Риск 2: Производительность генерации токенов
**Митигация:** Использовать кэширование, оптимизировать алгоритмы. Генерация выполняется редко.

### Риск 3: Несовместимость стилей после миграции
**Митигация:** Визуальное сравнение до/после. Постепенная миграция компонентов.

### Риск 4: Проблемы с SSR в Next.js
**Митигация:** Использовать `getCssText()` правильно. Тестировать SSR режим.

---

## Критерии успеха

1. ✅ Все токены из Figma доступны как CSS переменные
2. ✅ Режимы работают через `data-*` атрибуты
3. ✅ Все компоненты переписаны на Stitches
4. ✅ Нет зависимостей от Tailwind
5. ✅ TypeScript типы для всех токенов
6. ✅ Визуально компоненты идентичны (или улучшены)
7. ✅ Переключение режимов работает программно

---

## Дополнительные улучшения (опционально)

1. **Storybook интеграция** - показать компоненты в разных режимах
2. **Визуальные тесты** - сравнение скриншотов до/после
3. **Документация токенов** - автоматическая генерация документации
4. **Валидация токенов** - проверка соответствия Figma при сборке

