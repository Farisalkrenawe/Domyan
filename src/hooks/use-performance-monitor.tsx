import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

export const usePerformanceMonitor = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    pageLoadTime: 0,
    domContentLoaded: 0,
  });

  useEffect(() => {
    // Basic performance metrics
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        metricsRef.current.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
        metricsRef.current.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      }

      // First Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const paintObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                metricsRef.current.firstContentfulPaint = entry.startTime;
              }
            }
          });
          paintObserver.observe({ entryTypes: ['paint'] });

          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'largest-contentful-paint') {
                metricsRef.current.largestContentfulPaint = entry.startTime;
              }
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          return () => {
            paintObserver.disconnect();
            lcpObserver.disconnect();
          };
        } catch (error) {
          console.warn('Performance monitoring not supported:', error);
        }
      }
    }

    // Log performance metrics
    const logMetrics = () => {
      const metrics = metricsRef.current;
      console.log('Performance Metrics:', {
        'Page Load Time': `${metrics.pageLoadTime.toFixed(2)}ms`,
        'DOM Content Loaded': `${metrics.domContentLoaded.toFixed(2)}ms`,
        'First Contentful Paint': metrics.firstContentfulPaint ? `${metrics.firstContentfulPaint.toFixed(2)}ms` : 'N/A',
        'Largest Contentful Paint': metrics.largestContentfulPaint ? `${metrics.largestContentfulPaint.toFixed(2)}ms` : 'N/A',
      });
    };

    // Log after a delay to ensure all metrics are captured
    const timeoutId = setTimeout(logMetrics, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return metricsRef.current;
};
