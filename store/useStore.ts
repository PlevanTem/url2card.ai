import { create } from 'zustand'
import { Template, templates } from '../types/templates'

interface CardState {
  url: string
  title: string
  quote: string
  isLoading: boolean
  error: string | null
  selectedTemplate: Template
  setUrl: (url: string) => void
  setCardData: (data: { title: string; quote: string }) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setTemplate: (templateId: string) => void
}

export const useStore = create<CardState>((set) => ({
  url: '',
  title: '',
  quote: '',
  isLoading: false,
  error: null,
  selectedTemplate: templates[0],
  setUrl: (url) => set({ url }),
  setCardData: (data) => set({ title: data.title, quote: data.quote }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setTemplate: (templateId) => set({ 
    selectedTemplate: templates.find(t => t.id === templateId) || templates[0] 
  })
})) 