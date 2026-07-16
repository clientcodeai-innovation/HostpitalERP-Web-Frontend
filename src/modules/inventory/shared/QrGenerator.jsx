import React from 'react';

export default function QrGenerator({ value = 'QR-ITEM-001', size = 100 }) {
  const gridSize = 21; // standard QR Version 1
  
  // Deterministic matrix generation with anchor corners
  const generateMatrix = (text) => {
    // Initialize matrix with 0
    const mat = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    
    // Draw anchor finder patterns (7x7 squares at three corners)
    const drawFinder = (xOffset, yOffset) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const isCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          if (isBorder || isCenter) {
            mat[yOffset + r][xOffset + c] = 1;
          }
        }
      }
    };
    
    drawFinder(0, 0); // Top-Left
    drawFinder(gridSize - 7, 0); // Top-Right
    drawFinder(0, gridSize - 7); // Bottom-Left
    
    // Draw alignment marker (small square on bottom right)
    mat[gridSize - 5][gridSize - 5] = 1;
    
    // Deterministic random bits for the rest of the matrix
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) + hash) + text.charCodeAt(i);
    }
    
    let seed = Math.abs(hash);
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Skip corner finder zones
        const isTopLeft = r < 8 && c < 8;
        const isTopRight = r < 8 && c >= gridSize - 8;
        const isBottomLeft = r >= gridSize - 8 && c < 8;
        
        if (isTopLeft || isTopRight || isBottomLeft) continue;
        
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        if ((seed % 10) < 4) { // density of ~40%
          mat[r][c] = 1;
        }
      }
    }
    
    return mat;
  };

  const matrix = generateMatrix(value);
  const cellSize = size / gridSize;
  const rects = [];

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (matrix[r][c] === 1) {
        rects.push(
          <rect
            key={`${r}-${c}`}
            x={c * cellSize}
            y={r * cellSize}
            width={cellSize + 0.1} // overlap slightly to prevent seam lines
            height={cellSize + 0.1}
            fill="currentColor"
          />
        );
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-2.5 bg-white text-black border border-gray-200 rounded-lg max-w-fit shadow-xs">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="text-gray-900"
      >
        {rects}
      </svg>
      <span className="text-[9px] font-semibold text-gray-500 font-mono mt-1">{value}</span>
    </div>
  );
}
