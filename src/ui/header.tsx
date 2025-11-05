"use client";

import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { signOut } from "next-auth/react";

interface HeaderProps {
  activeTab: 'builder' | 'sandbox';
  onTabChange: (tab: 'builder' | 'sandbox') => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground-primary"
            >
              <path
                d="M80 52.4498C80 57.2841 78.0796 61.9204 74.6612 65.3388L65.3388 74.6612C61.9204 78.0796 57.2841 80 52.4498 80H18.2278C8.16089 80 0 71.8391 0 61.7722V27.5502C0 22.7159 1.92043 18.0796 5.33881 14.6612L14.6612 5.33881C18.0796 1.92043 22.7159 0 27.5502 0H61.7722C71.8391 0 80 8.16089 80 18.2278V52.4498ZM73.8617 5.96123C63.3837 -4.5168 39.6896 2.18932 20.9395 20.9395C2.18932 39.6896 -4.5168 63.3837 5.96123 73.8617C16.4394 84.3394 40.1335 77.6335 58.8835 58.8835C77.6335 40.1335 84.3394 16.4394 73.8617 5.96123Z"
                fill="currentColor"
              />
              <path
                d="M39.4937 22.3541L41.3074 30.5211C42.1012 34.095 44.8923 36.8862 48.4662 37.6799L56.6332 39.4937L48.4662 41.3074C44.8923 42.1012 42.1012 44.8923 41.3074 48.4662L39.4937 56.6332L37.6799 48.4662C36.8862 44.8923 34.095 42.1012 30.5211 41.3074L22.3541 39.4937L30.5211 37.6799C34.095 36.8862 36.8862 34.095 37.6799 30.5211L39.4937 22.3541Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Button
              variant={activeTab === 'builder' ? 'primary' : 'secondary'}
              semantic="default"
              size="sm"
              onClick={() => onTabChange('builder')}
            >
              Конструктор
            </Button>
            <Button
              variant={activeTab === 'sandbox' ? 'primary' : 'secondary'}
              semantic="default"
              size="sm"
              onClick={() => onTabChange('sandbox')}
            >
              Дизайн-система
            </Button>
          </nav>
        </div>

        {/* Right side - Theme Toggle and Logout */}
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleTheme}
            variant="secondary"
            semantic="default"
            size="sm"
            className="flex items-center gap-2"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="secondary"
            semantic="default"
            size="sm"
            className="flex items-center gap-2"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
