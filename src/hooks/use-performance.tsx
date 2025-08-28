import { useState, useEffect } from 'react';

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
    animationDuration: 0.8,
    enableHeavyAnimations: true,
  });

  useEffect(() => {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

    // Detect reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect low-end device (basic heuristic)
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    // Calculate animation duration based on device capabilities
    let animationDuration = 0.8;
    if (isMobile || reducedMotion) {
      animationDuration = 0.3;
    }
    if (isLowEnd) {
      animationDuration = 0.2;
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
        animationDuration: e.matches ? 0.2 : (isMobile ? 0.3 : 0.8),
        enableHeavyAnimations: !e.matches && !isMobile && !isLowEnd,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return config;
};
