"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge/badge";
import { Input } from "@/components/ui/input/input";
import { Text } from "@/components/ui/text/text";
import { Separator } from "@/components/ui/separator/separator";
import { Switch } from "@/components/ui/switch/switch";
import { Label } from "@/components/ui/label/label";

export default function ThemeDemoPage() {
  const { isDark, toggleTheme, setTheme, isInitialized } = useTheme();
  const [switchChecked, setSwitchChecked] = useState(false);

  // Применяем стили body при инициализации и изменении темы
  useEffect(() => {
    if (isInitialized) {
      document.body.style.backgroundColor = 'var(--colors-background0-primary)';
      document.body.style.color = 'var(--colors-text-primary)';
    }
  }, [isInitialized, isDark]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Text size="body">Загрузка...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--colors-background0-primary)', color: 'var(--colors-text-primary)' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with theme toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Text size="h1" weight="bold">Theme Demo</Text>
            <Text size="body" className="mt-2" style={{ color: 'var(--colors-text-secondary)' }}>
              Демонстрация переключения между светлой и темной темами
            </Text>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setTheme('light')}
              variant={!isDark ? 'primary' : 'secondary'}
              semantic="default"
              size="sm"
            >
              Светлая
            </Button>
            <Button
              onClick={() => setTheme('dark')}
              variant={isDark ? 'primary' : 'secondary'}
              semantic="default"
              size="sm"
            >
              Темная
            </Button>
            <Button
              onClick={toggleTheme}
              variant="secondary"
              semantic="default"
              size="sm"
            >
              {isDark ? '☀️' : '🌙'} Переключить
            </Button>
          </div>
        </div>

        {/* Current theme indicator */}
        <div 
          className="p-4 rounded-lg"
          style={{ 
            backgroundColor: 'var(--colors-background1-primary)',
            border: '1px solid var(--colors-elevation0-borderNormal)'
          }}
        >
          <Text size="body" weight="medium">
            Текущая тема: <span style={{ color: 'var(--colors-text-brand)' }}>{isDark ? 'Темная' : 'Светлая'}</span>
          </Text>
        </div>

        <Separator />

        {/* Semantic Colors Section */}
        <section className="space-y-4">
          <Text size="h2" weight="bold">Семантические цвета</Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Primary */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background1-primary)' }}
            >
              <Text size="h6" weight="semibold" className="mb-2">Primary</Text>
              <div className="space-y-2">
                <div style={{ color: 'var(--colors-text-primary)' }}>Text Primary</div>
                <div style={{ color: 'var(--colors-text-secondary)' }}>Text Secondary</div>
                <div style={{ color: 'var(--colors-icon-primary)' }}>Icon Primary</div>
              </div>
            </div>

            {/* Brand */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background1-brand)' }}
            >
              <Text size="h6" weight="semibold" className="mb-2" style={{ color: 'var(--colors-text-brand)' }}>Brand</Text>
              <div className="space-y-2">
                <div style={{ color: 'var(--colors-text-brand)' }}>Text Brand</div>
                <div style={{ color: 'var(--colors-icon-brand)' }}>Icon Brand</div>
              </div>
            </div>

            {/* Success */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background1-success)' }}
            >
              <Text size="h6" weight="semibold" className="mb-2" style={{ color: 'var(--colors-text-success)' }}>Success</Text>
              <div className="space-y-2">
                <div style={{ color: 'var(--colors-text-success)' }}>Text Success</div>
                <div style={{ color: 'var(--colors-icon-success)' }}>Icon Success</div>
              </div>
            </div>

            {/* Warning */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background1-warning)' }}
            >
              <Text size="h6" weight="semibold" className="mb-2" style={{ color: 'var(--colors-text-warning)' }}>Warning</Text>
              <div className="space-y-2">
                <div style={{ color: 'var(--colors-text-warning)' }}>Text Warning</div>
                <div style={{ color: 'var(--colors-icon-warning)' }}>Icon Warning</div>
              </div>
            </div>

            {/* Info */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background1-info)' }}
            >
              <Text size="h6" weight="semibold" className="mb-2" style={{ color: 'var(--colors-text-info)' }}>Info</Text>
              <div className="space-y-2">
                <div style={{ color: 'var(--colors-text-info)' }}>Text Info</div>
                <div style={{ color: 'var(--colors-icon-info)' }}>Icon Info</div>
              </div>
            </div>

            {/* Critical */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background1-critical)' }}
            >
              <Text size="h6" weight="semibold" className="mb-2" style={{ color: 'var(--colors-text-critical)' }}>Critical</Text>
              <div className="space-y-2">
                <div style={{ color: 'var(--colors-text-critical)' }}>Text Critical</div>
                <div style={{ color: 'var(--colors-icon-critical)' }}>Icon Critical</div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Buttons Section */}
        <section className="space-y-4">
          <Text size="h2" weight="bold">Кнопки</Text>
          
          <div className="space-y-6">
            {/* Filled Buttons */}
            <div>
              <Text size="h6" weight="semibold" className="mb-3">Filled</Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" semantic="default">Primary</Button>
                <Button variant="primary" semantic="accent">Brand</Button>
                <Button variant="primary" semantic="success">Success</Button>
                <Button variant="primary" semantic="warning">Warning</Button>
                <Button variant="primary" semantic="info">Info</Button>
                <Button variant="primary" semantic="critical">Critical</Button>
              </div>
            </div>

            {/* Outlined Buttons */}
            <div>
              <Text size="h6" weight="semibold" className="mb-3">Outlined</Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" semantic="default">Primary</Button>
                <Button variant="secondary" semantic="accent">Brand</Button>
                <Button variant="secondary" semantic="success">Success</Button>
                <Button variant="secondary" semantic="warning">Warning</Button>
                <Button variant="secondary" semantic="info">Info</Button>
                <Button variant="secondary" semantic="critical">Critical</Button>
              </div>
            </div>

            {/* Text Buttons */}
            <div>
              <Text size="h6" weight="semibold" className="mb-3">Text</Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="text" semantic="default">Primary</Button>
                <Button variant="text" semantic="accent">Brand</Button>
                <Button variant="text" semantic="success">Success</Button>
                <Button variant="text" semantic="warning">Warning</Button>
                <Button variant="text" semantic="info">Info</Button>
                <Button variant="text" semantic="critical">Critical</Button>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Badges Section */}
        <section className="space-y-4">
          <Text size="h2" weight="bold">Бейджи</Text>
          
          <div className="flex flex-wrap gap-3">
            <Badge semantic="default">Default</Badge>
            <Badge semantic="accent">Brand</Badge>
            <Badge semantic="success">Success</Badge>
            <Badge semantic="warning">Warning</Badge>
            <Badge semantic="info">Info</Badge>
            <Badge semantic="critical">Critical</Badge>
          </div>
        </section>

        <Separator />

        {/* Inputs Section */}
        <section className="space-y-4">
          <Text size="h2" weight="bold">Поля ввода</Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Input label="Обычное поле" placeholder="Введите текст..." />
            <Input label="Отключенное поле" placeholder="Disabled" disabled />
            <Input label="С предупреждением" placeholder="Warning" aria-invalid />
            <div className="space-y-2">
              <Label>Switch</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                />
                <Text size="body">{switchChecked ? 'Включено' : 'Выключено'}</Text>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Elevation Section */}
        <section className="space-y-4">
          <Text size="h2" weight="bold">Elevation (Слои)</Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: 'var(--colors-elevation0-body)',
                border: '1px solid var(--colors-elevation0-borderNormal)'
              }}
            >
              <Text size="h6" weight="semibold" className="mb-2">Elevation 0</Text>
              <Text size="body" style={{ color: 'var(--colors-text-secondary)' }}>
                Основной слой интерфейса
              </Text>
            </div>
            
            <div 
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: 'var(--colors-elevation1-bodyNormal)',
                border: '1px solid var(--colors-elevation1-borderNormal)'
              }}
            >
              <Text size="h6" weight="semibold" className="mb-2">Elevation 1</Text>
              <Text size="body" style={{ color: 'var(--colors-text-secondary)' }}>
                Всплывающие элементы
              </Text>
            </div>
          </div>
        </section>

        <Separator />

        {/* Background Colors Section */}
        <section className="space-y-4">
          <Text size="h2" weight="bold">Фоны</Text>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background0-primary)' }}
            >
              <Text size="h6" weight="semibold">Background 0 Primary</Text>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background1-primary)' }}
            >
              <Text size="h6" weight="semibold">Background 1 Primary</Text>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--colors-background2-primary)' }}
            >
              <Text size="h6" weight="semibold">Background 2 Primary</Text>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

