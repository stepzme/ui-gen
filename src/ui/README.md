# Internal UI Components

Эта папка содержит компоненты для **внутреннего использования в приложении** (Internal UI).

## Архитектура

### Internal UI (`src/ui/`)
- **Технологии**: Tailwind CSS + shadcn/ui + lucide-react
- **Назначение**: Компоненты для стилизации самого приложения (sidebar, навигация, оболочка)
- **Не используются** в конструкторе компонентов
- **НЕ импортируют** Stitches (`@/styles/stitches.config`)
- **НЕ импортируют** компоненты из `@/components/ui/` (Imported UI)

### Imported UI (`src/components/ui/`)
- **Технологии**: Stitches
- **Назначение**: Компоненты для конструктора (экспортируются в готовые экраны)
- **Используются** в конструкторе компонентов

## Разделение

- ✅ Internal UI использует Tailwind классы напрямую
- ✅ Internal UI использует стандартные Tailwind цвета (независимо от Imported UI)
- ✅ Internal UI компоненты построены на shadcn/ui (Radix UI)
- ✅ Internal UI использует иконки из `lucide-react`
- ✅ Internal UI ПОЛНОСТЬЮ НЕЗАВИСИМ от Imported UI стилей
- ❌ Internal UI НЕ использует Stitches
- ❌ Internal UI НЕ использует компоненты из `@/components/ui/`
- ❌ Internal UI НЕ использует иконки из `@/components/ui/icon`
- ❌ Internal UI компоненты НЕ экспортируются в конструктор

## Компоненты

- `sidebar.tsx` - Боковая панель приложения
- `components/select.tsx` - Select компонент (shadcn)
- `components/button.tsx` - Button компонент (shadcn)
- `components/avatar.tsx` - Avatar компонент (shadcn)
- `components/dialog.tsx` - Dialog компонент (shadcn)
- `components/input.tsx` - Input компонент
- `components/label.tsx` - Label компонент (shadcn)

## Использование

```tsx
import { Sidebar } from "@/ui/sidebar";
import { Button, Select, Dialog, Input } from "@/ui";
import { Clock, Folder, Sun, Moon } from "lucide-react";
```

