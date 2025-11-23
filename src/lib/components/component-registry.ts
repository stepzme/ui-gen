import React from 'react';
import { ComponentDefinition } from '@/types/page-builder';

// Импортируем компоненты
import { Button } from '@/imported/components/ui/button';
import { Badge } from '@/imported/components/ui/badge';
import { Typography } from '@/imported/components/meta/typography';
import { Avatar } from '@/imported/components/ui/avatar';
import { ButtonIcon } from '@/imported/components/ui/buttonIcon';
import { Input } from '@/imported/components/ui/input';
import { Checkbox } from '@/imported/components/ui/checkbox';
import { Radio } from '@/imported/components/ui/radio';
import { Switch } from '@/imported/components/ui/switch';
import { Textarea } from '@/imported/components/ui/textarea';
import { Link } from '@/imported/components/ui/link';
import { Select } from '@/imported/components/ui/select';
import { Progress } from '@/imported/components/ui/progress';
import { Chip } from '@/imported/components/ui/chip';
import { Divider } from '@/imported/components/ui/divider';
import { Skeleton } from '@/imported/components/ui/skeleton';
import { Dropdown } from '@/imported/components/ui/dropdown';
import { Card } from '@/imported/components/ui/card';
import { Counter } from '@/imported/components/ui/counter';
import { Status } from '@/imported/components/ui/status';
import { Slider } from '@/imported/components/ui/slider';
import { Pagination } from '@/imported/components/ui/pagination';
import { RadioGroup } from '@/imported/components/ui/radioGroup';
import { CheckboxGroup } from '@/imported/components/ui/checkboxGroup';
import { SwitchGroup } from '@/imported/components/ui/switchGroup';
import { Breadcrumbs } from '@/imported/components/ui/breadcrumbs';
import { TabBar } from '@/imported/components/ui/tabBar';
import { List } from '@/imported/components/ui/list';
import { Section } from '@/imported/components/ui/section';
import { Row } from '@/imported/components/ui/row';
import { Grid } from '@/imported/components/ui/grid';
import { Flex } from '@/imported/components/ui/flex';
import { Collapse } from '@/imported/components/ui/collapse';
import { BottomSheet } from '@/imported/components/ui/bottomSheet';
import { Drawer } from '@/imported/components/ui/drawer';
import { Modal } from '@/imported/components/ui/modal';
import { Navbar } from '@/imported/components/ui/navbar';
import { CounterBadge } from '@/imported/components/ui/counterBadge';
import { ChipsGroup } from '@/imported/components/ui/chipsGroup';
import { Hint } from '@/imported/components/ui/hint';
import { Informer } from '@/imported/components/ui/informer';
import { Suggest } from '@/imported/components/ui/suggest';
import { Summary } from '@/imported/components/ui/summary';
import { SegmentedControl } from '@/imported/components/ui/segmentedControl';
import { ProgressStepper } from '@/imported/components/ui/progressStepper';
import { Stepper } from '@/imported/components/ui/stepper';
import { Steps } from '@/imported/components/ui/steps';
import { Carousel } from '@/imported/components/ui/carousel';

