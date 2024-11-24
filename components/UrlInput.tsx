'use client'

import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'

export default function UrlInput() {
  const [inputUrl, setInputUrl] = useState('')
  const { setLoading, setCardData, setError } = useStore()
  const workflowId = process.env.NEXT_PUBLIC_COZE_WORKFLOW_ID;
  const accessToken = process.env.NEXT_PUBLIC_COZE_ACCESS_TOKEN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://api.coze.cn/v1/workflow/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          workflow_id: workflowId,
          parameters: {
            url: inputUrl
          },
        }),
      })

      const data = await response.json()
      
      console.log(data);

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to fetch data')
      }

      const parsedData = JSON.parse(data.data);
      
      setCardData({
        title: parsedData.title,
        quote: parsedData.quote,
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch webpage data')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="url"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter webpage URL"
        className="w-full p-3 border rounded-lg"
        required
      />
      <button 
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Generate Card
      </button>
    </form>
  )
} 