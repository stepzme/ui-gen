"use client"

import { use, useState, useEffect } from "react"

// Динамически загружаем компоненты
async function loadDemoComponent(component: string): Promise<React.ComponentType | null> {
  try {
    switch (component) {
      case 'avatar':
        const AvatarDemo = (await import("@/imported/components/ui/avatar/avatar-demo")).default
        return AvatarDemo
      case 'badge':
        const BadgeDemo = (await import("@/imported/components/ui/badge/badge-demo")).default
        return BadgeDemo
      case 'bubble':
        const BubbleDemo = (await import("@/imported/components/ui/bubble/bubble-demo")).default
        return BubbleDemo
      case 'button':
        const ButtonDemo = (await import("@/imported/components/ui/button/button-demo")).default
        return ButtonDemo
      case 'button-icon':
      case 'buttonIcon':
        const ButtonIconDemo = (await import("@/imported/components/ui/buttonIcon/button-icon-demo")).default
        return ButtonIconDemo
      case 'button-text':
      case 'buttonText':
        const ButtonTextDemo = (await import("@/imported/components/ui/buttonText/button-text-demo")).default
        return ButtonTextDemo
      case 'icon':
        const IconDemo = (await import("@/imported/components/ui/icon/icon-demo")).default
        return IconDemo
      case 'input':
        const InputDemo = (await import("@/imported/components/ui/input/input-demo")).default
        return InputDemo
      case 'checkbox':
        const CheckboxDemo = (await import("@/imported/components/ui/checkbox/checkbox-demo")).default
        return CheckboxDemo
      case 'radio':
        const RadioDemo = (await import("@/imported/components/ui/radio/radio-demo")).default
        return RadioDemo
      case 'switch':
        const SwitchDemo = (await import("@/imported/components/ui/switch/switch-demo")).default
        return SwitchDemo
      case 'textarea':
        const TextareaDemo = (await import("@/imported/components/ui/textarea/textarea-demo")).default
        return TextareaDemo
      case 'link':
        const LinkDemo = (await import("@/imported/components/ui/link/link-demo")).default
        return LinkDemo
      case 'select':
        const SelectDemo = (await import("@/imported/components/ui/select/select-demo")).default
        return SelectDemo
      case 'progress':
        const ProgressDemo = (await import("@/imported/components/ui/progress/progress-demo")).default
        return ProgressDemo
      case 'tooltip':
        const TooltipDemo = (await import("@/imported/components/ui/tooltip/tooltip-demo")).default
        return TooltipDemo
      case 'chip':
        const ChipDemo = (await import("@/imported/components/ui/chip/chip-demo")).default
        return ChipDemo
      case 'divider':
        const DividerDemo = (await import("@/imported/components/ui/divider/divider-demo")).default
        return DividerDemo
      case 'skeleton':
        const SkeletonDemo = (await import("@/imported/components/ui/skeleton/skeleton-demo")).default
        return SkeletonDemo
      case 'dropdown':
        const DropdownDemo = (await import("@/imported/components/ui/dropdown/dropdown-demo")).default
        return DropdownDemo
      case 'card':
        const CardDemo = (await import("@/imported/components/ui/card/card-demo")).default
        return CardDemo
      case 'counter':
        const CounterDemo = (await import("@/imported/components/ui/counter/counter-demo")).default
        return CounterDemo
      case 'status':
        const StatusDemo = (await import("@/imported/components/ui/status/status-demo")).StatusDemo
        return StatusDemo
      case 'slider':
        const SliderDemo = (await import("@/imported/components/ui/slider/slider-demo")).SliderDemo
        return SliderDemo
      case 'pagination':
        const PaginationDemo = (await import("@/imported/components/ui/pagination/pagination-demo")).PaginationDemo
        return PaginationDemo
      case 'radio-group':
      case 'radioGroup':
        const RadioGroupDemo = (await import("@/imported/components/ui/radioGroup/radio-group-demo")).RadioGroupDemo
        return RadioGroupDemo
      case 'checkbox-group':
      case 'checkboxGroup':
        const CheckboxGroupDemo = (await import("@/imported/components/ui/checkboxGroup/checkbox-group-demo")).CheckboxGroupDemo
        return CheckboxGroupDemo
      case 'switch-group':
      case 'switchGroup':
        const SwitchGroupDemo = (await import("@/imported/components/ui/switchGroup/switch-group-demo")).SwitchGroupDemo
        return SwitchGroupDemo
      case 'breadcrumbs':
        const BreadcrumbsDemo = (await import("@/imported/components/ui/breadcrumbs/breadcrumbs-demo")).BreadcrumbsDemo
        return BreadcrumbsDemo
      case 'tab-bar':
      case 'tabBar':
        const TabBarDemo = (await import("@/imported/components/ui/tabBar/tab-bar-demo")).TabBarDemo
        return TabBarDemo
      case 'list':
        const ListDemo = (await import("@/imported/components/ui/list/list-demo")).ListDemo
        return ListDemo
      case 'section':
        const SectionDemo = (await import("@/imported/components/ui/section/section-demo")).SectionDemo
        return SectionDemo
      case 'row':
        const RowDemo = (await import("@/imported/components/ui/row/row-demo")).RowDemo
        return RowDemo
      case 'grid':
        const GridDemo = (await import("@/imported/components/ui/grid/grid-demo")).GridDemo
        return GridDemo
      case 'flex':
        const FlexDemo = (await import("@/imported/components/ui/flex/flex-demo")).FlexDemo
        return FlexDemo
      case 'collapse':
        const CollapseDemo = (await import("@/imported/components/ui/collapse/collapse-demo")).CollapseDemo
        return CollapseDemo
      case 'bottom-sheet':
      case 'bottomSheet':
        const BottomSheetDemo = (await import("@/imported/components/ui/bottomSheet/bottom-sheet-demo")).BottomSheetDemo
        return BottomSheetDemo
      case 'drawer':
        const DrawerDemo = (await import("@/imported/components/ui/drawer/drawer-demo")).DrawerDemo
        return DrawerDemo
      case 'modal':
        const ModalDemo = (await import("@/imported/components/ui/modal/modal-demo")).ModalDemo
        return ModalDemo
      case 'navbar':
        const NavbarDemo = (await import("@/imported/components/ui/navbar/navbar-demo")).default
        return NavbarDemo
      case 'counter-badge':
      case 'counterBadge':
        const CounterBadgeDemo = (await import("@/imported/components/ui/counterBadge/counter-badge-demo")).default
        return CounterBadgeDemo
      case 'chips-group':
      case 'chipsGroup':
        const ChipsGroupDemo = (await import("@/imported/components/ui/chipsGroup/chips-group-demo")).default
        return ChipsGroupDemo
      case 'hint':
        const HintDemo = (await import("@/imported/components/ui/hint/hint-demo")).default
        return HintDemo
      case 'informer':
        const InformerDemo = (await import("@/imported/components/ui/informer/informer-demo")).default
        return InformerDemo
      case 'suggest':
        const SuggestDemo = (await import("@/imported/components/ui/suggest/suggest-demo")).default
        return SuggestDemo
      case 'summary':
        const SummaryDemo = (await import("@/imported/components/ui/summary/summary-demo")).default
        return SummaryDemo
      case 'segmented-control':
      case 'segmentedControl':
        const SegmentedControlDemo = (await import("@/imported/components/ui/segmentedControl/segmented-control-demo")).default
        return SegmentedControlDemo
      case 'progress-stepper':
      case 'progressStepper':
        const ProgressStepperDemo = (await import("@/imported/components/ui/progressStepper/progress-stepper-demo")).default
        return ProgressStepperDemo
      case 'stepper':
        const StepperDemo = (await import("@/imported/components/ui/stepper/stepper-demo")).default
        return StepperDemo
      case 'steps':
        const StepsDemo = (await import("@/imported/components/ui/steps/steps-demo")).default
        return StepsDemo
      case 'carousel':
        const CarouselDemo = (await import("@/imported/components/ui/carousel/carousel-demo")).default
        return CarouselDemo
      default:
        return null
    }
  } catch (error) {
    console.error(`Failed to load demo component: ${component}`, error)
    return null
  }
}

interface DemoPageProps {
  params: Promise<{ component: string }>
}

export default function DemoPage({ params }: DemoPageProps) {
  const { component } = use(params)
  const [DemoComponent, setDemoComponent] = useState<React.ComponentType | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  
  useEffect(() => {
    loadDemoComponent(component)
      .then((Component) => {
        if (!Component) {
          setNotFound(true)
          setLoading(false)
          return
        }
        setDemoComponent(() => Component)
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [component])
  
  if (loading) {
    return (
      <div 
        style={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--colors-background0-primary)', 
          color: 'var(--colors-text-primary)'
        }}
      >
        Загрузка демо...
      </div>
    )
  }
  
  if (notFound || !DemoComponent) {
    return (
      <div 
        style={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          backgroundColor: 'var(--colors-background0-primary)', 
          color: 'var(--colors-text-primary)'
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>404</h1>
        <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
          Демо для компонента "{component}" не найдено
        </p>
      </div>
    )
  }
  
  return <DemoComponent />
}



