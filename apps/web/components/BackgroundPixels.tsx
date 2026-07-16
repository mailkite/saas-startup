'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export function BackgroundPixels() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const accentHex = styles.getPropertyValue('--color-accent').trim();
    const accent2Hex = styles.getPropertyValue('--color-accent-2').trim();

    let w = 0;
    let h = 0;
    const cell = 6;
    let cols = 0;
    let rows = 0;
    let buffer: ImageData | null = null;
    let animId: number;
    let start = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(1, Math.floor(w / cell));
      rows = Math.max(1, Math.floor(h / cell));
      buffer = ctx!.createImageData(cols, rows);
    }

    function hexToRgb(hex: string): [number, number, number] {
      const v = parseInt(hex.replace('#', ''), 16);
      return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
    }

    function draw(t: number) {
      if (!buffer || !ctx) return;
      const elapsed = t - start;
      const data = buffer.data;
      const [r1, g1, b1] = hexToRgb(accentHex || '#6ea8fe');
      const [r2, g2, b2] = hexToRgb(accent2Hex || '#7c6cff');

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = (col / cols) * w;
          const cy = (row / rows) * h;
          const i = (row * cols + col) * 4;

          const centerDist = Math.sqrt(
            ((cx - w * 0.5) / (w * 0.5)) ** 2 + ((cy - h * -0.12) / (h * 0.4)) ** 2
          );

          const ripple = Math.sin(centerDist * 18 - elapsed * 0.0005) * 0.5 + 0.5;
          const fade = Math.exp(-centerDist * 3.5);
          const alpha = Math.min(1, ripple * fade * 0.22);

          const t2 = (Math.sin(col * 0.3 + elapsed * 0.0008) + 1) / 2;
          data[i] = r1 + (r2 - r1) * t2;
          data[i + 1] = g1 + (g2 - g1) * t2;
          data[i + 2] = b1 + (b2 - b1) * t2;
          data[i + 3] = Math.round(alpha * 255);
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.putImageData(buffer, 0, 0);
      animId = requestAnimationFrame(draw);
    }

    function init() {
      resize();
      start = performance.now();
      animId = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(() => resize());
    observer.observe(canvas.parentElement!);
    init();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full brand-pixels"
      aria-hidden="true"
    />
  );
}
