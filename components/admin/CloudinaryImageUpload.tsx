"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CloudinaryImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
  maxSize?: number;
  allowPasteUrl?: boolean;
}

export function CloudinaryImageUpload({
  value,
  onChange,
  placeholder = "Upload to Cloudinary or paste URL",
  className = "",
  maxSize = 10,
  allowPasteUrl = true,
}: CloudinaryImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [useUrl, setUseUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/upload/cloudinary", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 503) {
          toast.error(allowPasteUrl ? "Cloudinary not configured. Paste image URL instead." : "Cloudinary not configured.");
          if (allowPasteUrl) setUseUrl(true);
          return;
        }
        throw new Error(data.error || "Upload failed");
      }
      if (data.url) {
        onChange(data.url);
        toast.success("Image uploaded to Cloudinary");
      } else {
        throw new Error("No URL returned");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to upload");
    } finally {
      setIsUploading(false);
    }
  };

  const showUrlMode = allowPasteUrl && useUrl;

  return (
    <div className={className}>
      {!showUrlMode ? (
        <div className="space-y-2">
          {!value && (
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileSelect(f);
                  e.target.value = "";
                }}
              />
              {isUploading ? (
                <Loader2 className="h-10 w-10 mx-auto animate-spin text-muted-foreground" />
              ) : (
                <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
              )}
              <p className="text-sm text-muted-foreground mt-2">{placeholder}</p>
              {allowPasteUrl && (
                <Button type="button" variant="link" size="sm" onClick={(e) => { e.stopPropagation(); setUseUrl(true); }}>
                  Or paste image URL
                </Button>
              )}
            </div>
          )}
          {value && (
            <div className="flex items-center gap-2">
              <img src={value} alt="Preview" className="h-20 w-20 object-cover rounded border" />
              <Button type="button" variant="outline" size="sm" onClick={() => onChange("")}>
                Remove
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <Label>Image URL (e.g. Cloudinary link)</Label>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
          />
          <Button type="button" variant="link" size="sm" onClick={() => setUseUrl(false)}>
            Upload file instead
          </Button>
        </div>
      )}
    </div>
  );
}
