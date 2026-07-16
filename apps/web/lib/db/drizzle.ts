let _db: any;

function createDb() {
  if (process.env.POSTGRES_URL) {
    const postgres = require('postgres');
    const { drizzle } = require('drizzle-orm/postgres-js');
    const schema = require('./schema');
    const client = postgres(process.env.POSTGRES_URL);
    return drizzle(client, { schema });
  }

  throw new Error(
    'No database configured. Set POSTGRES_URL.'
  );
}

/**
 * Whether a database is configured at all. Callers on a user-facing path should check
 * this and surface a readable message — reaching `db` without it throws, which surfaces
 * as an opaque "server-side exception" digest page.
 */
export function isDbConfigured(): boolean {
  return !!process.env.POSTGRES_URL;
}

export function getDb() {
  if (!_db) _db = createDb();
  return _db;
}

export const db = new Proxy({} as any, {
  get(_, prop) {
    return (getDb() as any)[prop];
  }
});
