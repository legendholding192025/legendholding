import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { wrap } from "popmotion"

interface Category {
  title: string;
  description: string;
  image: string;
}

interface CategoryCarouselProps {
  categories: Category[][];
}

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 100 : -100,
    opacity: 0
  }),
  center: {
    y: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    y: direction < 0 ? 100 : -100,
    opacity: 0
  })
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  // Flatten and restructure categories into rows of 4
  const flatCategories = categories.flat();
  const categoryRows = flatCategories.reduce<Category[][]>((rows, item, index) => {
    if (index % 4 === 0) {
      rows.push([item]);
    } else {
      rows[rows.length - 1].push(item);
    }
    return rows;
  }, []);

  const [[page, direction], setPage] = useState([0, 0])
  const rowIndex = wrap(0, categoryRows.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  // Auto-advance the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [page])

  return (
    <div className="relative mt-12">
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categoryRows[rowIndex].map((category: Category, index: number) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-[240px] rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B1C48]/80 to-[#2B1C48]/20 group-hover:from-[#2B1C48]/70 group-hover:to-[#2B1C48]/10 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#EE8900] transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-2 group-hover:text-white transition-colors duration-300">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 -left-4 -right-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="p-3 rounded-full bg-white hover:bg-[#2B1C48] hover:text-white shadow-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6 transform rotate-180" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="p-3 rounded-full bg-white hover:bg-[#2B1C48] hover:text-white shadow-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {categoryRows.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newDirection = index > rowIndex ? 1 : -1
              setPage([index, newDirection])
            }}
            className="group relative h-2 rounded-full overflow-hidden bg-gray-300 hover:bg-gray-400 transition-colors"
            style={{
              width: rowIndex === index ? '2rem' : '0.5rem'
            }}
          >
            {rowIndex === index && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className="absolute inset-0 bg-[#2B1C48]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Current/Total Indicator */}
      <div className="text-center mt-4 text-gray-400">
        <span className="font-medium text-white">{rowIndex + 1}</span>
        <span className="mx-1">/</span>
        <span>{categoryRows.length}</span>
      </div>
    </div>
  )
} 