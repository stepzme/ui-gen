# Анализ и единая реализация компонента Button

## Анализ существующей реализации

### Текущая реализация (Tailwind + CVA)
**Файл:** `src/components/ui/button/button.tsx`

**Структура:**
- `variant`: `primary` | `secondary` | `tertiary` | `text`
- `semantic`: `default` | `accent` | `success` | `warning` | `info` | `critical`
- `size`: `default` | `sm` | `lg` | `icon` | `icon-sm` | `icon-lg`

**Используемые токены:**
- `button-filled-brand-bodyNormal`
- `button-filled-success-bodyNormal`
- и т.д.

**Особенности:**
- Использует `class-variance-authority` для вариантов
- Tailwind классы для стилей
- Framer Motion для анимаций
- Compound variants для комбинаций variant + semantic

---

## Анализ Figma дизайна

### Структура из Figma
**Фрейм:** `01. button - filled - text only` (node-id: 3:23347)

**Варианты:**
- `colorScheme`: `Brand`, `Success`, `Info`, `Warning`, `Critical`, `Neutral`, `Primary`, `Constant`
- `paddingSize`: `Medium`, `Small`, `Tiny`
- `extraPaddings`: `True` | `False`
- `fill/hug`: `True` (fill) | `False` (hug)
- `state`: `Normal`, `Loading`, `Hover`, `Click`

**Детали из Figma (node-id: 3:23349):**
- **Typography:** `bodyM/tight/medium`
  - Font: Omega UI Medium
  - Size: 16px
  - Weight: 500
  - Line Height: 20px
- **Spacing:**
  - Padding: `--spaces/gravitysystem/bodym/medium` (16px)
  - Gap: `--spaces/gravitysystem/bodym/medium` (16px)
- **Border Radius:** `--radii/gravitysystem/bodym/medium` (12px)
- **Colors:**
  - Background: `--components/button/filled/brand/bodynormal`
  - Text: `--colorscheme/brand/textprimary` (#ffffff)

---

## Анализ токенов из export.json

### Структура токенов
```json
{
  "button": {
    "filled": {
      "brand": {
        "bodyNormal": { "$value": "{semantic.brand.primary}" },
        "bodyHover": { "$value": "{semantic.brand.secondary}" },
        "bodyClick": { "$value": "{semantic.brand.tertiary}" }
      },
      "success": { ... },
      "info": { ... },
      "warning": { ... },
      "critical": { ... },
      "neutral": { ... },
      "primary": { ... },
      "constant": { ... },
      "text": { "$value": "{colorScheme.brand.textPrimary}" },
      "icon": { "$value": "{colorScheme.brand.iconPrimary}" }
    }
  }
}
```

### Генерируемые CSS переменные
- `--components-button-filled-brand-body-normal`
- `--components-button-filled-brand-body-hover`
- `--components-button-filled-brand-body-click`
- `--components-button-filled-text` (общий для всех colorScheme кроме primary/constant)
- `--components-button-filled-icon` (общий для всех colorScheme кроме primary/constant)

---

## Единая реализация на Stitches

### Структура компонента

**Файл:** `src/components/ui/button/button-stitches.tsx`

**Варианты:**
- `variant`: `filled` | `outlined` | `tonned` | `transparent`
- `colorScheme`: `brand` | `success` | `info` | `warning` | `critical` | `neutral` | `primary` | `constant`
- `paddingSize`: `medium` | `small` | `tiny`
- `extraPaddings`: `boolean`
- `fullWidth`: `boolean`

### Ключевые особенности реализации

1. **Использование токенов из Figma:**
   - Все цвета через `$colors$button-filled-{colorScheme}-body-{state}`
   - Spacing через gravity system: `$space$body-m-medium`
   - Typography через токены: `$fontSizes$bodyM`, `$lineHeights$body-m-tight`
   - Border radius через gravity system: `$radii$body-m-medium`

2. **Соответствие Figma дизайну:**
   - Typography: bodyM/tight/medium (16px, 500, 20px)
   - Padding: 16px для medium (gravity system)
   - Border radius: 12px для medium (gravity system)
   - Gap: 16px между элементами

3. **Compound Variants:**
   - Все комбинации `variant + colorScheme` для filled варианта
   - Комбинации `paddingSize + extraPaddings` для дополнительных отступов

4. **Состояния:**
   - `:hover` → `bodyHover`
   - `:active` → `bodyClick`
   - `:disabled` → opacity 0.5

### Маппинг старых вариантов на новые

| Старый API | Новый API |
|------------|-----------|
| `variant="primary"` | `variant="filled"` |
| `variant="secondary"` | `variant="tonned"` |
| `variant="tertiary"` | `variant="outlined"` |
| `variant="text"` | `variant="transparent"` |
| `semantic="accent"` | `colorScheme="brand"` |
| `semantic="default"` | `colorScheme="primary"` |
| `size="default"` | `paddingSize="medium"` |
| `size="sm"` | `paddingSize="small"` |
| `size="lg"` | `paddingSize="medium"` + `extraPaddings={true}` |

### Примеры использования

```tsx
import { Button } from '@/components/ui/button/button-stitches'

// Базовый filled кнопка (brand, medium)
<Button>Click me</Button>

// С colorScheme
<Button colorScheme="success">Success</Button>
<Button colorScheme="critical">Delete</Button>

// С paddingSize
<Button paddingSize="small">Small</Button>
<Button paddingSize="tiny">Tiny</Button>

// С extraPaddings
<Button extraPaddings>Extra Padding</Button>

// С fullWidth
<Button fullWidth>Full Width</Button>

// Комбинации
<Button 
  variant="filled" 
  colorScheme="brand" 
  paddingSize="medium"
  extraPaddings
  fullWidth
>
  Complete Example
</Button>
```

---

## Изменения в stitches.config.ts

### Добавленные токены

1. **Colors (button component tokens):**
   - `button-filled-{colorScheme}-body-{state}` для всех colorScheme
   - `button-filled-text` и `button-filled-icon` (общие)
   - `button-filled-primary-text` и `button-filled-primary-icon` (специфичные)
   - `button-filled-constant-text` и `button-filled-constant-icon` (специфичные)

2. **Space (gravity system):**
   - `body-m-medium`, `body-m-small`, `body-m-tiny`, `body-m-large`
   - `body-s-medium`, `body-s-small`, `body-s-tiny`

---

## Итоговая структура

### Преимущества единой реализации

1. **Соответствие Figma:**
   - Используются точные токены из Figma
   - Структура вариантов соответствует дизайну
   - Типографика и spacing из gravity system

2. **Типобезопасность:**
   - Все варианты типизированы через VariantProps
   - Автодополнение в IDE
   - Проверка на этапе компиляции

3. **Гибкость:**
   - Легко добавлять новые варианты
   - Compound variants для сложных комбинаций
   - Поддержка asChild для композиции

4. **Производительность:**
   - Stitches генерирует CSS на этапе сборки
   - Нет runtime overhead
   - Минимальный bundle size

### Следующие шаги

1. ✅ Реализован filled вариант
2. ⏳ Реализовать outlined, tonned, transparent варианты
3. ⏳ Добавить поддержку loading состояния
4. ⏳ Добавить поддержку иконок
5. ⏳ Мигрировать остальные компоненты

