'use client';

// StackDiagram — hero architecture diagram for the SaaS Starter.
//
// The story: your Next.js app (deployed on Vercel) is the hub. Every essential
// is already wired in — MailKite for auth & email, Stripe for payments, and a
// Supabase Postgres database reached through Drizzle ORM. Live request/response
// packets ride each rail so the whole system reads as *wired together and
// flowing*, in the same visual language as the marketing-site hero diagrams.
//
// Default (no JS / prefers-reduced-motion) = the success rest state: every rail
// drawn, every service lit and connected, packets parked at their service. The
// motion is a pure enhancement, gated behind .is-live (scroll-into-view via
// IntersectionObserver) and disabled under prefers-reduced-motion.

import { useEffect, useRef } from 'react';

// ---- Real brand marks -------------------------------------------------------
// Monochrome marks (Next.js, Vercel) pick up --color-text so they invert with
// the theme. Branded marks keep their official color. Sourced from simple-icons
// (Next.js, Vercel, Stripe #635BFF, Supabase #3FCF8E, Drizzle #C5F74F); the
// MailKite mark is our own gradient kite.
function BrandMark({
  name,
  x,
  y,
  size,
}: {
  name: 'next' | 'vercel' | 'stripe' | 'supabase' | 'drizzle' | 'mailkite';
  x: number;
  y: number;
  size: number;
}) {
  switch (name) {
    case 'next':
      return (
        <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24">
          <path
            fill="var(--color-text)"
            d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"
          />
        </svg>
      );
    case 'vercel':
      return (
        <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24">
          <path fill="var(--color-text)" d="m12 1.608 12 20.784H0Z" />
        </svg>
      );
    case 'stripe':
      return (
        <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24">
          <path
            fill="#635BFF"
            d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"
          />
        </svg>
      );
    case 'supabase':
      return (
        <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24">
          <path
            fill="#3FCF8E"
            d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"
          />
        </svg>
      );
    case 'drizzle':
      return (
        <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24">
          <path
            fill="#C5F74F"
            d="M5.353 11.823a1.036 1.036 0 0 0-.395-1.422 1.063 1.063 0 0 0-1.437.399L.138 16.702a1.035 1.035 0 0 0 .395 1.422 1.063 1.063 0 0 0 1.437-.398l3.383-5.903Zm11.216 0a1.036 1.036 0 0 0-.394-1.422 1.064 1.064 0 0 0-1.438.399l-3.382 5.902a1.036 1.036 0 0 0 .394 1.422c.506.283 1.15.104 1.438-.398l3.382-5.903Zm7.293-4.525a1.036 1.036 0 0 0-.395-1.422 1.062 1.062 0 0 0-1.437.399l-3.383 5.902a1.036 1.036 0 0 0 .395 1.422 1.063 1.063 0 0 0 1.437-.399l3.383-5.902Zm-11.219 0a1.035 1.035 0 0 0-.394-1.422 1.064 1.064 0 0 0-1.438.398L8.83 12.177a1.036 1.036 0 0 0 .394 1.422c.506.282 1.15.104 1.438-.399l3.382-5.902Z"
          />
        </svg>
      );
    case 'mailkite':
      return (
        <svg x={x} y={y} width={size} height={size} viewBox="12 5 39 57">
          <path d="M32 6 L32 46 L13 23 Z" fill="#5b9bff" />
          <path d="M32 6 L51 23 L32 46 Z" fill="#7c6cff" />
          <path
            d="M32 46 C 35 52, 41 53, 45 58"
            fill="none"
            stroke="#5b9bff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="45" cy="58" r="3" fill="#5b9bff" />
        </svg>
      );
  }
}

// ---- Service lanes ----------------------------------------------------------
// Each service card sits at x=502 (w=250); `cy` is its vertical center and the
// point the rail curves into. `rail` doubles as the visible dashed track AND the
// packet's offset-path, so the two can never drift apart. `tint` is the brand
// color used for the logo tile so each service reads at a glance.
const CARD_X = 502;
const CARD_W = 250;
const HUB_OUT_X = 300;
const HUB_CY = 218;

type Service = {
  key: 'mailkite' | 'stripe' | 'supabase';
  logo: 'mailkite' | 'stripe' | 'supabase';
  title: string;
  sub: string;
  cy: number;
  rail: string;
  tint: string;
};

