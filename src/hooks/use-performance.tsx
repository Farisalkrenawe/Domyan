import { useState, useEffect, useCallback } from 'react';
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

  const updateConfig = useCallback(() => {
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
  }, []);

  useEffect(() => {
    // Initial config update
    updateConfig();

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      updateConfig();
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Listen for window resize
    const handleResize = () => {
      updateConfig();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateConfig]);

  return config;
};
