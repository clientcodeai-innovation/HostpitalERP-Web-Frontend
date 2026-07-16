import React from 'react';

export default function BarcodeGenerator({ value = 'ITEM-001', width = 2, height = 50 }) {
  // Simple code-39 / code-128 pseudo encoder
  // Generates a deterministic sequence of bars (0 = thin space, 1 = thin bar, 2 = thick space, 3 = thick bar)
  const generatePattern = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Deterministic seed sequence based on hash
    const sequence = [];
    let seed = Math.abs(hash);
    for (let i = 0; i < 40; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      const bit = seed % 4;
      sequence.push(bit);
    }
    
    // Add start and stop guards
    return [3, 0, 1, 0, ...sequence, 0, 1, 0, 3];
  };

  const pattern = generatePattern(value);
  
  let currentX = 10;
  const bars = [];
  
  pattern.forEach((type, index) => {
    const isBar = index % 2 === 0;
    const thickness = (type % 2 === 0 ? 1.5 : 3.5) * width;
    
    if (isBar) {
      bars.push(
        <rect
          key={index}
          x={currentX}
          y={5}
          width={thickness}
          height={height}
          fill="currentColor"
        />
      );
    }
    currentX += thickness;
  });

  const totalWidth = currentX + 10;

  return (
    <div className="flex flex-col items-center p-2 bg-white text-black border border-gray-200 rounded-lg max-w-fit shadow-xs">
      <svg
        width={totalWidth}
        height={height + 25}
        viewBox={`0 0 ${totalWidth} ${height + 25}`}
        className="text-gray-900"
      >
        {bars}
        <text
          x={totalWidth / 2}
          y={height + 18}
          textAnchor="middle"
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          fill="currentColor"
        >
          {value}
        </text>
      </svg>
    </div>
  );
}
