# ButtonIcon Component
**Category:** Базовые

`ButtonIcon` — компактная кнопка, показывающая только иконку. Используется для действий в панелях инструментов, навигации и заголовках, где важно экономить пространство и при этом сохранить понятную визуальную метку действия.

## Особенности

- Поддерживает размеры из типографической сетки (`bodyS`, `bodyM`, `bodyL`).
- Позволяет включать дополнительные внутренние отступы (`withPadding`).
- Имеет состояния `isActive` и `disabled`.
- Работает с любыми children: можно передать иконку из реестра или собственный SVG/emoji.
- Цвета и состояния завязаны на дизайн-токены (`semantic-icon-primary`, `semantic-primary-60`, `semantic-primary-70`, `semantic-neutral-40`).
- Полностью доступна: обязательно задавайте `aria-label`, если у кнопки нет видимого текста.

## Использование

```tsx
import { ButtonIcon } from "@/components/ui/buttonIcon"
import { Icon } from "@/components/ui/icon"

// Вариант через проп `icon`
<ButtonIcon icon="settings" aria-label="Настройки" />

// Вариант с произвольным контентом
<ButtonIcon aria-label="Закрыть">
  <Icon variant="close" />
</ButtonIcon>

// С дополнительными паддингами и активным состоянием
<ButtonIcon 
  icon="star"
  withPadding
  isActive
  aria-label="Избранное"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `string` | – | Имя иконки из реестра (`Icon`), если не используется `children`. |
| `children` | `React.ReactNode` | – | Произвольный контент кнопки (обычно `<Icon />`). Имеет приоритет над `icon`. |
| `typography` | `'bodyS' \| 'bodyM' \| 'bodyL'` | `'bodyM'` | Управляет размерами кнопки. |
| `withPadding` | `boolean` | `false` | Добавляет внутренние отступы вокруг иконки. |
| `isActive` | `boolean` | `false` | Активное состояние — окрашивает иконку в `semantic-primary-primary`. |
| `disabled` | `boolean` | `false` | Отключает кнопку и блокирует ховеры/клики. |
| `data-test-id` | `string` | `"ButtonIcon"` | ID для автотестов. |
| `aria-label` | `string` | – | Обязательная метка для скрин-ридеров. |
| `typography`, `withPadding` и остальные HTML-пропы кнопки | – | – | Проксируются в базовый `button`. |

## Примеры

### Базовая кнопка
```tsx
<ButtonIcon icon="settings" aria-label="Настройки" />
```

### С произвольным содержимым
```tsx
<ButtonIcon aria-label="Добавить">
  <span aria-hidden="true">＋</span>
</ButtonIcon>
```

### Размеры
```tsx
<ButtonIcon icon="menu" typography="bodyS" aria-label="Меню" />
<ButtonIcon icon="menu" typography="bodyM" aria-label="Меню" />
<ButtonIcon icon="menu" typography="bodyL" aria-label="Меню" />
```

### Состояния
```tsx
<ButtonIcon icon="star" isActive aria-label="Избранное" />
<ButtonIcon icon="trash" disabled aria-label="Удалить" />
```

### С паддингами
```tsx
<ButtonIcon icon="share" withPadding aria-label="Поделиться" />
```

## Доступность

- Всегда задавайте `aria-label`, если у кнопки нет текстового контента.
- `disabled` автоматически добавляет `aria-disabled` и блокирует клики.
- Фокус виден благодаря outline с токеном `color-scheme-brand-primary`.

## Токены

Компонент использует следующие дизайн-токены:

- `--semantic-icon-primary`
- `--semantic-primary-60`
- `--semantic-primary-70`
- `--semantic-primary-primary`
- `--semantic-neutral-40`

## Связанные компоненты

- [`Button`](../button/docs.md) — текстовая кнопка.
- [`Icon`](../icon/docs.md) — реестр иконок, используемый внутри `ButtonIcon`.

