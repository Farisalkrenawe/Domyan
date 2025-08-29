import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
}

export const useCounter = ({ 
  end, 
  start = 0, 
  duration = 2000, 
  delay = 0,
  enabled = true 
}: UseCounterProps) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const [key, setKey] = useState(0); // For restarting animation

  useEffect(() => {
    if (!enabled) {
      setCount(end);
      return;
    }

    const startAnimation = () => {
      setIsAnimating(true);
      startTimeRef.current = Date.now();
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - (startTimeRef.current || 0);
        const progress = Math.min(elapsed / duration, 1);
        
        // Simple linear interpolation for smooth counting
        const currentCount = Math.floor(start + (end - start) * progress);
        
        // Ensure we're actually counting up
        if (currentCount !== count) {
          console.log(`Counter: ${currentCount} (progress: ${progress.toFixed(2)})`);
          setCount(currentCount);
        }
        
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setCount(end);
          setIsAnimating(false);
        }
      };
      
      frameRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);
    
    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, start, duration, delay, enabled, key]);

  const restart = useCallback(() => {
    setKey(prev => prev + 1);
    setCount(start);
  }, [start]);

  return { count, isAnimating, restart };
};
