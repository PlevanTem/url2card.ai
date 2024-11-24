"use client";

import UrlInput from '../components/UrlInput'
import SharingCard from '../components/SharingCard'
import TemplateSelector from '../components/TemplateSelector'
import { useStore } from '../store/useStore'
import html2canvas from 'html2canvas'

export default function Home() {
  const { title, quote } = useStore()

  const handleDownload = async () => {
    const cardRef = document.querySelector('.card-ref'); // Adjust the selector as needed
    if (cardRef) {
      const canvas = await html2canvas(cardRef as HTMLElement);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'sharing-card.png';
      link.click();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <nav className="w-full px-6 py-4 bg-white/70 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">url2Card.ai</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">About</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
            Create Beautiful Sharing Cards
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your links into eye-catching social cards in seconds
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Input Controls */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                Customize Your Card
              </h3>
              <p className="text-gray-600">
                Enter your URL and customize the appearance
              </p>
            </div>
            
            <UrlInput />
            
            <div className="border-t border-gray-100 pt-6">
              <TemplateSelector />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-8 order-1 lg:order-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Preview</h3>
              </div>
              <SharingCard onDownload={handleDownload} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 