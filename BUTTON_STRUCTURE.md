# Структура компонента Button на Stitches

## Анализ примеров

### Из storybook-basic.ts:
- **Button.Container** - базовый компонент для layout, typography, spacing
- Варианты: `typography` (bodyS/bodyM/bodyL), `paddingSize` (medium/small/tiny), `extraPadding`, `fullWidth`, `rounded`
- Использует `i.sizes.x3`, `i.radii.x2`, `d.bodyS_tight_medium` (типографика из отдельного объекта)

### Из example.ts:
- **Button** - расширяет `Button.Container` через `styled(B.Container, {...})`
- Добавляет варианты: `variant` (filled/outlined/tonned/transparent), `colorScheme` (brand/success/info/warning/critical/draft/constant/primary)
- Использует `o.colors.button_filled_brand_bodyNormal` (с подчеркиваниями в примере, но в нашем случае дефисы)
- Обработка disabled через `$disabled` variant
- Использует `@media (hover: hover)` для hover состояний
- React компонент оборачивает styled компонент и добавляет логику (isLoading, Loader, etc.)

## Правильная структура компонента

### 1. Button.Container (базовый компонент)
**Ответственность:** Layout, typography, spacing, padding
**Варианты:**
- `typography`: `bodyS` | `bodyM` | `bodyL`
- `paddingSize`: `medium` | `small` | `tiny`
- `extraPadding`: `boolean`
- `fullWidth`: `adaptive` | `enable` | `disable`
- `rounded`: `boolean`

### 2. Button (расширяет Container)
**Ответственность:** Colors, variants, states
**Варианты:**
- `variant`: `filled` | `outlined` | `tonned` | `transparent`
- `colorScheme`: `brand` | `success` | `info` | `warning` | `critical` | `draft` | `constant` | `primary`
- `isLoading`: `boolean`
- `$disabled`: `boolean` (специальный префикс для Stitches)

### 3. React компонент
**Ответственность:** Логика, обработка событий, интеграция с другими компонентами

## Синтаксис доступа к токенам в Stitches

В Stitches для токенов с дефисами в ключах используется синтаксис с квадратными скобками:

```typescript
// Правильно:
'$colors["button-filled-brand-body-normal"]'
// или
"$colors['button-filled-brand-body-normal']"

// Неправильно:
'$colors.button-filled-brand-body-normal' // не работает для ключей с дефисами
```

## Необходимые токены в stitches.config

Нужно добавить:
- `transparent-primary`
- `neutral-32`, `neutral-40`
- `constant-32`, `constant-40`, `constant-70`
- `primary-70`
- Все токены для `outlined`, `tonned`, `transparent` вариантов
- `button-outlined-body`
- `button-transparent-body-normal`

## Следующие шаги

1. Добавить недостающие токены в `stitches.config.ts`
2. Исправить синтаксис доступа к токенам в `button.tsx`
3. Добавить все варианты (outlined, tonned, transparent) с их compoundVariants
4. Добавить все disabled состояния
5. Протестировать компонент

