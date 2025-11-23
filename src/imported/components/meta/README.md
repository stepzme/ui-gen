# Meta Components Structure

## Overview
Мета компоненты - это базовые переиспользуемые компоненты дизайн-системы, которые используются в нескольких UI компонентах.

## Location
Все мета компоненты находятся в `src/components/meta/`

## Structure
Каждый мета компонент имеет следующую структуру:
```
meta/
  component-name/
    component-name.tsx  # Основной компонент
    index.ts            # Экспорты
```

## List of Meta Components

### Переиспользуемые компоненты (остаются в meta)
- **Typography** - используется напрямую как замена `Text` компонента
- **Container** - используется в `Avatar`, `Bubble` и других компонентах
- **Loader** - используется в `Button` и других компонентах

## Правила создания Meta компонентов

Meta компонент создается **только если**:
1. Он используется в **3+ местах** в UI компонентах
2. Исключение: `Typography` - используется напрямую как замена `Text`

Если компонент используется только в 1-2 местах → стили переносятся в UI компонент.

## Принципы

1. **Meta компоненты определяют:**
   - Layout структуру (flexbox, gap, padding)
   - Typography (fontSize, lineHeight)
   - Базовые HTML стили (border: none, outline: none)

2. **UI компоненты добавляют:**
   - Цвета (background, border, text colors)
   - Font weights (regular, medium)
   - Состояния (hover, focus, disabled, warning)
   - Позиционирование (absolute, relative)
   - Transitions и animations
