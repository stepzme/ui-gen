"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function SemanticTokensDemoPage() {
  const [isDark, setIsDark] = useState(false);

  // Check initial theme preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const semanticTokens = [
    { category: "background", tokens: ["primary", "secondary", "brand", "success", "info", "warning", "critical", "inverted"] },
    { category: "foreground", tokens: ["primary", "secondary", "brand", "success", "info", "warning", "critical", "inverted"] },
    { category: "border", tokens: ["primary", "secondary", "brand", "success", "info", "warning", "critical", "inverted"] },
    { category: "ring", tokens: ["primary", "secondary", "brand", "success", "info", "warning", "critical", "inverted"] },
  ];

  const getTokenClass = (category: string, token: string) => {
    return `bg-${category}-${token}`;
  };

  const getTextClass = (category: string, token: string) => {
    return `text-${category}-${token}`;
  };

  const getBorderClass = (category: string, token: string) => {
    return `border-${category}-${token}`;
  };

  const getRingClass = (category: string, token: string) => {
    return `ring-${category}-${token}`;
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <div className="bg-background-secondary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-foreground-primary mb-2">
                Semantic Color Tokens
              </h1>
              <p className="text-foreground-secondary text-lg">
                Семантические токены поверх OKLCH базового слоя
              </p>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-primary bg-background-primary hover:bg-background-secondary transition-colors text-foreground-primary"
              title={`Переключить на ${isDark ? 'светлую' : 'темную'} тему`}
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span className="hidden sm:inline">Светлая</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span className="hidden sm:inline">Темная</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Usage Examples */}
        <div className="bg-background-secondary rounded-lg border border-border-primary p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground-primary mb-6">
            Примеры использования
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Brand Button */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground-primary">Brand Button</h3>
              <button className="w-full px-4 py-2 rounded-lg bg-background-brand text-foreground-brand border border-border-brand hover:bg-background-success transition-colors focus:ring-2 focus:ring-ring-brand">
                Brand Button
              </button>
            </div>

            {/* Success Button */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground-primary">Success Button</h3>
              <button className="w-full px-4 py-2 rounded-lg bg-background-success text-foreground-success border border-border-success hover:bg-background-brand transition-colors focus:ring-2 focus:ring-ring-success">
                Success Button
              </button>
            </div>

            {/* Warning Button */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground-primary">Warning Button</h3>
              <button className="w-full px-4 py-2 rounded-lg bg-background-warning text-foreground-warning border border-border-warning hover:bg-background-critical transition-colors focus:ring-2 focus:ring-ring-warning">
                Warning Button
              </button>
            </div>

            {/* Critical Button */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground-primary">Critical Button</h3>
              <button className="w-full px-4 py-2 rounded-lg bg-background-critical text-foreground-critical border border-border-critical hover:bg-background-warning transition-colors focus:ring-2 focus:ring-ring-critical">
                Critical Button
              </button>
            </div>
          </div>
        </div>

        {/* Semantic Tokens Display */}
        {semanticTokens.map(({ category, tokens }) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground-primary mb-6 capitalize">
              {category} Tokens
            </h2>
            
            <div className="grid gap-6">
              <div className="bg-background-secondary rounded-lg border border-border-primary p-6">
                <h3 className="text-lg font-medium text-foreground-primary mb-4">
                  {category.charAt(0).toUpperCase() + category.slice(1)} Semantic Tokens
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tokens.map((token) => (
                    <div key={token} className="space-y-2">
                      <div 
                        className={`w-full h-20 rounded-lg border-2 flex items-center justify-center text-sm font-medium ${
                          category === 'background' ? getTokenClass(category, token) : 'bg-background-primary'
                        } ${
                          category === 'foreground' ? getTextClass(category, token) : 'text-foreground-primary'
                        } ${
                          category === 'border' ? getBorderClass(category, token) : 'border-border-primary'
                        } ${
                          category === 'ring' ? 'ring-2 ' + getRingClass(category, token) : ''
                        }`}
                      >
                        {token}
                      </div>
                      <div className="text-xs text-foreground-secondary font-mono">
                        {category}-{token}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Technical Information */}
        <div className="bg-background-secondary rounded-lg border border-border-primary p-6">
          <h2 className="text-2xl font-semibold text-foreground-primary mb-4">
            Техническая Информация
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-foreground-primary mb-3">
                Структура токенов
              </h3>
              <ul className="space-y-2 text-foreground-secondary">
                <li>• <strong>Background</strong> - фоновые цвета</li>
                <li>• <strong>Foreground</strong> - цвета текста</li>
                <li>• <strong>Border</strong> - цвета границ</li>
                <li>• <strong>Ring</strong> - цвета фокуса</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-foreground-primary mb-3">
                Использование
              </h3>
              <div className="bg-background-primary p-4 rounded-lg border border-border-secondary">
                <code className="text-sm text-foreground-primary">
                  <div>// Tailwind классы</div>
                  <div>{"<div className=\"bg-background-brand text-foreground-brand\">"}</div>
                  <br />
                  <div>// CSS переменные</div>
                  <div>{"background: var(--background-brand);"}</div>
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
