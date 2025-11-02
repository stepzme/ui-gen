export interface ComponentProps {
  [key: string]: any;
}

export interface ComponentNode {
  id: string;
  type: string;
  props: ComponentProps;
  children?: ComponentNode[];
  fullWidth?: boolean;
}

export interface Artboard {
  id: string;
  name: string;
  width: number;
  height: number;
  type: 'desktop' | 'mobile';
  gap: number;
  status: 'draft' | 'review' | 'approved' | 'published';
  children: ComponentNode[];
  position?: { x: number; y: number };
  autoHeight?: boolean;
  navbarVariant?: 'ios' | 'android';
  navbarTitle?: string;
  navbarDescription?: string;
  navbarRightIcon?: string;
  navbarShowNavigation?: boolean;
  navbarShowTitle?: boolean;
  navbarShowDescription?: boolean;
  navbarShowRightButton?: boolean;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  category: string;
  component: React.ComponentType<any>;
  defaultProps: ComponentProps;
}

export interface SelectedElement {
  type: 'artboard' | 'component';
  id: string;
  node?: ComponentNode;
  name?: string;
  status?: 'draft' | 'review' | 'approved' | 'published';
  artboardType?: 'desktop' | 'mobile';
  width?: number;
  height?: number;
  autoHeight?: boolean;
  navbarVariant?: 'ios' | 'android';
  navbarTitle?: string;
  navbarDescription?: string;
  navbarRightIcon?: string;
  navbarShowNavigation?: boolean;
  navbarShowTitle?: boolean;
  navbarShowDescription?: boolean;
  navbarShowRightButton?: boolean;
}
