'use client'
import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { useStore } from '../store/useStore'
import html2canvas from 'html2canvas'

interface SharingCardProps {
  title?: string
  quote?: string
  url?: string
  onDownload: () => void
}

export default function SharingCard({ onDownload }: SharingCardProps) {
  const { title, quote, url, isLoading, error, selectedTemplate } = useStore()
  const [qrCode, setQrCode] = useState<string>('')
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (url) {
      QRCode.toDataURL(url).then(setQrCode)
    }
  }, [url])

  // Call the onDownload function when needed
  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'sharing-card.png';
      link.click();
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (!title && !quote) {
    return null
  }

  console.log("Title:", title);
  console.log("Quote:", quote);

  return (
    <div 
      ref={cardRef}
      className={`
        ${selectedTemplate.colors.background}
        ${selectedTemplate.colors.border ? `border ${selectedTemplate.colors.border}` : ''}
        p-4
        rounded-xl 
        space-y-6
        shadow-lg
        transition-all duration-300
        hover:shadow-xl
        max-w-md
        mx-auto
        relative
      `}
    >
      <div className="relative p-12 flex flex-col">
        {/* Top content */}
        <div className="flex-1 space-y-6">
          {title && (
            <h2 className={`${selectedTemplate.colors.text}`}>
              {title}
            </h2>
          )}
          {quote && (
            <blockquote className={`${selectedTemplate.colors.quote}`}>
              {quote}
            </blockquote>
          )}
        </div>
        
        {/* Bottom QR code */}
        {qrCode && (
          <div className="flex justify-center">
            <img 
              src={qrCode} 
              alt="QR Code" 
              className={`w-24 h-24 ${selectedTemplate.id === 'modern-dark' ? 'invert' : ''}`}
            />
          </div>
        )}
      </div>
      <button 
        onClick={handleDownload}
        className="mt-4 text-sm text-blue-500 hover:text-blue-600"
      >
        Download
      </button>
    </div>
  )
}