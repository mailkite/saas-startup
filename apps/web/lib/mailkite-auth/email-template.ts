// Docs: docs/features/branded-transactional-email.md
/**
 * Branded transactional email template.
 *
 * One bulletproof, table-based shell rendered in the app's own brand palette, so every
 * email the app sends looks like the app. Email clients are not browsers: no flexbox or
 * grid, no external stylesheets, no SVG images, no CSS variables — everything here is a
 * nested <table> with inline styles, which is what renders consistently in Gmail, Outlook,
 * Apple Mail and the rest.
 *
 * The palettes below mirror the brand tokens in app/globals.css. Rebranding the starter is
 * two edits: BRAND (name, logo, footer) and PALETTES (colors).
 */

export type EmailTheme = 'light' | 'dark';

/** Escape untrusted values before interpolating them into an HTML block. */
export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}

interface Palette {
  pageBg: string;
  card: string;
  border: string;
  footerBorder: string;
  heading: string;
  text: string;
  muted: string;
  accent: string;
  buttonBg: string;
  buttonText: string;
}

// Mirrors the --color-* tokens in app/globals.css. Light is the default: Gmail ignores
// prefers-color-scheme and auto-darkens on its own, so a light email is the safer bet.
const PALETTES: Record<EmailTheme, Palette> = {
  light: {
    pageBg: '#eef2f9',
    card: '#ffffff',
    border: '#e3e8f0',
    footerBorder: '#f0f4f9',
    heading: '#11141b',
    text: '#3c4150',
    muted: '#5a6473',
    accent: '#2f6fe0',
    buttonBg: '#2f6fe0',
    buttonText: '#ffffff',
  },
  dark: {
    pageBg: '#0b0d12',
    card: '#11141b',
    border: '#1e2430',
    footerBorder: '#1e2430',
    heading: '#ffffff',
    text: '#e6e9ef',
    muted: '#8a93a6',
    accent: '#6ea8fe',
    buttonBg: '#6ea8fe',
    buttonText: '#0b0d12',
  },
};

interface Brand {
  name: string;
  /** Optional hosted PNG/JPG wordmark. Clients block SVG, so don't point this at an .svg. */
  logoUrl: string;
  tagline: string;
  siteUrl: string;
  theme: EmailTheme;
}

function getBrand(): Brand {
  return {
    name: process.env.APP_NAME || 'SaaS Starter',
    logoUrl: process.env.EMAIL_LOGO_URL || '',
    tagline: process.env.EMAIL_TAGLINE || 'Launch your SaaS.',
    siteUrl: process.env.BASE_URL || 'http://localhost:3000',
    theme: process.env.EMAIL_THEME === 'dark' ? 'dark' : 'light',
  };
}

/** The app's display name, as used in the masthead and footer. */
export function getAppName(): string {
  return getBrand().name;
}

/**
 * A content block. Colors are applied at render time from the active palette, so the same
 * body renders correctly in either theme.
 */
export type EmailBlock =
  | { p: string } // body paragraph (HTML allowed — escape any dynamic part yourself)
  | { muted: string } // small caption / footnote
  | { pre: string } // preserves line breaks (pass already-escaped text)
  | { kv: { label: string; value: string }[] } // key/value table, e.g. receipt details
  | { list: string[] } // bulleted list (HTML allowed — escape any dynamic part yourself)
  | { button: { label: string; href: string } }; // call to action

export interface EmailDoc {
  /** Defaults to EMAIL_THEME, then light. */
  theme?: EmailTheme;
  /** Small uppercase kicker above the heading. */
  eyebrow?: string;
  heading: string;
  /** Inbox preview text, shown after the subject in most clients. */
  preview?: string;
  blocks: EmailBlock[];
}

/**
 * Anchor styled for the active palette — the shell doesn't style links inside the HTML
 * you supply. Defaults to the EMAIL_THEME palette, so pass the same theme you pass to
 * renderEmail() whenever you override it there.
 */
export function link(href: string, label: string, theme?: EmailTheme): string {
  const p = PALETTES[theme ?? getBrand().theme];
  return `<a href="${escapeHtml(href)}" style="color:${p.accent}">${escapeHtml(label)}</a>`;
}

