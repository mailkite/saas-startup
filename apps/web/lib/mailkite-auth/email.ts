// Docs: docs/features/branded-transactional-email.md
import { getAuthConfig, getBaseUrl } from './config';
import {
  renderEmail,
  renderEmailText,
  escapeHtml,
  link,
  getAppName,
  type EmailDoc,
} from './email-template';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

const API_KEY = process.env.MAILKITE_API_KEY || '';

function getApiUrl(): string {
  return getAuthConfig().apiUrl;
}

/**
 * Default sender for all app email. If MAILKITE_API_KEY is scoped to a single
 * domain, this MUST be an address on that domain or MailKite rejects the send
 * with 403 key_scope. Override per-message via the `from` param.
 */
export function getDefaultFrom(): string {
  return process.env.MAILKITE_FROM || 'noreply@mailkite.dev';
}

export async function sendEmail(params: SendEmailParams): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${getApiUrl()}/v1/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        to: [params.to],
        from: params.from || getDefaultFrom(),
        subject: params.subject,
        html: params.html,
        ...(params.text ? { text: params.text } : {}),
        ...(params.replyTo ? { replyTo: params.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      // Surface the real cause server-side (status + body) — callers keep a generic
      // user-facing message. A 401/403 here usually means MAILKITE_API_KEY is missing
      // or expired (MailKite tokens are account JWTs that expire).
      console.error(`[mailkite] send failed: HTTP ${res.status} ${res.statusText} — ${body}`);
      return { ok: false, error: `HTTP ${res.status}: ${body}` };
    }

    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Send failed';
    console.error(`[mailkite] send threw: ${message}`);
    return { ok: false, error: message };
  }
}

/**
 * Greeting name for the welcome email. At signup the email local-part is the best we have
 * (no display name yet): "ada@example.com" -> "ada".
 */
export function greetingName(email: string): string {
  return email.split('@')[0] || 'there';
}

/**
 * The welcome email's content, in the shared template's block format. Rendered to HTML and
 * plaintext by lib/mailkite-auth/email-template.ts, so it carries the app's branding
 * instead of bare <p> tags. Edit the copy here; edit the look there.
 */
function welcomeDoc(to: string): EmailDoc {
  const base = getBaseUrl();
  return {
    eyebrow: 'Welcome aboard',
    heading: `Welcome to ${getAppName()} \u{1F44B}`,
    preview: 'Your account is ready — here are the first three things worth doing.',
    blocks: [
      {
        p: `Hi ${escapeHtml(greetingName(to))}, thanks for signing up. Your account is ready and you are signed in — here is what is worth doing first.`,
      },
      {
        list: [
          `${link(`${base}/dashboard/general`, 'Finish your profile')} — set your name and account details.`,
          `${link(`${base}/dashboard/security`, 'Secure your account')} — add a password and review active sessions.`,
          `${link(`${base}/pricing`, 'Choose a plan')} — upgrade whenever you are ready.`,
        ],
      },
      { button: { label: 'Open your dashboard', href: `${base}/dashboard` } },
      { muted: 'Questions? Just reply to this email — it reaches a real person.' },
    ],
  };
}

/**
 * Greet a newly created account. Sending is skipped (not an error) when MailKite isn't
 * configured, so the template still works end-to-end without an API key.
 */
export async function sendWelcomeEmail(to: string): Promise<{ ok: boolean; error?: string }> {
  if (!isMailkiteEmailConfigured()) return { ok: true };

  const doc = welcomeDoc(to);

  return sendEmail({
    to,
    subject: `Welcome to ${getAppName()}`,
    html: renderEmail(doc),
    text: renderEmailText(doc),
  });
}

export function getMailkiteApiKey(): string {
  return API_KEY;
}

export function isMailkiteEmailConfigured(): boolean {
  return !!API_KEY;
}
