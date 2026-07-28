"use client";

import { useMemo, useRef, useState } from "react";
import { RATING_MAX, RATING_MIN } from "@/lib/types";
import { TrendPoint } from "@/lib/stats";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/cn";

/**
 * Single-series line chart for one check-in metric over time.
 *
 * Single series by design: each metric gets its own panel rather than seven
 * lines sharing an axis. That keeps identity out of the colour channel
 * entirely, so no categorical palette is involved and no legend is needed —
 * the panel title names the series.
 *
 * Includes a hover/focus crosshair with a tooltip, and is keyboard navigable
 * with the arrow keys.
 */
export function TrendChart({
  points,
  label,
  height = 132,
  className,
}: {
  points: TrendPoint[];
  label: string;
  height?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // A fixed viewBox keeps the geometry simple; the SVG scales to its container.
  const width = 320;
  const padding = { top: 10, right: 10, bottom: 18, left: 26 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const scaleX = (index: number) =>
    points.length <= 1
      ? padding.left + plotWidth / 2
      : padding.left + (index / (points.length - 1)) * plotWidth;

  const scaleY = (value: number) =>
    padding.top +
    plotHeight -
    ((value - RATING_MIN) / (RATING_MAX - RATING_MIN)) * plotHeight;

  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points
      .map((point, index) => `${index === 0 ? "M" : "L"}${scaleX(index)} ${scaleY(point.value)}`)
      .join(" ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, height]);

  const areaPath = useMemo(() => {
    if (points.length < 2) return "";
    const baseline = padding.top + plotHeight;
    return `${linePath} L${scaleX(points.length - 1)} ${baseline} L${scaleX(0)} ${baseline} Z`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linePath, points, height]);

  const handlePointer = (event: React.PointerEvent<SVGSVGElement>) => {
    if (points.length === 0) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Map client x back into viewBox space before searching for the nearest point.
    const x = ((event.clientX - rect.left) / rect.width) * width;
    const ratio = (x - padding.left) / plotWidth;
    const index = Math.round(ratio * Math.max(points.length - 1, 1));
    setActiveIndex(Math.min(Math.max(index, 0), points.length - 1));
  };

  const handleKey = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (points.length === 0) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      setActiveIndex((current) => {
        const next = (current ?? -1) + delta;
        return Math.min(Math.max(next, 0), points.length - 1);
      });
    } else if (event.key === "Escape") {
      setActiveIndex(null);
    }
  };

  const active = activeIndex === null ? null : points[activeIndex];
  const summary =
    points.length === 0
      ? `${label}: no readings yet.`
      : `${label} over ${points.length} check-ins, from ${points[0].value} to ${
          points[points.length - 1].value
        } out of ${RATING_MAX}.`;

  return (
    <div className={cn("relative", className)}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full touch-none"
        style={{ height }}
        role="img"
        aria-label={summary}
        tabIndex={0}
        onPointerMove={handlePointer}
        onPointerLeave={() => setActiveIndex(null)}
        onKeyDown={handleKey}
        onBlur={() => setActiveIndex(null)}
      >
        {/* Recessive gridlines at the two anchors and the midpoint. */}
        {[RATING_MIN, RATING_MAX / 2, RATING_MAX].map((value) => (
          <g key={value}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={scaleY(value)}
              y2={scaleY(value)}
              stroke="var(--chart-grid)"
              strokeWidth={1}
            />
            <text
              x={padding.left - 6}
              y={scaleY(value)}
              textAnchor="end"
              dominantBaseline="middle"
              fill="var(--chart-axis)"
              fontSize={9}
            >
              {value}
            </text>
          </g>
        ))}

        {areaPath ? <path d={areaPath} fill="var(--chart-mark)" opacity={0.1} /> : null}

        {linePath ? (
          <path
            d={linePath}
            fill="none"
            stroke="var(--chart-mark)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {/* A lone reading has no line to draw, so it gets a visible marker. */}
        {points.length === 1 ? (
          <circle
            cx={scaleX(0)}
            cy={scaleY(points[0].value)}
            r={4}
            fill="var(--chart-mark)"
            stroke="var(--surface)"
            strokeWidth={2}
          />
        ) : null}

        {active && activeIndex !== null ? (
          <g>
            <line
              x1={scaleX(activeIndex)}
              x2={scaleX(activeIndex)}
              y1={padding.top}
              y2={padding.top + plotHeight}
              stroke="var(--chart-axis)"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle
              cx={scaleX(activeIndex)}
              cy={scaleY(active.value)}
              r={5}
              fill="var(--chart-mark)"
              stroke="var(--surface)"
              strokeWidth={2}
            />
          </g>
        ) : null}
      </svg>

      {active ? (
        <div
          className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs shadow-md"
          role="status"
        >
          <span className="font-semibold tabular-nums text-text">{active.value}</span>
          <span className="text-text-muted"> · {formatDate(active.date)}</span>
        </div>
      ) : null}
    </div>
  );
}
