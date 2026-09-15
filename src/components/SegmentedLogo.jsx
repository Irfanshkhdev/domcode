import React from 'react';
import { motion } from 'framer-motion';

/**
 * DomCodeLogo / SegmentedLogo
 * - Parallel SVG maskUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="200".
 * - Accepts strokeColor prop (default "#27272A" for stealth homepage eclipse, "#FFFFFF" for preloader).
 */
export default function DomCodeLogo({ 
  size = 1000, 
  rotation = 0,
  strokeColor = "#27272A",
  className = ""
}) {
  const gap = 7;     // Exact uniform thickness of the parallel cuts
  const r = 34;      // Center radius of the donut
  const sw = 24;     // Thickness of the donut ring

  const Segment = ({ index, rotation: segRotation }) => {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ transform: `rotate(${segRotation}deg)` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            <mask 
              id={`mask-segment-${index}`}
              maskUnits="userSpaceOnUse"
              x="-50"
              y="-50"
              width="200"
              height="200"
            >
              <rect x="-50" y="-50" width="200" height="200" fill="black" />
              {/* 120-degree white wedge */}
              <polygon points="50,50 -123.2,-50 223.2,-50" fill="white" />
              
              {/* Parallel black cut lines */}
              <line x1="50" y1="50" x2="-123.2" y2="-50" stroke="black" strokeWidth={gap} />
              <line x1="50" y1="50" x2="223.2" y2="-50" stroke="black" strokeWidth={gap} />
            </mask>
          </defs>
          <circle 
            cx="50" 
            cy="50" 
            r={r} 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth={sw} 
            mask={`url(#mask-segment-${index})`} 
          />
        </svg>
      </div>
    );
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`} 
      style={{ width: size, height: size }}
    >
      <motion.div
        className="w-full h-full relative flex items-center justify-center"
        style={{ rotate: rotation }}
      >
        <Segment index={0} rotation={0} />     {/* Top */}
        <Segment index={1} rotation={120} />   {/* Bottom Right */}
        <Segment index={2} rotation={240} />   {/* Bottom Left */}
      </motion.div>
    </div>
  );
}
