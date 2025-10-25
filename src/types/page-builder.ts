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
}