// Реестр компонентов на клиенте
const componentRegistry: Record<string, React.ComponentType<any>> = {
  button: Button,
  buttonIcon: ButtonIcon,
  badge: Badge,
  text: Typography,
  avatar: Avatar,
  input: Input,
  checkbox: Checkbox,
  radio: Radio,
  switch: Switch,
  textarea: Textarea,
  link: Link,
  select: Select,
  progress: Progress,
  chip: Chip,
  divider: Divider,
  skeleton: Skeleton,
  dropdown: Dropdown,
  card: Card,
  counter: Counter,
  status: Status,
  slider: Slider,
  pagination: Pagination,
  radioGroup: RadioGroup,
  checkboxGroup: CheckboxGroup,
  switchGroup: SwitchGroup,
  breadcrumbs: Breadcrumbs,
  tabBar: TabBar,
  list: List,
  section: Section,
  row: Row,
  grid: Grid,
  flex: Flex,
  collapse: Collapse,
  bottomSheet: BottomSheet,
  drawer: Drawer,
  modal: Modal,
  navbar: Navbar,
  counterBadge: CounterBadge,
  chipsGroup: ChipsGroup,
  hint: Hint,
  informer: Informer,
  suggest: Suggest,
  summary: Summary,
  segmentedControl: SegmentedControl,
  progressStepper: ProgressStepper,
  stepper: Stepper,
  steps: Steps,
  carousel: Carousel,
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
      typography: 'bodyM',
      withPadding: false,
      'aria-label': 'Button icon'
    },
    text: {
      children: 'Text',
      typography: 'bodyM_paragraph_normal'
    },
    badge: {
      children: 'Badge',
      typography: 'bodyM',
      iconPosition: 'left',
      rounded: false,
    },
    avatar: {
      src: '',
      alt: 'Avatar'
    },
    input: {
      placeholder: 'Введите текст',
      label: 'Поле ввода'
    },
    checkbox: {
      label: 'Checkbox',
      checked: false,
      typography: 'bodyM'
    },
    radio: {
      label: 'Radio',
      name: 'radio-group',
      value: 'option1',
      checked: false,
      typography: 'bodyM'
    },
    switch: {
      label: 'Switch',
      isActive: false,
      typography: 'bodyM'
    },
    textarea: {
      label: 'Textarea',
      placeholder: 'Enter text...',
      value: '',
      minRows: 3
    },
    link: {
      children: 'Link',
      href: 'https://example.com',
      colorScheme: 'brand'
    },
    select: {
      label: 'Select',
      placeholder: 'Выберите значение',
      options: [
        { value: 'option1', label: 'Опция 1' },
        { value: 'option2', label: 'Опция 2' },
        { value: 'option3', label: 'Опция 3' }
      ]
    },
    progress: {
      value: 50,
      colorScheme: 'brand'
    },
    chip: {
      text: 'Chip',
      variant: 'tonned',
      colorScheme: 'brandPrimary',
      selected: false,
      typography: 'bodyM',
      paddingSize: 'tiny',
      rounded: false,
    },
    divider: {
      orientation: 'horizontal',
      thickness: '1px',
    },
    skeleton: {
      variant: 'rectangle',
      width: '100%',
      height: '20px',
    },
    dropdown: {
      isOpen: false,
      content: null,
      placement: 'bottom',
    },
    card: {
      variant: 'outlined',
      paddingSize: 'medium',
      hasBorder: true,
    },
    counter: {
      value: 0,
      size: 'bodyM',
      step: 1,
    },
    status: {
      children: 'Status',
      colorScheme: 'info',
      typography: 'bodyS',
      iconPosition: 'left',
      hasIcon: true,
    },
    slider: {
      min: 0,
      max: 100,
      step: 1,
      value: 50,
    },
    pagination: {
      totalElements: 100,
      itemsPerPage: 10,
      onChange: () => {},
    },
    radioGroup: {
      groupName: 'group',
      onChange: () => {},
      children: [],
    },
    checkboxGroup: {
      groupName: 'group',
      children: [],
    },
    switchGroup: {
      groupName: 'group',
      children: [],
    },
    breadcrumbs: {
      items: [
        { title: 'Главная' },
        { title: 'Текущая страница' },
      ],
    },
    tabBar: {
      items: [
        { key: '1', name: 'Вкладка 1' },
        { key: '2', name: 'Вкладка 2' },
      ],
      selectedTab: '1',
      onChange: () => {},
    },
    list: {
      items: [
        { header: 'Заголовок 1', content: 'Содержимое 1' },
        { header: 'Заголовок 2', content: 'Содержимое 2' },
      ],
    },
    section: {
      children: null,
    },
    row: {
      children: null,
      columns: 1,
    },
    grid: {
      children: null,
      columns: 12,
      rows: 1,
      gap: 'x2',
    },
    flex: {
      children: null,
      direction: 'row',
      justify: 'start',
      align: 'stretch',
    },
    collapse: {
      isOpen: false,
      timeout: 200,
    },
    bottomSheet: {
      isOpen: false,
      onClose: () => {},
    },
    drawer: {
      isOpen: false,
      onClose: () => {},
      position: 'left',
    },
    modal: {
      isOpen: false,
      onClose: () => {},
      size: 'm',
    },
    navbar: {
      title: 'Navbar',
    },
    counterBadge: {
      value: 1,
    },
    chipsGroup: {
      groupName: 'group',
      children: [],
    },
    hint: {
      text: 'Подсказка',
      children: 'Триггер',
    },
    informer: {
      title: 'Title',
      text: 'Текст',
    },
    suggest: {
      label: 'Label',
      value: 'value',
    },
    summary: {
      children: [],
    },
    segmentedControl: {
      items: [
        { key: '1', name: 'Value 1' },
        { key: '2', name: 'Value 2' },
      ],
      selected: '1',
      onChange: () => {},
    },
    progressStepper: {
      title: 'Title',
      percent: 50,
    },
    stepper: {
      items: [
        { key: 1, label: 'Шаг 1' },
        { key: 2, label: 'Шаг 2' },
      ],
      activeStep: 0,
    },
    steps: {
      count: 5,
      onClick: () => {},
    },
    carousel: {
      children: [],
    },
  };
  
  return defaultPropsMap[id] || {};
}
