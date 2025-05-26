"use client"

import type * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, Download, Share2, Sparkles } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Screenshot {
  id: string
  title: string
  year: number
  image: string
  description: string
  category: string
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeYear: number
  screenshots: Screenshot[]
}

export function AppSidebar({ activeYear, screenshots, ...props }: AppSidebarProps) {
  const [selectedImage, setSelectedImage] = useState<Screenshot | null>(null)

  const filteredScreenshots = screenshots.filter((screenshot) => screenshot.year === activeYear)
  const allScreenshots = screenshots

  return (
    <>
      <Sidebar {...props} className="border-r border-[#3D1A78]/10 w-[320px]">
        <SidebarHeader className="border-b border-[#3D1A78]/10 p-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#3D1A78]/10 to-[#E67E22]/10 text-[#3D1A78] text-sm font-medium border border-[#3D1A78]/20"
            >
              <Sparkles className="w-4 h-4 mr-2 text-[#E67E22]" />
              Our History
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-[#3D1A78] leading-tight"
            >
              <span className="relative">
                Our Journey
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[#E67E22] via-[#E67E22]/80 to-[#3D1A78] rounded-full"
                ></motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#3D1A78]/70 text-sm leading-relaxed"
            >
              Explore our company's remarkable evolution through the years. Each milestone represents our commitment
              to excellence and innovation.
            </motion.p>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[#3D1A78] font-semibold mb-4">
              {activeYear} Screenshots ({filteredScreenshots.length})
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3">
                {filteredScreenshots.length > 0 ? (
                  filteredScreenshots.map((screenshot) => (
                    <motion.div
                      key={screenshot.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedImage(screenshot)}
                    >
                      <div className="relative overflow-hidden rounded-lg border border-[#3D1A78]/10 hover:border-[#3D1A78]/30 transition-all duration-300">
                        <div className="aspect-video bg-gradient-to-br from-[#3D1A78]/5 to-[#E67E22]/5 relative">
                          <img
                            src={screenshot.image || "/placeholder.svg"}
                            alt={screenshot.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-[#3D1A78] text-sm mb-1 line-clamp-1">{screenshot.title}</h4>
                          <p className="text-xs text-[#3D1A78]/60 line-clamp-2">{screenshot.description}</p>
                          <Badge variant="secondary" className="mt-2 text-xs bg-[#E67E22]/10 text-[#E67E22]">
                            {screenshot.category}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#3D1A78]/10 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-[#3D1A78]/40" />
                    </div>
                    <p className="text-[#3D1A78]/60 text-sm">No screenshots available for {activeYear}</p>
                  </div>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          {allScreenshots.length > filteredScreenshots.length && (
            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-[#3D1A78]/60 font-medium mb-3">Recent Gallery</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="grid grid-cols-2 gap-2">
                  {allScreenshots.slice(0, 4).map((screenshot) => (
                    <motion.div
                      key={`recent-${screenshot.id}`}
                      className="aspect-square rounded-md overflow-hidden border border-[#3D1A78]/10 cursor-pointer hover:border-[#3D1A78]/30 transition-colors"
                      onClick={() => setSelectedImage(screenshot)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={screenshot.image || "/placeholder.svg"}
                        alt={screenshot.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
      </Sidebar>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div>
                  <h3 className="font-bold text-[#3D1A78]">{selectedImage.title}</h3>
                  <p className="text-sm text-[#3D1A78]/60">
                    {selectedImage.year} • {selectedImage.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="hover:text-[#E67E22]">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-[#E67E22]">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedImage(null)} className="hover:text-[#E67E22]">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full max-h-[60vh] object-contain rounded-lg"
                />
                <p className="mt-4 text-[#3D1A78]/80">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
