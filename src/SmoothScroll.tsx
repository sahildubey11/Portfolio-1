import { useEffect } from 'react';
import Lenis from 'lenis'; // Updated import

export const useSmoothScroll = () => {
  useEffect(() => {
    // Updated property names for the latest Lenis version
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical', // Changed from 'direction'
      gestureOrientation: 'vertical', // Changed from 'gestureDirection'
      smoothWheel: true, // Changed from 'smooth'
      wheelMultiplier: 1, // Changed from 'mouseMultiplier'
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};