import React from 'react';
import { useCounter } from '@/hooks/use-counter';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
  suffix?: string;
  prefix?: string;
  className?: string;
  formatNumber?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  enabled = true,
  suffix = '',
  prefix = '',
  className = '',
  formatNumber = false
}) => {
  const { count, isAnimating } = useCounter({
    end,
    start,
    duration,
    delay,
    enabled
  });

  const formatDisplayValue = (value: number) => {
    if (formatNumber && value >= 1000) {
      return value.toLocaleString();
    }
    return value.toString();
  };

  return (
    <span className={`inline-block ${className}`}>
      {prefix}
      <span 
        className={`transition-all duration-300 ${
          isAnimating 
            ? 'scale-110 text-green-600 drop-shadow-lg' 
            : 'scale-100'
        }`}
      >
        {formatDisplayValue(count)}
      </span>
      {suffix}
    </span>
  );
};
