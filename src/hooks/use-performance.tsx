import { useState, useEffect } from 'react';
import { CONFIG } from '@/config/constants';

interface PerformanceConfig {
  isMobile: boolean;
  isLowEnd: boolean;
  reducedMotion: boolean;
  animationDuration: number;
  enableHeavyAnimations: boolean;
}

export const usePerformance = (): PerformanceConfig => {
  const [config, setConfig] = useState<PerformanceConfig>({
    isMobile: false,
    isLowEnd: false,
    reducedMotion: false,
    animationDuration: CONFIG.PERFORMANCE.ANIMATION_DURATION.DEFAULT,
    enableHeavyAnimations: true,
  });

  useEffect(() => {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= CONFIG.BREAKPOINTS.MOBILE;

    // Detect reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect low-end device (basic heuristic)
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    // Calculate animation duration based on device capabilities
    let animationDuration = CONFIG.PERFORMANCE.ANIMATION_DURATION.DEFAULT;
    if (isMobile || reducedMotion) {
      animationDuration = CONFIG.PERFORMANCE.ANIMATION_DURATION.MOBILE;
    }
    if (isLowEnd) {
      animationDuration = CONFIG.PERFORMANCE.ANIMATION_DURATION.LOW_END;
    }

    // Determine if heavy animations should be enabled
    const enableHeavyAnimations = !isMobile && !isLowEnd && !reducedMotion;

    setConfig({
      isMobile,
      isLowEnd,
      reducedMotion,
      animationDuration,
      enableHeavyAnimations,
    });

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({
        ...prev,
        reducedMotion: e.matches,
        animationDuration: e.matches ? CONFIG.PERFORMANCE.ANIMATION_DURATION.LOW_END : (isMobile ? CONFIG.PERFORMANCE.ANIMATION_DURATION.MOBILE : CONFIG.PERFORMANCE.ANIMATION_DURATION.DEFAULT),
        enableHeavyAnimations: !e.matches && !isMobile && !isLowEnd,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return config;
};
