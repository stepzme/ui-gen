# ButtonIcon Component
**Category:** Базовые

Кнопка-иконка — это специализированный вариант кнопки, который отображает только иконку без текста. Используется для компактных интерфейсов, где важна экономия места, и когда иконка сама по себе является достаточным индикатором действия. Компонент идеально подходит для панелей инструментов, навигационных элементов и компактных интерфейсов.

## Features

- **Icon-only design**: Отображает только иконку, без текста
- **Custom icon library**: Использует иконки из встроенной библиотеки дизайн-системы
- **Multiple variants**: Primary, secondary, tertiary, and text buttons
- **Semantic colors**: Default, accent, success, warning, info, critical
- **Fixed size**: Стандартный размер 36px × 36px
- **Animations**: Smooth tap animations with Framer Motion
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage

```tsx
import { ButtonIcon } from "@/components/buttonIcon"

// Basic icon button
<ButtonIcon icon="settings" aria-label="Settings" />

// Semantic icon button
<ButtonIcon 
  variant="primary" 
  semantic="success"
  icon="check"
  aria-label="Confirm"
/>

```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | **required** | Имя иконки из библиотеки дизайн-системы (например, "settings", "heart", "trash") |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'text'` | `'primary'` | Вариант стиля кнопки |
| `semantic` | `'default' \| 'accent' \| 'success' \| 'warning' \| 'info' \| 'critical'` | `'default'` | Семантический цвет |
| `asChild` | `boolean` | `false` | Рендерить как дочерний компонент |
| `className` | `string` | - | Дополнительные CSS классы |
| `disabled` | `boolean` | `false` | Отключить кнопку |

**Примечание**: Проп `icon` принимает строку с именем иконки из библиотеки дизайн-системы. Все доступные иконки можно выбрать через компонент `SelectIcon` в панели свойств или посмотреть в `src/components/icon/icons/index.ts`.

## Variants

### Primary
High emphasis icon buttons for primary actions.

```tsx
<ButtonIcon 
  variant="primary" 
  icon="save"
  aria-label="Save"
/>
```

### Secondary
Medium emphasis icon buttons for secondary actions.

```tsx
<ButtonIcon 
  variant="secondary" 
  icon="pencil"
  aria-label="Edit"
/>
```

### Tertiary
Low emphasis icon buttons with outline style.

```tsx
<ButtonIcon 
  variant="tertiary" 
  icon="share"
  aria-label="Share"
/>
```

### Text
Minimal icon buttons for subtle actions.

```tsx
<ButtonIcon 
  variant="text" 
  icon="more"
  aria-label="More options"
/>
```

## Semantic Colors

### Default
```tsx
<ButtonIcon semantic="default" icon="home" aria-label="Home" />
```

### Accent
```tsx
<ButtonIcon semantic="accent" icon="heart" aria-label="Favorite" />
```

### Success
```tsx
<ButtonIcon semantic="success" icon="check" aria-label="Confirm" />
```

### Warning
```tsx
<ButtonIcon semantic="warning" icon="alert" aria-label="Warning" />
```

### Info
```tsx
<ButtonIcon semantic="info" icon="info" aria-label="Information" />
```

### Critical
```tsx
<ButtonIcon semantic="critical" icon="trash" aria-label="Delete" />
```

## Examples

### Basic Icon Buttons
```tsx
import { ButtonIcon } from "@/components/buttonIcon"

<ButtonIcon icon="settings" aria-label="Settings" />
<ButtonIcon icon="heart" aria-label="Like" />
<ButtonIcon icon="share" aria-label="Share" />
```

### Toolbar Example
```tsx
<div className="flex gap-2">
  <ButtonIcon 
    variant="secondary" 
    icon="pencil"
    aria-label="Edit"
  />
  <ButtonIcon 
    variant="secondary" 
    icon="copy"
    aria-label="Copy"
  />
  <ButtonIcon 
    variant="secondary" 
    semantic="critical"
    icon="trash"
    aria-label="Delete"
  />
</div>
```

### With Different Variants and Semantics
```tsx
<div className="flex gap-2">
  <ButtonIcon variant="primary" semantic="success" icon="check" aria-label="Save" />
  <ButtonIcon variant="secondary" semantic="accent" icon="star" aria-label="Favorite" />
  <ButtonIcon variant="tertiary" semantic="warning" icon="alert" aria-label="Warning" />
  <ButtonIcon variant="text" semantic="critical" icon="trash" aria-label="Delete" />
</div>
```

### As Child Component
```tsx
<ButtonIcon asChild>
  <Link href="/settings">
    <Icon variant="settings" />
  </Link>
</ButtonIcon>
```

**Примечание**: При использовании `asChild` нужно передать компонент `Icon` внутрь, а не строку.

## Accessibility

- **Always provide `aria-label`**: Icon buttons must have descriptive labels for screen readers
- Full keyboard navigation support
- Proper focus management
- Screen reader compatibility
- Color contrast compliance

**Important**: Всегда добавляйте `aria-label` к иконкам-кнопкам, так как они не содержат видимого текста.

```tsx
<ButtonIcon 
  icon="settings"
  aria-label="Open settings"
/>
```

## Animations

Кнопка-иконка включает плавные анимации через Framer Motion:

- **Tap**: Анимация нажатия с масштабированием до 75% для тактильной обратной связи
- **Transitions**: Плавные переходы цветов и состояний

## Styling

The button icon uses CSS custom properties for theming:

- `--background-*` for background colors
- `--foreground-*` for icon colors
- `--border-*` for border colors
- `--ring-*` for focus states

## Best Practices

1. Всегда используйте `aria-label` для иконок-кнопок
2. Используйте семантические цвета для передачи смысла
3. Используйте primary для основных действий
4. Используйте secondary для вторичных действий
5. Используйте tertiary для менее важных действий
6. Используйте text для минималистичных интерфейсов
7. Обеспечьте достаточный цветовой контраст
8. Тестируйте с клавиатурной навигацией
9. Группируйте связанные иконки-кнопки вместе
10. Используйте понятные и узнаваемые иконки

## Разница с компонентом Button

- `ButtonIcon` всегда отображает только иконку без текста
- `ButtonIcon` принимает иконку через обязательный проп `icon` как строку (имя иконки)
- `ButtonIcon` не поддерживает `label` или `children` для текста
- `ButtonIcon` имеет фиксированный размер 36px × 36px (не поддерживает изменение размера)
- `Button` использует иконки из `lucide-react` как React компоненты, `ButtonIcon` использует кастомные иконки из дизайн-системы

## Доступные иконки

Все доступные иконки находятся в библиотеке дизайн-системы. Для выбора иконки используйте компонент `SelectIcon` в панели свойств конструктора или проверьте список в `src/components/icon/icons/index.ts`.

Примеры популярных иконок:
- `settings`, `gear` - настройки
- `heart` - избранное
- `trash`, `trashbox` - удаление
- `check` - подтверждение
- `plus` - добавление
- `pencil`, `pen` - редактирование
- `share` - поделиться
- `chevron_left`, `chevron_right`, `chevron_down`, `chevron_top` - стрелки
- И многие другие...

Полный список всех доступных иконок можно найти в массиве `iconNames` в файле `src/components/icon/icons/index.ts`.

