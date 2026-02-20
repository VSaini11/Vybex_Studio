'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return { ref, isInView };
}
