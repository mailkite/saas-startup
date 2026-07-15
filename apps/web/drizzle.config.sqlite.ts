import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema.sqlite.ts',
  out: './lib/db/migrations/sqlite',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.SQLITE_DATABASE_URL || 'local.db',
  },
} satisfies Config;
