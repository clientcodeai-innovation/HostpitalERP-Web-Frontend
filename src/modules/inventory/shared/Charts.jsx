import React, { useState } from 'react';

// Custom SVG Line Chart
export function LineChart({
  data = [], // [{ label: 'Jan', value: 30 }]
  height = 200,
  strokeColor = '#3b82f6',
  areaColor = 'rgba(59, 130, 246, 0.1)',
  gridColor = 'rgba(156, 163, 175, 0.15)',
  yAxisLabel = 'Value'
}) {
  const [activePoint, setActivePoint] = useState(null);

  if (data.length === 0) return <div className="h-full flex items-center justify-center text-xs text-muted-foreground">No data available</div>;

  const padding = { top: 20, right: 20, bottom: 30, left: 45 };
  const width = 500;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map(d => d.value);
  const maxValue = Math.max(...values, 100) * 1.1; // pad max value slightly
  const minValue = 0;

  const points = data.map((d, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const ratio = (d.value - minValue) / (maxValue - minValue);
    const y = padding.top + chartHeight - ratio * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  // Construct SVG Path
  let pathD = '';
  let areaD = '';
  
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
    areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;
  }

  // Y-axis gridline counts
  const yTicks = 4;
  const gridLines = Array.from({ length: yTicks }).map((_, i) => {
    const val = minValue + (maxValue - minValue) * (i / (yTicks - 1));
    const ratio = (val - minValue) / (maxValue - minValue);
    const y = padding.top + chartHeight - ratio * chartHeight;
    return { y, label: Math.round(val) };
  });

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-foreground select-none overflow-visible">
        {/* Gradients */}
        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
            <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={line.y}
              x2={width - padding.right}
              y2={line.y}
              stroke={gridColor}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={line.y + 4}
              textAnchor="end"
              fontSize="9"
              className="fill-muted-foreground font-semibold font-mono"
            >
              {line.label}
            </text>
          </g>
        ))}

        {/* Chart Area */}
        <path d={areaD} fill="url(#lineAreaGrad)" />

        {/* Chart Path Line */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover Points & Circles */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={activePoint?.index === i ? 5.5 : 3.5}
              className={`${
                activePoint?.index === i ? 'fill-primary stroke-white stroke-2 shadow-xs' : 'fill-white stroke-primary stroke-2'
              } cursor-pointer transition-all duration-150`}
              onMouseEnter={() => setActivePoint({ ...p, index: i })}
              onMouseLeave={() => setActivePoint(null)}
            />
            {/* Transparent larger circle for easier hover */}
            <circle
              cx={p.x}
              cy={p.y}
              r="15"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setActivePoint({ ...p, index: i })}
              onMouseLeave={() => setActivePoint(null)}
            />
          </g>
        ))}

        {/* X Axis Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={padding.top + chartHeight + 18}
            textAnchor="middle"
            fontSize="9"
            className="fill-muted-foreground font-semibold"
          >
            {p.label}
          </text>
        ))}
      </svg>

      {/* Tooltip Overlay */}
      {activePoint && (
        <div
          className="absolute z-10 bg-card border border-border text-foreground text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 animate-in fade-in zoom-in-95"
          style={{
            left: `${(activePoint.x / width) * 100}%`,
            top: `${(activePoint.y / height) * 100 - 4}%`
          }}
        >
          <div className="font-semibold text-muted-foreground">{activePoint.label}</div>
          <div className="text-primary mt-0.5">{yAxisLabel}: {activePoint.value}</div>
        </div>
      )}
    </div>
  );
}

