import { getAuthConfig, getBaseUrl } from './config';

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
        from: params.from || 'noreply@mailkite.dev',
        subject: params.subject,
        html: params.html,
        ...(params.text ? { text: params.text } : {}),
        ...(params.replyTo ? { replyTo: params.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: body };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Send failed' };
  }
}

/**
 * Greet a newly created account. Sending is skipped (not an error) when MailKite isn't
 * configured, so the template still works end-to-end without an API key.
 */
export async function sendWelcomeEmail(to: string): Promise<{ ok: boolean; error?: string }> {
  if (!isMailkiteEmailConfigured()) return { ok: true };

  return sendEmail({
    to,
    subject: 'Welcome to SaaS Starter',
    html: `<p>Welcome aboard.</p><p>Your account is ready — <a href="${getBaseUrl()}/dashboard">open your dashboard</a> to get started.</p>`,
    text: `Welcome aboard.\n\nYour account is ready. Open your dashboard: ${getBaseUrl()}/dashboard`,
  });
}

export function getMailkiteApiKey(): string {
  return API_KEY;
}

export function isMailkiteEmailConfigured(): boolean {
  return !!API_KEY;
}
