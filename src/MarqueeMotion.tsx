export default function MarqueeMotion() {
  const items = "TOOLS REACT TYPESCRIPT NEXT.JS TAILWIND FRAMER MOTION NODE.JS GIT VITE".split(" ");
  const repeated = [...items, ...items, ...items];

  return (
    /* 1. Added 'relative' and 'z-10' to keep it above background */
    /* 2. Added '-rotate-2' (or -3) to get the tilt */
    /* 3. Added 'scale-105' or 'w-[110vw]' and '-left-[5vw]' to hide the edges */
    <div className="relative z-10 w-[110vw] -left-[5vw] overflow-hidden bg-blue-400 py-5 md:py-9 -rotate-2 transform-gpu">
      <div
        className="
          inline-flex whitespace-nowrap 
          text-4xl md:text-7xl lg:text-8xl font-extrabold
          uppercase tracking-tight
          text-black
          animate-marquee
        "
        style={{ fontFamily: 'sans-serif' }}
      >
        {repeated.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center shrink-0"
          >
            {item}
            <span className="mx-8 text-black">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}