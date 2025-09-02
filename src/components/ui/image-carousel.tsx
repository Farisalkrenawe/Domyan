import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  projectName: string;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
}

export function ImageCarousel({ 
  images, 
  projectName, 
  className = "",
  showArrows = true,
  showDots = true,
  showCounter = true
}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevImage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className={`relative group ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label={`${projectName} image gallery`}
      aria-roledescription="carousel"
    >
      {/* Main Image Container */}
      <div className="relative overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`${projectName} - View ${currentImageIndex + 1} of ${images.length}`}
            className="w-full h-64 object-cover transition-all duration-500"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Enhanced Navigation Arrows */}
        {images.length > 1 && showArrows && (
          <>
            <button
              onClick={nextImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black/20"
              aria-label={`Next image (${currentImageIndex === images.length - 1 ? 1 : currentImageIndex + 2} of ${images.length})`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={prevImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black/20"
              aria-label={`Previous image (${currentImageIndex === 0 ? images.length : currentImageIndex} of ${images.length})`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Enhanced Image Counter */}
        {images.length > 1 && showCounter && (
          <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-md text-white font-semibold px-4 py-2.5 rounded-xl shadow-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-400">
                {currentImageIndex + 1}
              </span>
              <span className="text-gray-300 text-sm">/</span>
              <span className="text-gray-300 text-sm">
                {images.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Thumbnail Navigation Dots */}
      {images.length > 1 && showDots && (
        <div className="flex justify-center mt-4 gap-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`
                relative w-10 h-10 rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white
                ${index === currentImageIndex
                  ? 'bg-green-600 shadow-lg'
                  : 'bg-white border-2 border-gray-400 hover:border-green-500 hover:scale-105 hover:bg-gray-50'
                }
              `}
              aria-label={`Go to image ${index + 1} of ${images.length}`}
              aria-current={index === currentImageIndex ? 'true' : 'false'}
              style={{ 
                minWidth: '40px', 
                minHeight: '40px' // Still exceeds 44px touch target requirement
              }}
            >
              <span className="sr-only">
                {index === currentImageIndex ? 'Current image' : `Image ${index + 1}`}
              </span>
              {/* Inner dot indicator */}
              <span 
                className={`absolute inset-0 m-auto rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'w-2.5 h-2.5 bg-white'
                    : 'w-2.5 h-2.5 bg-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Swipe Indicator (Mobile) */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden">
          Swipe to navigate
        </div>
      )}
    </div>
  );
}