const services: Service[] = [
  {
    key: 'mailkite',
    logo: 'mailkite',
    title: 'MailKite',
    sub: 'Auth & email',
    cy: 86,
    rail: `M ${HUB_OUT_X} ${HUB_CY} C 392 218 410 86 ${CARD_X} 86`,
    tint: '#6ea8fe',
  },
  {
    key: 'stripe',
    logo: 'stripe',
    title: 'Stripe',
    sub: 'Payments & billing',
    cy: 220,
    rail: `M ${HUB_OUT_X} ${HUB_CY} C 392 218 430 226 ${CARD_X} 220`,
    tint: '#635BFF',
  },
  {
    key: 'supabase',
    logo: 'supabase',
    title: 'Supabase',
    sub: 'Postgres database',
    cy: 354,
    rail: `M ${HUB_OUT_X} ${HUB_CY} C 392 218 410 354 ${CARD_X} 354`,
    tint: '#3FCF8E',
  },
];

export function StackDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll-into-view → .is-live, exactly like the marketing-site diagrams.
  // No-op under reduced motion or when IntersectionObserver is unavailable, so
  // the diagram simply stays in its already-complete rest state.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            root.classList.add('is-live');
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="sd-flow gradient-ring relative overflow-hidden rounded-2xl border border-border-brand bg-panel"
    >
      <div className="flex items-center gap-2 border-b border-border-brand px-5 py-4 text-xs text-[var(--color-muted)]">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
        <span>your stack</span>
        <span className="ml-auto font-mono text-[11px] text-[var(--color-accent)]">
          everything wired together
        </span>
      </div>

      <div className="relative px-4 py-6 sm:px-6 sm:py-7">
        <svg
          className="sd-scene w-full"
          viewBox="0 0 780 440"
          role="img"
          aria-label="Architecture diagram: a Next.js app deployed on Vercel is wired to MailKite for auth and email, Stripe for payments, and a Supabase Postgres database reached through Drizzle ORM. Requests flow from the app out to each service and back."
        >
          <defs>
            <linearGradient id="sd-grad" x1="0" y1="1" x2="1" y2="0">
              <stop className="sd-stop-a" offset="0%" />
              <stop className="sd-stop-b" offset="100%" />
            </linearGradient>
          </defs>

          {/* Entry rail: inbound traffic into the app */}
          <path className="sd-rail" d={`M 82 ${HUB_CY} H 150`} fill="none" />

          {/* Service rails — each also drives its packet's offset-path */}
          {services.map((s) => (
            <path key={s.key} className="sd-rail" data-k={s.key} d={s.rail} fill="none" />
          ))}

          {/* Inbound traffic node */}
          <g className="sd-entry">
            <circle className="sd-entry-halo" cx="58" cy={HUB_CY} r="24" />
            <circle className="sd-entry-node" cx="58" cy={HUB_CY} r="17" />
            <path
              className="sd-entry-glyph"
              d="M58 203 a15 15 0 1 0 0 30 a15 15 0 1 0 0 -30 M43 218 h30 M58 203 c7 6 7 24 0 30 c-7 -6 -7 -24 0 -30"
              fill="none"
            />
          </g>
          <text className="sd-cap" x="58" y={HUB_CY + 40} textAnchor="middle">
            traffic
          </text>

          {/* Drizzle ORM node — the query layer on the Supabase rail */}
          <g className="sd-orm">
            <rect className="sd-orm-pill" x="346" y="276" width="118" height="32" rx="16" />
            <BrandMark name="drizzle" x={356} y={284} size={16} />
            <text className="sd-orm-text" x="378" y="296">
              Drizzle ORM
            </text>
          </g>

          {/* Service cards */}
          {services.map((s) => (
            <g className="sd-card" data-k={s.key} key={s.key}>
              <rect
                className="sd-card-box"
                x={CARD_X}
                y={s.cy - 50}
                width={CARD_W}
                height={100}
                rx="16"
              />
              {/* branded logo tile */}
              <rect
                className="sd-tile"
                x={CARD_X + 18}
                y={s.cy - 24}
                width={48}
                height={48}
                rx="12"
                style={{
                  fill: `color-mix(in oklab, ${s.tint} 16%, var(--color-panel))`,
                  stroke: `color-mix(in oklab, ${s.tint} 42%, transparent)`,
                }}
              />
              <BrandMark name={s.logo} x={CARD_X + 26} y={s.cy - 16} size={32} />
              {/* labels */}
              <text className="sd-title" x={CARD_X + 82} y={s.cy - 4}>
                {s.title}
              </text>
              <text className="sd-sub" x={CARD_X + 82} y={s.cy + 17}>
                {s.sub}
              </text>
              {/* live/connected indicator */}
              <circle
                className="sd-live"
                cx={CARD_X + CARD_W - 24}
                cy={s.cy - 30}
                r="4"
              />
              <path
                className="sd-check"
                d={`M ${CARD_X + CARD_W - 40} ${s.cy + 26} l 5 5 l 10 -12`}
                fill="none"
              />
            </g>
          ))}

          {/* Request/response packets — one round-trip per rail */}
          <g className="sd-packet sd-packet-in" style={{ offsetPath: `path("M 82 ${HUB_CY} H 150")` }}>
            <rect className="sd-packet-face" x="-6" y="-6" width="12" height="12" rx="3" transform="rotate(45)" />
          </g>
          {services.map((s) => (
            <g
              key={s.key}
              className="sd-packet"
              data-k={s.key}
              style={{ offsetPath: `path("${s.rail}")` }}
            >
              <rect
                className="sd-packet-face"
                x="-6"
                y="-6"
                width="12"
                height="12"
                rx="3"
                transform="rotate(45)"
              />
            </g>
          ))}

          {/* The hub — your Next.js app, on Vercel */}
          <g className="sd-hub">
            <rect className="sd-hub-box" x="150" y="150" width="150" height="141" rx="18" />
            <rect className="sd-hub-tile" x="201" y="166" width="48" height="48" rx="12" />
            <BrandMark name="next" x={209} y={174} size={32} />
            <text className="sd-hub-title" x="225" y="236" textAnchor="middle">
              Next.js
            </text>
            <text className="sd-hub-sub" x="225" y="254" textAnchor="middle">
              your SaaS app
            </text>
            <rect className="sd-hub-chip" x="180" y="263" width="90" height="20" rx="10" />
            <BrandMark name="vercel" x={192} y={267} size={12} />
            <text className="sd-hub-chip-text" x="234" y="277" textAnchor="middle">
              Vercel
            </text>
          </g>
        </svg>
      </div>

      <style jsx>{`
        .sd-stop-a {
          stop-color: var(--color-accent);
        }
        .sd-stop-b {
          stop-color: var(--color-accent-2);
        }

        /* Rails */
        :global(.sd-rail) {
          stroke: url(#sd-grad);
          stroke-width: 2;
          stroke-linecap: round;
          stroke-dasharray: 3 6;
          opacity: 0.6;
        }

        /* Inbound traffic node */
        :global(.sd-entry-halo) {
          fill: color-mix(in oklab, var(--color-accent) 12%, transparent);
        }
        :global(.sd-entry-node) {
          fill: var(--color-bg);
          stroke: url(#sd-grad);
          stroke-width: 2;
        }
        :global(.sd-entry-glyph) {
          stroke: var(--color-accent);
          stroke-width: 1.4;
          opacity: 0.85;
        }
        :global(.sd-cap) {
          font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
          font-size: 11px;
          fill: var(--color-muted);
        }

        /* Drizzle ORM node */
        :global(.sd-orm-pill) {
          fill: color-mix(in oklab, #c5f74f 14%, var(--color-panel));
          stroke: color-mix(in oklab, #c5f74f 40%, transparent);
          stroke-width: 1;
        }
        :global(.sd-orm-text) {
          font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
          font-size: 12px;
          font-weight: 600;
          fill: var(--color-text);
        }

        /* Service cards — resting state is fully lit */
        :global(.sd-card-box) {
          fill: color-mix(in oklab, var(--color-accent) 6%, var(--color-panel));
          stroke: color-mix(in oklab, var(--color-accent) 40%, transparent);
          stroke-width: 1.5;
        }
        :global(.sd-tile) {
          stroke-width: 1;
        }
        :global(.sd-title) {
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 15px;
          font-weight: 700;
          fill: var(--color-text);
        }
        :global(.sd-sub) {
          font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
          font-size: 11px;
          fill: var(--color-muted);
        }
        :global(.sd-live) {
          fill: #10b981;
          filter: drop-shadow(0 0 5px color-mix(in oklab, #10b981 60%, transparent));
        }
        :global(.sd-check) {
          stroke: #10b981;
          stroke-width: 2.4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Packets */
        :global(.sd-packet-face) {
          fill: url(#sd-grad);
          stroke: color-mix(in oklab, var(--color-accent) 60%, white);
          stroke-width: 1;
        }
        :global(.sd-packet) {
          filter: drop-shadow(0 0 6px color-mix(in oklab, var(--color-accent) 55%, transparent));
          offset-distance: 100%;
          offset-rotate: 0deg;
        }

        /* Hub */
        :global(.sd-hub) {
          filter: drop-shadow(0 8px 22px color-mix(in oklab, var(--color-accent) 30%, transparent));
        }
        :global(.sd-hub-box) {
          fill: color-mix(in oklab, var(--color-accent) 10%, var(--color-panel));
          stroke: url(#sd-grad);
          stroke-width: 1.5;
        }
        :global(.sd-hub-tile) {
          fill: color-mix(in oklab, var(--color-text) 8%, var(--color-panel));
          stroke: color-mix(in oklab, var(--color-text) 18%, transparent);
          stroke-width: 1;
        }
        :global(.sd-hub-title) {
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 16px;
          font-weight: 700;
          fill: var(--color-text);
        }
        :global(.sd-hub-sub) {
          font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
          font-size: 11px;
          fill: var(--color-muted);
        }
        :global(.sd-hub-chip) {
          fill: color-mix(in oklab, var(--color-accent-2) 14%, transparent);
          stroke: color-mix(in oklab, var(--color-accent-2) 38%, transparent);
          stroke-width: 1;
        }
        :global(.sd-hub-chip-text) {
          font-family: ui-sans-serif, system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          fill: var(--color-text);
        }

        :global(.sd-card),
        :global(.sd-hub),
        :global(.sd-entry) {
          transform-box: fill-box;
        }

        /* ---- Motion (only when .is-live, never under reduced motion) -------- */
        @media (prefers-reduced-motion: no-preference) {
          /* Cards reveal once, staggered, as the system "boots" */
          :global(.sd-flow.is-live .sd-card) {
            animation: sd-card-in 0.55s ease-out both;
          }
          :global(.sd-flow.is-live .sd-card[data-k='mailkite']) {
            animation-delay: 0.3s;
          }
          :global(.sd-flow.is-live .sd-card[data-k='stripe']) {
            animation-delay: 0.5s;
          }
          :global(.sd-flow.is-live .sd-card[data-k='supabase']) {
            animation-delay: 0.7s;
          }
          @keyframes sd-card-in {
            0% {
              opacity: 0.3;
              transform: translateX(14px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Checks draw on after their card settles */
          :global(.sd-flow.is-live .sd-check) {
            stroke-dasharray: 24;
            stroke-dashoffset: 24;
            animation: sd-draw 0.4s ease-out forwards;
          }
          :global(.sd-flow.is-live .sd-card[data-k='mailkite'] .sd-check) {
            animation-delay: 0.85s;
          }
          :global(.sd-flow.is-live .sd-card[data-k='stripe'] .sd-check) {
            animation-delay: 1.05s;
          }
          :global(.sd-flow.is-live .sd-card[data-k='supabase'] .sd-check) {
            animation-delay: 1.25s;
          }
          @keyframes sd-draw {
            to {
              stroke-dashoffset: 0;
            }
          }

          /* Rails drift, reinforcing continuous flow */
          :global(.sd-flow.is-live .sd-rail) {
            animation: sd-flow-dash 1.1s linear infinite;
          }
          @keyframes sd-flow-dash {
            to {
              stroke-dashoffset: -18;
            }
          }

          /* Round-trip request/response packets, staggered per rail */
          :global(.sd-flow.is-live .sd-packet[data-k]) {
            animation: sd-trip 3.4s ease-in-out infinite;
          }
          :global(.sd-flow.is-live .sd-packet[data-k='mailkite']) {
            animation-delay: 1.2s;
          }
          :global(.sd-flow.is-live .sd-packet[data-k='stripe']) {
            animation-delay: 1.9s;
          }
          :global(.sd-flow.is-live .sd-packet[data-k='supabase']) {
            animation-delay: 2.6s;
          }
          @keyframes sd-trip {
            0% {
              offset-distance: 0%;
              opacity: 0;
            }
            8% {
              opacity: 1;
            }
            44% {
              offset-distance: 100%;
              opacity: 1;
            }
            52% {
              offset-distance: 100%;
              opacity: 0.85;
            }
            94% {
              opacity: 1;
            }
            100% {
              offset-distance: 0%;
              opacity: 0;
            }
          }

          /* Continuous inbound traffic into the app */
          :global(.sd-flow.is-live .sd-packet-in) {
            animation: sd-in 1.6s linear 0.4s infinite;
          }
          @keyframes sd-in {
            0% {
              offset-distance: 0%;
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            85% {
              opacity: 1;
            }
            100% {
              offset-distance: 100%;
              opacity: 0;
            }
          }

          /* Hub breathes gently, the entry node pulses */
          :global(.sd-flow.is-live .sd-hub) {
            animation: sd-breathe 5s ease-in-out 1.4s infinite;
          }
          @keyframes sd-breathe {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.02);
            }
          }
          :global(.sd-flow.is-live .sd-entry) {
            animation: sd-pulse 2.2s ease-in-out infinite;
          }
          @keyframes sd-pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.08);
            }
          }
          :global(.sd-flow.is-live .sd-live) {
            animation: sd-blink 2.4s ease-in-out infinite;
          }
          @keyframes sd-blink {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.4;
            }
          }
        }
      `}</style>
    </div>
  );
}
