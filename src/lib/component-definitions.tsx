import { ComponentDefinition } from "@/types/page-builder";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import { Badge } from "@/components/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Separator } from "@/components/separator";
import { Text } from "@/components/text";
import { Cell } from "@/components/cell";
import { Image } from "@/components/image";
import { 
  MousePointer2, 
  Layout, 
  Type, 
  Circle 
} from "lucide-react";

// Маппинг категорий с иконками
export const categoryIcons = {
  Контролы: MousePointer2,
  Разметка: Layout,
  Текст: Type,
  Базовые: Circle,
} as const;

// Маппинг категорий с цветами
export const categoryColors = {
  Контролы: "primary",
  Лэйаут: "info", 
  Текст: "primary",
  Базовые: "success",
} as const;

// Функция для получения иконки категории
export const getCategoryIcon = (category: string) => {
  return categoryIcons[category as keyof typeof categoryIcons] || Circle;
};

// Функция для получения цвета категории
export const getCategoryColor = (category: string) => {
  return categoryColors[category as keyof typeof categoryColors] || "default";
};

export const componentDefinitions: ComponentDefinition[] = [
  {
    id: "button",
    name: "Button",
    category: "Контролы",
    component: Button,
    defaultProps: {
      children: "Click me",
      variant: "primary",
      semantic: "default",
      size: "default"
    }
  },
  {
    id: "input",
    name: "Input",
    category: "Контролы",
    component: Input,
    defaultProps: {
      placeholder: "Enter text...",
      type: "text"
    }
  },
  {
    id: "label",
    name: "Label",
    category: "Контролы",
    component: Label,
    defaultProps: {
      children: "Label"
    }
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "Контролы",
    component: Textarea,
    defaultProps: {
      placeholder: "Enter your message...",
      rows: 3
    }
  },
  {
    id: "badge",
    name: "Badge",
    category: "Базовые",
    component: Badge,
    defaultProps: {
      children: "Badge",
      semantic: "default",
      active: true
    }
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Базовые",
    component: Avatar,
    defaultProps: {
      children: (
        <AvatarFallback>U</AvatarFallback>
      )
    }
  },
  {
    id: "separator",
    name: "Separator",
    category: "Лэйаут",
    component: Separator,
    defaultProps: {
      orientation: "horizontal"
    }
  },
  {
    id: "text-h1",
    name: "Heading 1",
    category: "Текст",
    component: Text,
    defaultProps: {
      children: "Heading 1",
      size: "h1"
    }
  },
  {
    id: "text-h2",
    name: "Heading 2",
    category: "Текст",
    component: Text,
    defaultProps: {
      children: "Heading 2",
      size: "h2"
    }
  },
  {
    id: "text-h3",
    name: "Heading 3",
    category: "Текст",
    component: Text,
    defaultProps: {
      children: "Heading 3",
      size: "h3"
    }
  },
  {
    id: "text-body",
    name: "Body Text",
    category: "Текст",
    component: Text,
    defaultProps: {
      children: "This is body text",
      size: "body"
    }
  },
  {
    id: "text-caption",
    name: "Caption",
    category: "Текст",
    component: Text,
    defaultProps: {
      children: "Caption text",
      size: "caption"
    }
  },
  {
    id: "text-footnote",
    name: "Footnote",
    category: "Текст",
    component: Text,
    defaultProps: {
      children: "Footnote text",
      size: "footnote"
    }
  },
  {
    id: "cell",
    name: "Cell",
    category: "Лэйаут",
    component: Cell,
    defaultProps: {
      title: "Cell Title",
      description: "Cell description",
      leftIcon: "📱",
      rightIcon: "→"
    }
  },
  {
    id: "cell-without-icons",
    name: "Cell (No Icons)",
    category: "Лэйаут",
    component: Cell,
    defaultProps: {
      title: "Simple Cell",
      description: "Cell without icons"
    }
  },
  {
    id: "cell-left-only",
    name: "Cell (Left Icon)",
    category: "Лэйаут",
    component: Cell,
    defaultProps: {
      title: "Cell with Left Icon",
      description: "Only left icon is shown",
      leftIcon: "⭐"
    }
  },
  {
    id: "image",
    name: "Image",
    category: "Базовые",
    component: Image,
    defaultProps: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
      alt: "Sample image",
      aspectRatio: "auto",
      showControls: true
    }
  },
  {
    id: "image-square",
    name: "Image (Square)",
    category: "Базовые",
    component: Image,
    defaultProps: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      alt: "Square image",
      aspectRatio: "square",
      radius: "lg",
      showControls: true
    }
  },
  {
    id: "image-portrait",
    name: "Image (Portrait)",
    category: "Базовые",
    component: Image,
    defaultProps: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop",
      alt: "Portrait image",
      aspectRatio: "portrait",
      objectFit: "cover",
      showControls: true
    }
  },
  {
    id: "image-landscape",
    name: "Image (Landscape)",
    category: "Базовые",
    component: Image,
    defaultProps: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
      alt: "Landscape image",
      aspectRatio: "landscape",
      objectFit: "cover",
      showControls: true
    }
  },
  {
    id: "image-circle",
    name: "Image (Circle)",
    category: "Базовые",
    component: Image,
    defaultProps: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      alt: "Circle image",
      aspectRatio: "square",
      radius: "full",
      showControls: true
    }
  }
];