// Custom SVG Bar Chart
export function BarChart({
  data = [], // [{ label: 'Jan', value: 30 }]
  height = 200,
  barColor = '#10b981',
  gridColor = 'rgba(156, 163, 175, 0.15)',
  yAxisLabel = 'Qty'
}) {
  const [activeBar, setActiveBar] = useState(null);

  if (data.length === 0) return <div className="h-full flex items-center justify-center text-xs text-muted-foreground">No data available</div>;

  const padding = { top: 20, right: 15, bottom: 30, left: 45 };
  const width = 500;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map(d => d.value);
  const maxValue = Math.max(...values, 100) * 1.1;
  const minValue = 0;

  const barWidth = (chartWidth / data.length) * 0.6;
  const spacing = (chartWidth / data.length) * 0.4;

  const yTicks = 4;
  const gridLines = Array.from({ length: yTicks }).map((_, i) => {
    const val = minValue + (maxValue - minValue) * (i / (yTicks - 1));
    const ratio = (val - minValue) / (maxValue - minValue);
    const y = padding.top + chartHeight - ratio * chartHeight;
    return { y, label: Math.round(val) };
  });

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-foreground select-none overflow-visible">
        {/* Grid lines */}
        {gridLines.map((line, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={line.y}
              x2={width - padding.right}
              y2={line.y}
              stroke={gridColor}
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={line.y + 4}
              textAnchor="end"
              fontSize="9"
              className="fill-muted-foreground font-semibold font-mono"
            >
              {line.label}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, index) => {
          const ratio = (d.value - minValue) / (maxValue - minValue);
          const barHeight = ratio * chartHeight;
          const x = padding.left + spacing / 2 + index * (barWidth + spacing);
          const y = padding.top + chartHeight - barHeight;

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, 2)} // ensure at least 2px height
                rx="3"
                ry="3"
                fill={activeBar?.index === index ? 'var(--color-primary, #3b82f6)' : barColor}
                className="transition-colors duration-150 cursor-pointer opacity-90 hover:opacity-100"
                onMouseEnter={() => setActiveBar({ ...d, x: x + barWidth / 2, y, index })}
                onMouseLeave={() => setActiveBar(null)}
              />
              <text
                x={x + barWidth / 2}
                y={padding.top + chartHeight + 18}
                textAnchor="middle"
                fontSize="9"
                className="fill-muted-foreground font-semibold"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip Overlay */}
      {activeBar && (
        <div
          className="absolute z-10 bg-card border border-border text-foreground text-[10px] font-bold px-2 py-1 rounded shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 animate-in fade-in zoom-in-95"
          style={{
            left: `${(activeBar.x / width) * 100}%`,
            top: `${(activeBar.y / height) * 100 - 4}%`
          }}
        >
          <div className="font-semibold text-muted-foreground">{activeBar.label}</div>
          <div className="text-emerald-500 mt-0.5">{yAxisLabel}: {activeBar.value}</div>
        </div>
      )}
    </div>
  );
}

// Custom SVG Donut Chart
export function DonutChart({
  data = [], // [{ label: 'A', value: 30, color: '#ff0000' }]
  size = 180
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  
  if (data.length === 0) return <div className="h-full flex items-center justify-center text-xs text-muted-foreground">No data available</div>;

  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let currentAngle = -Math.PI / 2; // Start from top

  const segments = data.map((d, index) => {
    const angle = (d.value / total) * 360;
    const percent = ((d.value / total) * 100).toFixed(1);
    
    // Calculate SVG Stroke settings
    const strokeDash = (d.value / total) * circumference;
    const strokeOffset = circumference - strokeDash;

    // Calculate rotation angle
    const rotation = (currentAngle * 180) / Math.PI + 90;
    currentAngle += (angle * Math.PI) / 180;

    return {
      ...d,
      percent,
      strokeDash,
      strokeOffset,
      rotation,
      index
    };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center w-full">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible select-none">
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={seg.color || '#ddd'}
              strokeWidth={hoverIndex === i ? strokeWidth + 2 : strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={seg.strokeOffset}
              transform={`rotate(${seg.rotation} ${center} ${center})`}
              className="transition-all duration-200 cursor-pointer"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {hoverIndex !== null ? (
            <>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{segments[hoverIndex].label}</span>
              <span className="text-base font-extrabold text-foreground">{segments[hoverIndex].value}</span>
              <span className="text-[9px] font-semibold text-muted-foreground">{segments[hoverIndex].percent}%</span>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Total Value</span>
              <span className="text-lg font-extrabold text-foreground">{total.toLocaleString()}</span>
              <span className="text-[9px] font-semibold text-muted-foreground">{data.length} Groups</span>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-1.5 shrink-0 max-w-[200px]">
        {segments.map((seg, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-2 py-0.5 rounded-md text-xs transition-colors cursor-pointer ${
              hoverIndex === i ? 'bg-muted/50 font-bold' : 'font-medium text-muted-foreground'
            }`}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="truncate max-w-[90px]">{seg.label}</span>
            <span className="ml-auto font-mono text-[10px]">{seg.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
