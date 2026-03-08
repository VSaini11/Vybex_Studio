'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Hook for mobile horizontal auto-slide carousels with synced dot indicators.
 * Handles auto-scrolling every `intervalMs` and syncs activeIndex on manual swipe.
 */
export function useAutoSlide(itemCount: number, intervalMs = 3000) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAutoScrolling = useRef(false);

  // Get only the actual card elements (skip style tags, etc.)
  const getCards = useCallback((): HTMLElement[] => {
    if (!scrollRef.current) return [];
    return Array.from(scrollRef.current.children).filter(
      (child) => child.tagName !== 'STYLE'
    ) as HTMLElement[];
  }, []);

  // Sync dots on manual scroll
  const handleScroll = useCallback(() => {
    if (isAutoScrolling.current) return;
    const container = scrollRef.current;
    if (!container) return;

    const cards = getCards();
    if (cards.length === 0) return;

    const scrollLeft = container.scrollLeft;
    const containerLeft = container.getBoundingClientRect().left;
    let closest = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.getBoundingClientRect().left - containerLeft + card.offsetWidth / 2;
      const containerCenter = container.offsetWidth / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  }, [getCards]);

  // Auto-slide interval
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % itemCount;
        const cards = getCards();
        if (cards[next]) {
          isAutoScrolling.current = true;
          scrollRef.current?.scrollTo({
            left: cards[next].offsetLeft - 16,
            behavior: 'smooth',
          });
          setTimeout(() => {
            isAutoScrolling.current = false;
          }, 600);
        }
        return next;
      });
    }, intervalMs);

    return () => {
      clearInterval(interval);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [itemCount, intervalMs, handleScroll, getCards]);

  return { scrollRef, activeIndex };
}
