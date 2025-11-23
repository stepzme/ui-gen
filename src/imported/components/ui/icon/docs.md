# Icon Component
**Category:** Базовые

Icon — это универсальный компонент для отображения иконок в дизайн-системе. Поддерживает различные размеры, семантические цвета и опциональный контейнер с фоном. Все иконки хранятся внутри дизайн-системы и не зависят от внешних библиотек.

## Features

- **Multiple variants**: Поддержка различных иконок через проп variant
- **Size options**: Small (16px), medium (24px), large (32px)
- **Semantic colors**: Default, accent, success, warning, info, critical
- **Container support**: Опциональный контейнер с фоном и скруглением
- **Consistent styling**: Единый стиль иконок по всей дизайн-системе

## Usage

```tsx
import { Icon } from "@/components/icon"

// Basic icon
<Icon variant="settings" />

// With size
<Icon variant="settings" size="lg" />

// With semantic color
<Icon variant="settings" semantic="accent" />

// With container
<Icon variant="settings" container={true} semantic="accent" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | **required** | Имя иконки (например, "settings", "plus", "trash") |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Размер иконки |
| `semantic` | `'default' \| 'accent' \| 'success' \| 'warning' \| 'info' \| 'critical'` | `'default'` | Семантический цвет иконки |
| `container` | `boolean` | `false` | Показывать иконку в контейнере с фоном |

## Sizes

### Small
```tsx
<Icon variant="settings" size="sm" />
```
Размер: 16px (size-4)

### Medium (Default)
```tsx
<Icon variant="settings" size="md" />
```
Размер: 24px (size-6)

### Large
```tsx
<Icon variant="settings" size="lg" />
```
Размер: 32px (size-8)

## Semantic Colors

### Default
```tsx
<Icon variant="settings" semantic="default" />
```
Цвет: `text-foreground-primary`

### Accent
```tsx
<Icon variant="settings" semantic="accent" />
```
Цвет: `text-foreground-brand`

### Success
```tsx
<Icon variant="settings" semantic="success" />
```
Цвет: `text-foreground-success`

### Warning
```tsx
<Icon variant="settings" semantic="warning" />
```
Цвет: `text-foreground-warning`

### Info
```tsx
<Icon variant="settings" semantic="info" />
```
Цвет: `text-foreground-info`

### Critical
```tsx
<Icon variant="settings" semantic="critical" />
```
Цвет: `text-foreground-critical`

## Container

Иконка может быть отображена в контейнере с фоном и скруглением.

### Without Container (Default)
```tsx
<Icon variant="settings" container={false} />
```
Размер автоматический по размеру иконки.

### With Container
```tsx
<Icon variant="settings" container={true} semantic="accent" />
```
Контейнер: `w-10 h-10`, `rounded-md`, фон зависит от `semantic`.

## Examples

### Basic Usage
```tsx
<Icon variant="settings" />
```

### Different Sizes
```tsx
<div className="flex items-center gap-4">
  <Icon variant="settings" size="sm" />
  <Icon variant="settings" size="md" />
  <Icon variant="settings" size="lg" />
</div>
```

### With Semantic Colors
```tsx
<div className="flex items-center gap-4">
  <Icon variant="check" semantic="success" />
  <Icon variant="alert" semantic="warning" />
  <Icon variant="info" semantic="info" />
  <Icon variant="trash" semantic="critical" />
</div>
```

### With Container
```tsx
<div className="flex items-center gap-4">
  <Icon variant="settings" container={true} semantic="default" />
  <Icon variant="settings" container={true} semantic="accent" />
  <Icon variant="settings" container={true} semantic="success" />
</div>
```

### Size Variations with Container
```tsx
<div className="flex items-center gap-4">
  <Icon variant="settings" size="sm" container={true} semantic="accent" />
  <Icon variant="settings" size="md" container={true} semantic="accent" />
  <Icon variant="settings" size="lg" container={true} semantic="accent" />
</div>
```

## Implementation Details

- Все иконки хранятся в `src/components/icon/icons/`
- Иконки регистрируются через функцию `registerIcon()`
- Цвет иконки наследуется через `currentColor` от родительского элемента
- При использовании контейнера цвет иконки также зависит от `semantic`

## Best Practices

1. Используйте семантические цвета для передачи смысла иконки
2. Используйте контейнер для визуального выделения иконки
3. Выбирайте размер в зависимости от контекста использования
4. Для иконок-кнопок используйте компонент `ButtonIcon`
5. Всегда используйте понятные имена иконок (variant)


