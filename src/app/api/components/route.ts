import { NextResponse } from 'next/server';
import { ComponentDocsGenerator } from '@/lib/component-docs/generator';

export async function GET() {
  try {
    const generator = new ComponentDocsGenerator();
    const docsConfig = generator.generateDocsConfig();
    
    // Возвращаем только метаданные компонентов без React компонентов
    const componentMetadata = Object.entries(docsConfig).map(([id, docs]) => ({
      id,
      name: docs.title,
      category: docs.category,
      // component и defaultProps будут загружаться на клиенте через component-registry
    }));

    return NextResponse.json({ 
      componentMetadata,
      docsConfig 
    });
  } catch (error) {
    console.error('Error generating component data:', error);
    return NextResponse.json(
      { error: 'Failed to generate component data' },
      { status: 500 }
    );
  }
}
