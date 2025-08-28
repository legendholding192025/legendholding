"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onRemove?: () => void
  placeholder?: string
  className?: string
  showPreview?: boolean
  accept?: string
  maxSize?: number // in MB
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  placeholder = "Upload an image",
  className = "",
  showPreview = true,
  accept = "image/*",
  maxSize = 10 // 10MB default
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file")
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return
    }

    await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      // Upload to the CDN endpoint
      const response = await fetch('https://cdn.legendholding.com/upload.php', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.success && result.url) {
        onChange(result.url)
        toast.success("Image uploaded successfully!")
      } else {
        throw new Error(result.message || "Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleRemove = () => {
    onChange("")
    if (onRemove) {
      onRemove()
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload area */}
      {!value ? (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200 ease-in-out
            ${dragActive 
              ? 'border-[#5E366D] bg-[#5E366D]/5' 
              : 'border-gray-300 hover:border-[#5E366D] hover:bg-gray-50'
            }
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {isUploading ? (
            <div className="space-y-3">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#5E366D]" />
              <p className="text-sm text-gray-600">Uploading image...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {placeholder}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF up to {maxSize}MB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Image preview */
        <div className="space-y-3">
          {showPreview && (
            <div className="relative group">
              <img
                src={value}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg border"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">{value}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClick}
              className="ml-auto"
            >
              Change Image
            </Button>
          </div>
        </div>
      )}

      {/* Error handling */}
      {!value && (
        <p className="text-xs text-gray-500">
          Supported formats: JPG, PNG, GIF, WebP. Max size: {maxSize}MB
        </p>
      )}
    </div>
  )
}
