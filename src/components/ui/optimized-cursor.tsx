import { useState, useEffect, useRef, useCallback } from 'react';
import { usePerformance } from '@/hooks/use-performance';
import { CONFIG } from '@/config/constants';

interface OptimizedCursorProps {
  className?: string;
}

const OptimizedCursor = ({ className = '' }: OptimizedCursorProps) => {
  const { isMobile, enableHeavyAnimations } = usePerformance();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const THROTTLE_DELAY = CONFIG.PERFORMANCE.CURSOR_THROTTLE_DELAY; // ~60fps

  const updateCursorPosition = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastUpdateTime.current < THROTTLE_DELAY) {
      return;
    }
    
    lastUpdateTime.current = now;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(() => {
      setCursorPosition({ x, y });
    });
  }, [THROTTLE_DELAY]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    updateCursorPosition(e.clientX, e.clientY);
  }, [updateCursorPosition]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    if (!enableHeavyAnimations) return;

    document.addEventListener('mousemove', handleMouseMove);

    // Add hover listeners to clickable elements
    const clickableElements = document.querySelectorAll('a, button, [role="button"], .clickable');
    const elementArray = Array.from(clickableElements);
    
    elementArray.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      elementArray.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, enableHeavyAnimations]);

  // Don't render cursor on mobile - moved after all hooks
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''} ${className}`}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        transform: `translate(-50%, -50%)`,
      }}
    />
  );
};

export default OptimizedCursor;
