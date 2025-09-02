'use client';
import { useEffect } from 'react';
import { initCountUp } from '@/utils/countup';

export default function CountUpInit() {
  useEffect(() => { initCountUp(); }, []);
  return null;
}
