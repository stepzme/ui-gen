import { ComponentDocsConfig } from './types'

export const componentDocsConfig: ComponentDocsConfig = {
  badge: {
    title: "Badge",
    description: "Компонент для отображения статуса, меток или категорий. Поддерживает семантические цвета, активные состояния и интерактивность.",
    category: "Базовые",
    
    props: [
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Содержимое badge",
        example: '"New Feature"'
      },
      {
        name: "semantic",
        type: "'default' | 'accent' | 'success' | 'warning' | 'info' | 'critical'",
        required: false,
        defaultValue: "default",
        description: "Семантический цвет badge",
        example: "semantic='success'"
      },
      {
        name: "active",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Активное состояние (яркие цвета) или неактивное (приглушенные)",
        example: "active={false}"
      },
      {
        name: "interactive",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Делает badge кликабельным с hover эффектами",
        example: "interactive={true}"
      },
      {
        name: "onActiveChange",
        type: "(active: boolean) => void",
        required: false,
        description: "Колбэк при изменении состояния active (только для interactive)",
        example: "onActiveChange={(active) => console.log(active)}"
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Дополнительные CSS классы",
        example: "className='custom-badge'"
      }
    ],
    
    examples: [
      {
        title: "Базовое использование",
        description: "Простые badges для отображения статуса",
        code: `<Badge semantic="success">Active</Badge>
<Badge semantic="warning">Pending</Badge>
<Badge semantic="critical">Error</Badge>`,
        language: "tsx"
      },
      {
        title: "Интерактивные badges",
        description: "Кликабельные badges с переключением состояния",
        code: `<Badge 
  semantic="accent" 
  interactive={true}
  onActiveChange={(active) => console.log(active)}
>
  Toggle Badge
</Badge>`,
        language: "tsx"
      },
      {
        title: "Неактивные состояния",
        description: "Приглушенные badges для менее важной информации",
        code: `<Badge semantic="success" active={false}>Completed</Badge>
<Badge semantic="info" active={false}>Info</Badge>`,
        language: "tsx"
      }
    ],
    
    variants: [
      {
        name: "Semantic Colors",
        description: "Семантические цвета для разных типов информации",
        usage: "Используйте semantic для передачи смысла: success для успеха, warning для предупреждений, critical для ошибок",
        example: "semantic='success' | 'warning' | 'critical'"
      },
      {
        name: "Active States",
        description: "Управление интенсивностью цвета",
        usage: "active={true} для важной информации, active={false} для второстепенной",
        example: "active={true} | active={false}"
      },
      {
        name: "Interactive Mode",
        description: "Кликабельные badges с hover эффектами",
        usage: "Используйте interactive={true} когда badge должен реагировать на клики",
        example: "interactive={true}"
      }
    ],
    
    accessibility: [
      {
        title: "Keyboard Navigation",
        description: "Интерактивные badges поддерживают навигацию с клавиатуры",
        implementation: "Используйте Enter или Space для активации интерактивных badges"
      },
      {
        title: "Screen Readers",
        description: "Badge автоматически получает role='button' при interactive={true}",
        implementation: "Добавьте aria-label для лучшего описания содержимого"
      },
      {
        title: "Focus Management",
        description: "Интерактивные badges получают tabIndex={0} для фокуса",
        implementation: "Убедитесь что focus видим для пользователей"
      }
    ],
    
    bestPractices: [
      {
        title: "Использование семантических цветов",
        description: "Правильное использование цветов для передачи смысла",
        do: [
          "Используйте success для положительных состояний",
          "Используйте warning для предупреждений",
          "Используйте critical для ошибок",
          "Используйте accent для выделения важной информации"
        ],
        dont: [
          "Не используйте critical для обычной информации",
          "Не смешивайте семантические цвета без смысла",
          "Не используйте слишком много разных цветов одновременно"
        ]
      },
      {
        title: "Интерактивность",
        description: "Когда и как использовать интерактивные badges",
        do: [
          "Используйте interactive для фильтров и переключателей",
          "Добавляйте onActiveChange для отслеживания состояния",
          "Обеспечивайте визуальную обратную связь"
        ],
        dont: [
          "Не делайте интерактивными badges с важной информацией",
          "Не используйте interactive без обработки кликов",
          "Не забывайте про accessibility"
        ]
      }
    ],
    
    relatedComponents: ["Button", "Chip", "Tag"],
    designTokens: ["background-brand", "background-success", "background-warning", "background-critical"],
    notes: ["Badge компонент оптимизирован для отображения краткой информации и статусов. Для более сложного контента рассмотрите использование других компонентов."]
  }
}
