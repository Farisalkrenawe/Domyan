import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePerformance } from '@/hooks/use-performance';

interface OptimizedCursorProps {
  className?: string;
}

const OptimizedCursor: React.FC<OptimizedCursorProps> = ({ className = '' }) => {
  const { isMobile, enableHeavyAnimations } = usePerformance();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const THROTTLE_DELAY = 16; // ~60fps

  // Don't render cursor on mobile
  if (isMobile) {
    return null;
  }

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
  }, []);

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
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clickableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, enableHeavyAnimations]);

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
