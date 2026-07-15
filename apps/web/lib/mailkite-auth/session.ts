import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { getJwtSecret, getAuthConfig } from './config';
import type { SessionData } from './types';

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function signSession(data: SessionData): Promise<string> {
  return await new SignJWT({ userId: data.userId, expires: data.expires })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7 days from now')
    .sign(getJwtSecret());
}

export async function verifySession(token: string): Promise<SessionData> {
  const { payload } = await jwtVerify(token, getJwtSecret(), {
    algorithms: ['HS256'],
  });
  return payload as unknown as SessionData;
}

export async function setSessionCookie(jwt: string): Promise<void> {
  const config = getAuthConfig();
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + SESSION_DURATION);

  // Store the MailKite JWT as our session cookie
  cookieStore.set(config.sessionCookie, jwt, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(): Promise<{
  jwt: string;
  userId: string;
} | null> {
  const config = getAuthConfig();
  const cookieStore = await cookies();
  const jwt = cookieStore.get(config.sessionCookie)?.value;
  if (!jwt) return null;

  try {
    const session = await verifySession(jwt);
    // Check if expired
    if (new Date(session.expires) < new Date()) {
      return null;
    }
    return { jwt, userId: session.userId };
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  const config = getAuthConfig();
  const cookieStore = await cookies();
  cookieStore.delete(config.sessionCookie);
}

export async function refreshSession(jwt: string): Promise<string> {
  const session = await verifySession(jwt);
  const newExpires = new Date(Date.now() + SESSION_DURATION).toISOString();
  return await signSession({ ...session, expires: newExpires });
}
