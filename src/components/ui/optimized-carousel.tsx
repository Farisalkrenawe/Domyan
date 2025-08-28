import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePerformance } from '@/hooks/use-performance';
import LazyImage from './lazy-image';

interface OptimizedCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  className?: string;
}

const OptimizedCarousel: React.FC<OptimizedCarouselProps> = ({
  images,
  autoPlay = true,
  interval = 10000,
  showControls = true,
  showIndicators = true,
  className = '',
}) => {
  const { isMobile, animationDuration, enableHeavyAnimations } = usePerformance();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Memoize images to prevent unnecessary re-renders
  const memoizedImages = useMemo(() => images, [images]);

  // Optimized slide navigation
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setSlideProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % memoizedImages.length);
    setSlideProgress(0);
    startTimeRef.current = Date.now();
  }, [memoizedImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + memoizedImages.length) % memoizedImages.length);
    setSlideProgress(0);
    startTimeRef.current = Date.now();
  }, [memoizedImages.length]);

  // Progress bar animation
  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min((elapsed / interval) * 100, 100);
    
    setSlideProgress(progress);
    
    if (progress >= 100) {
      nextSlide();
    }
  }, [interval, nextSlide]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isPaused || !enableHeavyAnimations) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
      return;
    }

    // Progress bar update (more frequent for smooth animation)
    progressRef.current = setInterval(updateProgress, 50);
    
    // Slide change interval
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
    };
  }, [autoPlay, isPaused, interval, nextSlide, updateProgress, enableHeavyAnimations]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
    };
  }, []);

  // Pause on hover (only on desktop)
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsPaused(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsPaused(false);
    }
  }, [isMobile]);

  // Touch/swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  if (!memoizedImages.length) return null;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration }}
          className="absolute inset-0"
        >
          <LazyImage
            src={memoizedImages[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
            priority={currentSlide === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Progress Indicators */}
      {showIndicators && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 w-full max-w-xs px-4 z-20">
          {memoizedImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer group min-w-8 max-w-16"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="absolute inset-0 bg-white/30 rounded-full" />
              <div
                className={`absolute inset-0 bg-white rounded-full transition-all duration-100 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-60'
                }`}
                style={{
                  width: index === currentSlide 
                    ? `${slideProgress}%` 
                    : index < currentSlide 
                      ? '100%' 
                      : '0%',
                  transition: index === currentSlide 
                    ? 'none' 
                    : 'width 300ms ease-in-out'
                }}
              />
              <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptimizedCarousel;
