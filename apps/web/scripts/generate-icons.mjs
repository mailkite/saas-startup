#!/usr/bin/env node
/**
 * Generates every brand asset from the single source of truth below.
 *
 *   pnpm run brand:icons
 *
 * Rebranding this template: change GLYPH (and ACCENT/ACCENT_2 to match the
 * `@theme` block in app/globals.css), then re-run. Everything else follows.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.join(import.meta.dirname, '..');

/* ---- Source of truth ---------------------------------------------------- */

// Brand palette — mirrors the `@theme` block in app/globals.css (Ocean preset).
const ACCENT = '#6ea8fe';
const ACCENT_2 = '#7c6cff';
const BG = '#0b0d12';
const TEXT = '#e6e9ef';
const MUTED = '#8a93a6';

// The mark: a geometric "S" on a 64x64 grid. 180°-rotationally symmetric and
// optically centred — the arcs are exact semicircles (chord = 2r).
const GLYPH = 'M46 17 H26 A7.5 7.5 0 0 0 26 32 H38 A7.5 7.5 0 0 1 38 47 H18';
const STROKE = 7.5;
const RADIUS = 14; // tile corner radius at 64px (~22%, matches the iOS squircle)

const FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* ---- Builders ----------------------------------------------------------- */

const gradientDef = (id) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">` +
  `<stop offset="0" stop-color="${ACCENT}"/><stop offset="1" stop-color="${ACCENT_2}"/></linearGradient>`;

/** The bare "S", scaled about the tile centre. */
const glyph = (fg, scale = 1) =>
  `<path d="${GLYPH}" fill="none" stroke="${fg}" stroke-width="${STROKE}" stroke-linejoin="round"` +
  (scale === 1 ? '' : ` transform="translate(32 32) scale(${scale}) translate(-32 -32)"`) +
  '/>';

/**
 * A full icon tile.
 * @param rx     corner radius; 0 = full bleed (Apple/Android apply their own mask)
 * @param scale  glyph scale about centre (maskable icons need a safe zone)
 */
