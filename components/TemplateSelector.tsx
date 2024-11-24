'use client'

import { templates } from '../types/templates'
import { useStore } from '../store/useStore'

export default function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useStore()

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
      <div className="grid grid-cols-2 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTemplate.id === template.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {/* Preview Card */}
            <div 
              className={`
                w-full 
                aspect-[4/6] 
                rounded-lg 
                ${template.colors.background} 
                ${template.colors.border} 
                border 
                p-6
                flex 
                flex-col
                gap-4
              `}
            >
              <div className={`${template.colors.text}`}>
                Title
              </div>
              <div className={`${template.colors.quote}`}>
                This is a sample quote to demonstrate the styling.
              </div>
            </div>
            <div className="mt-3 text-sm font-medium">{template.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
} 