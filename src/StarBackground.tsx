import { useEffect } from 'react';

export default function StarBackground({ isLightMode }: { isLightMode: boolean }) {
  useEffect(() => {
    const container = document.querySelector('.stars') as HTMLElement | null;
    if (!container) return;

    const createElements = () => {
      container.innerHTML = ''; // Clear for swap

      if (isLightMode) {
  // LIGHT MODE: Create subtle drifting clouds
  for (let i = 0; i < 20; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud-blob';
    
    // Randomize position
    cloud.style.left = `${Math.random() * 100}%`;
    cloud.style.top = `${Math.random() * 100}%`;
    
    // Randomize size
    const size = Math.random() * 400 + 250; 
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size}px`;
    
    // Use a slightly darker color so it's visible on white
    // A soft greyish-cyan works best
    cloud.style.backgroundColor = `rgba(0, 200, 255, ${Math.random() * 0.08 + 0.05})`;
    
    // Different float speeds for each cloud
    const duration = Math.random() * 25 + 15;
    const delay = Math.random() * -20;
    cloud.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
    
    container.appendChild(cloud);
  }

  // Dark "dust" particles for texture
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement('div');
    dot.className = 'star'; 
    dot.style.width = '2px';
    dot.style.height = '2px';
    dot.style.background = '#000';
    dot.style.opacity = '0.05';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    container.appendChild(dot);
  }
} else {
        // DARK MODE: Your original star logic
        for (let i = 0; i < 200; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          const size = Math.random() * 2 + 0.8;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.animationDuration = `${Math.random() * 5 + 0.8}s`;
          container.appendChild(star);
        }
      }
    };

    const spawnShootingStar = () => {
      if (isLightMode) return; // No shooting stars in daylight
      const star = document.createElement('span');
      star.className = 'shooting-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * -30 - 20}%`;
      const duration = Math.random() * 3 + 2.5;
      const delay = Math.random() * 4 + 1;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      container.appendChild(star);
      setTimeout(() => star.remove(), (duration + delay) * 1000 + 800);
    };

    createElements();

    const interval = !isLightMode ? setInterval(() => {
      const activeCount = container.querySelectorAll('.shooting-star').length;
      if (activeCount < 2) spawnShootingStar();
    }, 4000) : undefined;

    const handleResize = () => createElements();
    window.addEventListener('resize', handleResize);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLightMode]); // Re-run whenever theme toggles

  return (
    <div 
      className={`
        stars fixed inset-0 pointer-events-none z-[-1] overflow-visible
        transition-colors duration-1000 ease-in-out
        ${isLightMode ? 'bg-neutral-50' : 'bg-neutral-950'}
      `} 
    />
  );
}