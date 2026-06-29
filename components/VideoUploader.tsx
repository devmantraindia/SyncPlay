'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Film, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoUploaderProps {
  onVideoSelect: (file: File) => void
}

export default function VideoUploader({ onVideoSelect }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string>('')

  const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/mkv']
  const maxSize = 500 * 1024 * 1024 // 500MB

  const validateFile = (file: File): boolean => {
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid video file (MP4, WebM, OGG, MKV)')
      return false
    }
    if (file.size > maxSize) {
      setError('File size must be less than 500MB')
      return false
    }
    setError('')
    return true
  }

  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      onVideoSelect(file)
    }
  }, [onVideoSelect])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer',
          isDragging
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-white/20 hover:border-white/40 bg-white/5'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileSelect(file)
          }}
          className="hidden"
          id="video-upload"
        />
        
        <label
          htmlFor="video-upload"
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          {isDragging ? (
            <Film className="w-16 h-16 text-purple-400" />
          ) : (
            <Upload className="w-16 h-16 text-white/40" />
          )}
          
          <div>
            <p className="text-lg font-semibold mb-2">
              {isDragging ? 'Drop your video here' : 'Choose a video file'}
            </p>
            <p className="text-sm text-white/40">
              or drag and drop it here
            </p>
          </div>

          <div className="text-xs text-white/30 mt-2">
            Supports MP4, WebM, OGG, MKV (up to 500MB)
          </div>
        </label>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  )
}
