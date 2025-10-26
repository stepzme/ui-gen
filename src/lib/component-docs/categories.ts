import { 
  Circle, 
  Edit, 
  Layout, 
  MessageCircle, 
  Navigation, 
  Layers, 
  Database, 
  Image 
} from "lucide-react";

export interface CategoryConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;        // для Cell в components-panel
  badgeColor: string;  // для Badge в документации
}

export const categories: Record<string, CategoryConfig> = {
  'Базовые': {
    id: 'basic',
    name: 'Базовые',
    description: 'Основные компоненты интерфейса',
    icon: Circle,
    color: 'success',
    badgeColor: 'success'
  },
  'Формы': {
    id: 'form',
    name: 'Формы',
    description: 'Компоненты для ввода данных',
    icon: Edit,
    color: 'primary', 
    badgeColor: 'accent'
  },
  'Макет': {
    id: 'layout',
    name: 'Макет',
    description: 'Компоненты для структурирования контента',
    icon: Layout,
    color: 'info',
    badgeColor: 'info'
  },
  'Обратная связь': {
    id: 'feedback',
    name: 'Обратная связь',
    description: 'Компоненты для отображения состояний',
    icon: MessageCircle,
    color: 'warning',
    badgeColor: 'warning'
  },
  'Навигация': {
    id: 'navigation',
    name: 'Навигация',
    description: 'Компоненты для навигации по интерфейсу',
    icon: Navigation,
    color: 'accent',
    badgeColor: 'accent'
  },
  'Наложения': {
    id: 'overlay',
    name: 'Наложения',
    description: 'Компоненты для отображения поверх контента',
    icon: Layers,
    color: 'primary',
    badgeColor: 'default'
  },
  'Данные': {
    id: 'data',
    name: 'Данные',
    description: 'Компоненты для отображения данных',
    icon: Database,
    color: 'critical',
    badgeColor: 'critical'
  },
  'Медиа': {
    id: 'media',
    name: 'Медиа',
    description: 'Компоненты для работы с медиа-контентом',
    icon: Image,
    color: 'primary',
    badgeColor: 'default'
  }
};

// Функции для получения конфигурации категории
export const getCategoryIcon = (category: string) => {
  return categories[category]?.icon || Circle;
};

export const getCategoryColor = (category: string): "default" | "muted" | "primary" | "secondary" | "destructive" | "accent" | "success" | "warning" | "info" => {
  const color = categories[category]?.color || 'primary';
  // Map invalid colors to valid ones
  const colorMap: Record<string, "default" | "muted" | "primary" | "secondary" | "destructive" | "accent" | "success" | "warning" | "info"> = {
    'critical': 'destructive',
    'primary': 'primary',
    'success': 'success',
    'info': 'info',
    'warning': 'warning',
    'accent': 'accent',
    'default': 'default',
    'muted': 'muted',
    'secondary': 'secondary',
    'destructive': 'destructive'
  };
  return colorMap[color] || 'primary';
};

export const getCategoryBadgeColor = (category: string): "success" | "accent" | "info" | "warning" | "default" | "critical" => {
  const badgeColor = categories[category]?.badgeColor;
  return (badgeColor as "success" | "accent" | "info" | "warning" | "default" | "critical") || 'default';
};

// Список всех категорий для UI
export const categoryList = Object.keys(categories);

// Хук для использования в компонентах
export function useComponentCategories() {
  return {
    categories: Object.values(categories),
    loading: false,
    error: null
  };
}
