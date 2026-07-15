import dotenv from 'dotenv';

dotenv.config();

function createDb() {
  // SQLite / D1 (Cloudflare or local)
  if (process.env.SQLITE_DATABASE_URL) {
    const Database = require('better-sqlite3');
    const { drizzle } = require('drizzle-orm/better-sqlite3');
    const schema = require('./schema.sqlite');
    const sqlite = new Database(process.env.SQLITE_DATABASE_URL);
    return drizzle(sqlite, { schema });
  }

  // PostgreSQL (default)
  if (process.env.POSTGRES_URL) {
    const postgres = require('postgres');
    const { drizzle } = require('drizzle-orm/postgres-js');
    const schema = require('./schema');
    const client = postgres(process.env.POSTGRES_URL);
    return drizzle(client, { schema });
  }

  throw new Error(
    'No database configured. Set POSTGRES_URL or SQLITE_DATABASE_URL.'
  );
}

export const db = createDb();
