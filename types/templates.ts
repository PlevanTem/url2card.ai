export interface Template {
  id: string;
  name: string;
  colors: {
    background: string;
    text: string;
    quote: string;
    border?: string;
  };
  layout: 'classic' | 'modern' | 'minimal';
}

export const templates: Template[] = [
  {
    id: 'classic-light',
    name: 'Classic Light',
    colors: {
      background: 'bg-white',
      text: 'text-gray-800 text-base font-semibold',
      quote: 'text-gray-600 text-sm italic',
      border: 'border-gray-200'
    },
    layout: 'classic'
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    colors: {
      background: 'bg-gradient-to-br from-gray-900 via-black to-gray-800',
      text: 'text-white',
      quote: 'text-gray-300',
      border: 'border-gray-800'
    },
    layout: 'classic'
  }
] 