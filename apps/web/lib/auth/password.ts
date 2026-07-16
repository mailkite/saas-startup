// Password hashing for email sign-up.
//
// WebCrypto (crypto.subtle) needs no native module, so this works unchanged on Vercel's
// runtime, Node, and Workers alike — no bcrypt/argon2 build step. We use PBKDF2-HMAC-
// SHA-256 with a per-password random salt. The stored verifier is self-describing, so
// the parameters travel with the hash and can be tuned later without a data migration:
//
//   pbkdf2$<iterations>$<saltBase64>$<hashBase64>
//
// Verification is constant-time (timingSafeEqual) to avoid leaking the hash by timing.

import 'server-only';

const ITERATIONS = 100_000;
const KEY_LEN = 32; // bytes of derived key material
const SALT_LEN = 16;

function toBase64(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function fromBase64(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function derive(
  password: string,
  // Uint8Array is generic over ArrayBufferLike since TS 5.7; WebCrypto's BufferSource
  // needs a plain ArrayBuffer, so pin it here rather than casting at the call site.
  salt: Uint8Array<ArrayBuffer>,
  iterations: number
): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    key,
    KEY_LEN * 8
  );
  return new Uint8Array(bits);
}

/** Hash a plaintext password into the storable verifier string. */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const hash = await derive(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${toBase64(salt)}$${toBase64(hash)}`;
}

/** Constant-time compare of two byte arrays of equal length. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

/**
 * Verify a plaintext password against a stored verifier. False on any malformed input —
 * including a null hash, which is what OAuth-created accounts carry.
 */
export async function verifyPassword(
  password: string,
  stored: string | null
): Promise<boolean> {
  if (!stored) return false;
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations <= 0) return false;
  let salt: Uint8Array<ArrayBuffer>;
  let expected: Uint8Array;
  try {
    salt = fromBase64(parts[2]);
    expected = fromBase64(parts[3]);
  } catch {
    return false;
  }
  const actual = await derive(password, salt, iterations);
  return timingSafeEqual(actual, expected);
}
