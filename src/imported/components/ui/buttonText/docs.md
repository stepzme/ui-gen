# ButtonText Component
**Category:** Базовые

`ButtonText` — текстовая кнопка без фоновой заливки. Используется для вторичных действий, ссылок-псевдокнопок и интерактивных элементов в таблицах или карточках.

## Особенности

- Сохраняет типографику и размеры (`bodyS`, `bodyM`, `bodyL`).
- Поддерживает восемь цветовых схем на основе дизайн-токенов.
- Имеет состояния `hover`, `active`, `disabled` с тонкими переходами цвета и иконок.
- Работает с любым содержимым: текст, иконки, комбинированные элементы.
- Фокусная рамка соответствует требованиям доступности (`outline` на токене `color-scheme-brand-primary`).

## Использование

```tsx
import { ButtonText } from "@/components/ui/buttonText"

<ButtonText>Подробнее</ButtonText>

<ButtonText colorScheme="success">Сохранить</ButtonText>

<ButtonText colorScheme="critical" disabled>
  Удалить
</ButtonText>

<ButtonText colorScheme="brand" typography="bodyL">
  Подробнее
</ButtonText>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | – | Контент кнопки. |
| `colorScheme` | `'brand' \| 'success' \| 'info' \| 'warning' \| 'critical' \| 'draft' \| 'constant' \| 'primary'` | `'brand'` | Цветовая схема текста/иконок. |
| `typography` | `'bodyS' \| 'bodyM' \| 'bodyL'` | `'bodyM'` | Размер кнопки по типографической сетке. |
| `fullWidth` | `boolean` | `false` | Растягивает кнопку на всю доступную ширину. |
| `disabled` | `boolean` | `false` | Переводит кнопку в неактивное состояние, блокирует клики. |
| `data-test-id` | `string` | `'ButtonText'` | ID для автотестов. |
| `css` | `CSS` | – | Кастомные стили через Stitches. |
| Остальные `button`-пропы | – | – | Проксируются в базовый элемент. |

## Доступность

- Для кнопок, которые визуально выглядят как ссылки, сохраняйте семантику `<button>` и управляйте поведением через `onClick`.
- `disabled` автоматически добавляет `aria-disabled` и убирает обработчик клика.
- Фокус чётко виден благодаря outline на токене бренда.

## Токены

Компонент использует следующие токены из `tokens.css`:

- `--components-button-text-*-text-normal` / `hover` / `click`
- `--components-button-text-*-icon-normal` / `hover` / `click`
- `--semantic-neutral-40`
- `--semantic-constant-40`
- `--color-scheme-brand-primary`

## Связанные компоненты

- [`Button`](../button/docs.md) — основная кнопка с заливкой/outlined/tonned.
- [`ButtonIcon`](../buttonIcon/docs.md) — кнопка с иконкой.
