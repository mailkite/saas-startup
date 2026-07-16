import { getAuthConfig } from './config';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

const API_KEY = process.env.MAILKITE_API_KEY || '';

function getApiUrl(): string {
  return getAuthConfig().apiUrl;
}

export async function sendEmail(params: SendEmailParams): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${getApiUrl()}/api/send`, {
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

export function getMailkiteApiKey(): string {
  return API_KEY;
}

export function isMailkiteEmailConfigured(): boolean {
  return !!API_KEY;
}
