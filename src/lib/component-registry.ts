import React from 'react';
import { ComponentDefinition } from '@/types/page-builder';

// Импортируем компоненты
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Badge } from '@/components/badge';
import { Text } from '@/components/text';
import { Avatar } from '@/components/avatar';
import { Cell } from '@/components/cell';
import { Collapsible } from '@/components/collapsible';
import { Dialog } from '@/components/dialog';
import { DropdownMenu } from '@/components/dropdown-menu';
import { Image } from '@/components/image';
import { Label } from '@/components/label';
import { Select } from '@/components/select';
import { Separator } from '@/components/separator';
import { Sheet } from '@/components/sheet';
import { Skeleton } from '@/components/skeleton';
import { Switch } from '@/components/switch';
import { Textarea } from '@/components/textarea';
import { Tooltip } from '@/components/tooltip';
import { ButtonIcon } from '@/components/buttonIcon';

// Реестр компонентов на клиенте
const componentRegistry: Record<string, React.ComponentType<any>> = {
  button: Button,
  buttonIcon: ButtonIcon,
  input: Input,
  badge: Badge,
  text: Text,
  avatar: Avatar,
  cell: Cell,
  collapsible: Collapsible,
  dialog: Dialog,
  'dropdown-menu': DropdownMenu,
  image: Image,
  label: Label,
  select: Select,
  separator: Separator,
  sheet: Sheet,
  skeleton: Skeleton,
  switch: Switch,
  textarea: Textarea,
  tooltip: Tooltip,
};

/**
 * Получает React компонент по его ID
 */
export function getComponentById(id: string): React.ComponentType<any> | null {
  return componentRegistry[id] || null;
}

/**
 * Получает все доступные компоненты с их метаданными
 * Использует данные из API для получения правильных категорий из docs.md
 */
export function getAllComponents(componentMetadata?: Array<{id: string, name: string, category: string}>): ComponentDefinition[] {
  return Object.entries(componentRegistry).map(([id, component]) => {
    // Находим метаданные для этого компонента
    const metadata = componentMetadata?.find(meta => meta.id === id);
    
    return {
      id,
      name: metadata?.name || id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' '),
      category: metadata?.category || getFallbackCategoryById(id),
      component,
      defaultProps: getDefaultPropsById(id)
    };
  });
}

/**
 * Fallback категория для компонента (используется если API недоступен)
 */
function getFallbackCategoryById(id: string): string {
  // Простой fallback - если API недоступен, используем "Базовые" для всех компонентов
  return 'Базовые';
}

/**
 * Получает дефолтные пропсы для компонента
 */
function getDefaultPropsById(id: string): Record<string, any> {
  const defaultPropsMap: Record<string, Record<string, any>> = {
    button: {
      children: 'Button',
      variant: 'primary',
      semantic: 'default',
      size: 'default'
    },
    buttonIcon: {
      icon: 'placeholder',
      variant: 'primary',
      semantic: 'default'
    },
    input: {
      placeholder: 'Enter text...',
      type: 'text'
    },
    textarea: {
      placeholder: 'Enter text...',
      rows: 3
    },
    text: {
      children: 'Text',
      size: 'body',
      weight: 'normal',
      textColor: 'default'
    },
    badge: {
      children: 'Badge',
      semantic: 'default',
      active: true,
      interactive: false
    },
    avatar: {
      src: '',
      alt: 'Avatar'
    },
    label: {
      children: 'Label'
    },
    separator: {},
    skeleton: {
      width: '100%',
      height: '20px'
    },
    switch: {
      checked: false
    },
    tooltip: {
      children: 'Tooltip content'
    },
    'dropdown-menu': {},
    dialog: {},
    collapsible: {},
    sheet: {},
    cell: {},
    image: {
      src: '',
      alt: 'Image',
      objectFit: 'cover',
      aspectRatio: 'auto',
      radius: 'md',
      loading: 'lazy',
      placeholder: 'empty',
      showControls: false
    }
  };
  
  return defaultPropsMap[id] || {};
}