function renderBlock(b: EmailBlock, p: Palette): string {
  if ('p' in b) {
    return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${p.text}">${b.p}</p>`;
  }
  if ('muted' in b) {
    return `<p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:${p.muted}">${b.muted}</p>`;
  }
  if ('pre' in b) {
    return `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;white-space:pre-wrap;color:${p.text}">${b.pre}</p>`;
  }
  if ('kv' in b) {
    const rows = b.kv
      .map(
        (r) => `<tr>
                  <td style="padding:6px 16px 6px 0;font-size:13px;color:${p.muted};white-space:nowrap;vertical-align:top">${escapeHtml(r.label)}</td>
                  <td style="padding:6px 0;font-size:14px;color:${p.text}">${escapeHtml(r.value)}</td>
                </tr>`,
      )
      .join('');
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 16px">${rows}</table>`;
  }
  if ('list' in b) {
    const items = b.list
      .map((li) => `<li style="margin:0 0 8px;font-size:15px;line-height:1.6;color:${p.text}">${li}</li>`)
      .join('');
    return `<ul style="margin:0 0 16px;padding-left:20px">${items}</ul>`;
  }
  // button — a table cell, not a styled <div>: Outlook ignores padding on inline elements.
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 8px"><tr>
                  <td align="center" style="border-radius:10px;background:${p.buttonBg}">
                    <a href="${escapeHtml(b.button.href)}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:${p.buttonText};text-decoration:none;border-radius:10px">${escapeHtml(b.button.label)}</a>
                  </td>
                </tr></table>`;
}

/** Render an email in the branded shell (logo, card, footer) for the given theme. */
export function renderEmail({ theme, eyebrow, heading, preview, blocks }: EmailDoc): string {
  const brand = getBrand();
  const active = theme ?? brand.theme;
  const p = PALETTES[active];

  // Hidden preheader: the grey line clients show next to the subject. Without it they
  // scrape the first words of the body instead.
  const preheader = preview
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preview)}</div>`
    : '';
  const kicker = eyebrow
    ? `<p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:${p.accent}">${escapeHtml(eyebrow)}</p>`
    : '';
  // No hosted logo? Fall back to a text wordmark, so a fresh clone of the starter sends a
  // properly branded email without uploading an asset first.
  const masthead = brand.logoUrl
    ? `<img src="${escapeHtml(brand.logoUrl)}" width="150" alt="${escapeHtml(brand.name)}" style="display:block;border:0;height:auto;width:150px" />`
    : `<p style="margin:0;font-size:18px;font-weight:700;letter-spacing:-0.01em;color:${p.heading}">${escapeHtml(brand.name)}</p>`;
  const body = blocks.map((b) => renderBlock(b, p)).join('\n                ');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="${active} only" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${escapeHtml(brand.name)}</title>
  </head>
  <body style="margin:0;padding:0;background:${p.pageBg}">
    ${preheader}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${p.pageBg}">
      <tr>
        <td align="center" style="padding:32px 16px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:${p.card};border:1px solid ${p.border};border-radius:14px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
            <tr>
              <td style="padding:28px 32px 8px">
                ${masthead}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 8px">
                ${kicker}<h1 style="margin:0 0 14px;font-size:20px;line-height:1.3;font-weight:700;color:${p.heading}">${escapeHtml(heading)}</h1>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid ${p.footerBorder}">
                <p style="margin:0;font-size:12px;line-height:1.6;color:${p.muted}">
                  ${escapeHtml(brand.name)} — ${escapeHtml(brand.tagline)}<br />
                  <a href="${escapeHtml(brand.siteUrl)}" style="color:${p.accent};text-decoration:none">${escapeHtml(brand.siteUrl.replace(/^https?:\/\//, ''))}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Strip tags and decode the few entities the blocks emit, so paragraph HTML (which may
// carry inline <strong> or <a>) degrades to readable plaintext. Anchors keep their
// destination as "label (url)" — unless the label already is the URL.
function stripHtml(value: string): string {
  return value
    .replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href: string, label: string) => {
      const text = label.replace(/<[^>]+>/g, '');
      return text === href ? text : `${text} (${href})`;
    })
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Plaintext counterpart of renderEmail() — always send both. A message with no text/plain
 * part scores worse with spam filters and is unreadable in text-only clients.
 */
export function renderEmailText({ eyebrow, heading, blocks }: EmailDoc): string {
  const brand = getBrand();
  const lines: string[] = [];
  if (eyebrow) lines.push(eyebrow.toUpperCase());
  lines.push(heading, '');
  for (const b of blocks) {
    if ('p' in b) lines.push(stripHtml(b.p));
    else if ('muted' in b) lines.push(stripHtml(b.muted));
    else if ('pre' in b) lines.push(b.pre);
    else if ('kv' in b) for (const r of b.kv) lines.push(`${r.label}: ${r.value}`);
    else if ('list' in b) for (const li of b.list) lines.push(`- ${stripHtml(li)}`);
    else lines.push(`${b.button.label}: ${b.button.href}`);
    lines.push('');
  }
  lines.push('—', `${brand.name} — ${brand.tagline} ${brand.siteUrl}`);
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