const tile = ({ rx = RADIUS, scale = 1 } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="SaaS Starter">` +
  `<defs>${gradientDef('g')}</defs>` +
  `<rect width="64" height="64" rx="${rx}" fill="url(#g)"/>` +
  glyph('#ffffff', scale) +
  '</svg>';

/** Knocks the glyph out of the tile so the page background shows through the S. */
const knockoutMask = (id) =>
  `<mask id="${id}"><rect width="64" height="64" rx="${RADIUS}" fill="white"/>` +
  `<path d="${GLYPH}" fill="none" stroke="black" stroke-width="${STROKE}" stroke-linejoin="round"/></mask>`;

/** Single-colour tile that inherits the surrounding text colour. */
const monoTile = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="SaaS Starter">` +
  `<defs>${knockoutMask('k')}</defs>` +
  `<rect width="64" height="64" rx="${RADIUS}" fill="currentColor" mask="url(#k)"/>` +
  '</svg>';

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/** Pack PNGs into an .ico container (PNG payloads — supported by every current browser). */
function encodeIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  for (const [i, { size, buf }] of images.entries()) {
    const e = 16 * i;
    dir.writeUInt8(size >= 256 ? 0 : size, e); // 0 means 256
    dir.writeUInt8(size >= 256 ? 0 : size, e + 1);
    dir.writeUInt16LE(1, e + 4); // colour planes
    dir.writeUInt16LE(32, e + 6); // bits per pixel
    dir.writeUInt32LE(buf.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  }
  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

/* ---- Composite assets --------------------------------------------------- */

/**
 * Horizontal lockup: mark + wordmark.
 *
 * The colour version carries its own prefers-color-scheme rule so a single file
 * stays legible on light and dark backgrounds (README embeds, docs, press).
 * The mono version inherits currentColor and is meant to be inlined.
 */
// The wordmark uses the same system font stack as the site, so its natural width
// shifts between platforms. textLength pins it to an exact box: no clipping, no
// trailing dead space, identical bounds everywhere.
const WORD_X = 80;
const WORD_W = 184;
const LOCKUP_W = WORD_X + WORD_W;
const lockup = ({ mono = false } = {}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOCKUP_W} 64" width="${LOCKUP_W}" height="64" role="img" aria-label="SaaS Starter">` +
  `<defs>${mono ? knockoutMask('k') : gradientDef('g')}</defs>` +
  (mono
    ? ''
    : `<style>.word{fill:${'#11141b'}}@media (prefers-color-scheme:dark){.word{fill:${TEXT}}}</style>`) +
  (mono
    ? `<rect width="64" height="64" rx="${RADIUS}" fill="currentColor" mask="url(#k)"/>`
    : `<rect width="64" height="64" rx="${RADIUS}" fill="url(#g)"/>${glyph('#ffffff')}`) +
  `<text x="${WORD_X}" y="44" textLength="${WORD_W}" lengthAdjust="spacingAndGlyphs"` +
  ` font-family="${FONT}" font-size="34" font-weight="600"` +
  (mono ? ' fill="currentColor"' : ' class="word"') +
  '>SaaS Starter</text>' +
  '</svg>';

/** 1200x630 social card. */
const socialCard = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ACCENT}"/><stop offset="1" stop-color="${ACCENT_2}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0.5" cy="0" r="0.75">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.30"/><stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.9" cy="0.15" r="0.6">
      <stop offset="0" stop-color="${ACCENT_2}" stop-opacity="0.24"/><stop offset="1" stop-color="${ACCENT_2}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${ACCENT}"/><stop offset="1" stop-color="${ACCENT_2}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#glowA)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>

  <g transform="translate(80 72)">
    <rect width="88" height="88" rx="${(RADIUS / 64) * 88}" fill="url(#tile)"/>
    <g transform="scale(${88 / 64})">${glyph('#ffffff')}</g>
  </g>
  <text x="188" y="130" font-family="${FONT}" font-size="34" font-weight="600" letter-spacing="-0.5" fill="${TEXT}">SaaS Starter</text>

  <text x="80" y="330" font-family="${FONT}" font-size="76" font-weight="700" letter-spacing="-3" fill="${TEXT}">Ship your SaaS in minutes.</text>
  <text x="80" y="392" font-family="${FONT}" font-size="28" font-weight="400" fill="${MUTED}">Auth, payments, teams and Postgres — wired up and production-ready.</text>

  <rect x="80" y="452" width="112" height="6" rx="3" fill="url(#bar)"/>

  <text x="80" y="556" font-family="${FONT}" font-size="24" font-weight="500" fill="${MUTED}">Next.js 15 · Stripe · Drizzle · Tailwind v4</text>
  <text x="1120" y="556" text-anchor="end" font-family="${FONT}" font-size="24" font-weight="500" fill="${MUTED}">mailkite.dev</text>
</svg>`;

/* ---- Emit --------------------------------------------------------------- */

const written = [];
async function emit(rel, data) {
  const full = path.join(ROOT, rel);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, data);
  written.push(`${rel}  (${(data.length / 1024).toFixed(1)} kB)`);
}

const master = tile();

// Next.js App Router file conventions — these auto-emit the correct <link> tags.
await emit('app/icon.svg', master);
await emit('app/apple-icon.png', await png(tile({ rx: 0 }), 180)); // full bleed: iOS applies its own mask
await emit('app/opengraph-image.png', await sharp(Buffer.from(socialCard())).png({ compressionLevel: 9 }).toBuffer());
await emit('app/twitter-image.png', await sharp(Buffer.from(socialCard())).png({ compressionLevel: 9 }).toBuffer());
await emit(
  'app/favicon.ico',
  encodeIco(await Promise.all([16, 32, 48].map(async (size) => ({ size, buf: await png(master, size) })))),
);

// PWA / manifest icons.
await emit('public/brand/icon-192.png', await png(master, 192));
await emit('public/brand/icon-512.png', await png(master, 512));
// Maskable: full bleed with the glyph inside Android's 80% safe zone.
await emit('public/brand/icon-maskable-512.png', await png(tile({ rx: 0, scale: 0.72 }), 512));

// Standalone brand assets (README, docs, press, external embeds).
await emit('public/brand/icon.svg', master);
await emit('public/brand/icon-mono.svg', monoTile());
await emit('public/brand/logo.svg', lockup());
await emit('public/brand/logo-mono.svg', lockup({ mono: true }));
// Safari pinned tab: one flat black path on transparent — Safari supplies the colour.
await emit(
  'public/brand/mask-icon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">` +
    `<path d="${GLYPH}" fill="none" stroke="black" stroke-width="${STROKE}" stroke-linejoin="round"/></svg>`,
);

console.log(`Generated ${written.length} brand assets:\n  ${written.join('\n  ')}`);
