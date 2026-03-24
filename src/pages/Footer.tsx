interface FooterMotionProps {
isLightMode: boolean;
}
export default function FooterMotion({ isLightMode }: FooterMotionProps) {
  const items = "SAHIL DUBEY  FULL STACK DEVELOPER  PRAYAGRAJ, INDIA".split("  ");
  
  // We double the array so the end of the first list 
  // matches the start of the second list perfectly.
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative z-10 w-[120vw] -left-[10vw] overflow-hidde py-6 md:py-6  transform-gpu select-none  border-black ${
              isLightMode ? '  bg-neutral-300 ' : 'bg-neutral-400'  
            }` }>
      <div className="marquee-wrapper">
        {repeated.map((item, index) => (
          <div
            key={index}
            className={`marquee-item text-4xl font-extrabold font-sans uppercase   ${
              isLightMode ? '  text-neutral-800 ' : 'text-neutral-700'  
            }`}
          >
            {/* The Word */}
            <span className="px-4">{item}</span>
            
            {/* The Separator (Asterisk) */}
            <span className={` text-4xl font-sans ${isLightMode ? 'text-neutral-800  ' : 'text-neutral-700' }`}>
              *
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}