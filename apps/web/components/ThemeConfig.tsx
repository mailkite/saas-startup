'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Palette, X } from 'lucide-react';

const PRESETS = [
  {
    name: 'Ocean',
    accent: '#6ea8fe',
    accent2: '#7c6cff',
  },
  {
    name: 'Sunset',
    accent: '#f97316',
    accent2: '#ec4899',
  },
  {
    name: 'Forest',
    accent: '#22c55e',
    accent2: '#14b8a6',
  },
  {
    name: 'Rose',
    accent: '#f43f5e',
    accent2: '#a855f7',
  },
  {
    name: 'Amber',
    accent: '#f59e0b',
    accent2: '#ef4444',
  },
  {
    name: 'Sky',
    accent: '#0ea5e9',
    accent2: '#6366f1',
  },
];

function applyColor(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

export function ThemeConfig({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [accents, setAccents] = useState(() => {
    if (typeof window === 'undefined') return { a: '#6ea8fe', a2: '#7c6cff' };
    return {
      a: localStorage.getItem('--color-accent') || '#6ea8fe',
      a2: localStorage.getItem('--color-accent-2') || '#7c6cff',
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    applyColor('--color-accent', accents.a);
    applyColor('--color-accent-2', accents.a2);
  }, [accents]);

  const pickPreset = useCallback((a: string, a2: string) => {
    setAccents({ a, a2 });
    if (typeof window !== 'undefined') {
      localStorage.setItem('--color-accent', a);
      localStorage.setItem('--color-accent-2', a2);
    }
    applyColor('--color-accent', a);
    applyColor('--color-accent-2', a2);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Theme colors"
        onClick={() => setOpen(!open)}
        className={`rounded-md border border-border bg-panel p-1.5 text-text transition-colors cursor-pointer ${className}`}
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-panel border border-border-brand rounded-xl p-6 w-80 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text">Theme Colors</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-text hover:text-[var(--color-accent)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => pickPreset(p.accent, p.accent2)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-lg border border-border-brand hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                >
                  <div
                    className="h-8 w-8 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent2})` }}
                  />
                  <span className="text-xs text-text">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-muted)] mb-1">
                  Accent
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accents.a}
                    onChange={(e) => {
                      const a = e.target.value;
                      setAccents((prev) => ({ ...prev, a }));
                      localStorage.setItem('--color-accent', a);
                    }}
                    className="h-8 w-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={accents.a}
                    onChange={(e) => {
                      const a = e.target.value;
                      setAccents((prev) => ({ ...prev, a }));
                      localStorage.setItem('--color-accent', a);
                    }}
                    className="flex-1 bg-bg border border-border-brand rounded px-2 py-1 text-xs text-text font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-muted)] mb-1">
                  Accent 2
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accents.a2}
                    onChange={(e) => {
                      const a2 = e.target.value;
                      setAccents((prev) => ({ ...prev, a2 }));
                      localStorage.setItem('--color-accent-2', a2);
                    }}
                    className="h-8 w-8 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={accents.a2}
                    onChange={(e) => {
                      const a2 = e.target.value;
                      setAccents((prev) => ({ ...prev, a2 }));
                      localStorage.setItem('--color-accent-2', a2);
                    }}
                    className="flex-1 bg-bg border border-border-brand rounded px-2 py-1 text-xs text-text font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
