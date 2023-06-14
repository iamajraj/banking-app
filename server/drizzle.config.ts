import type { Config } from 'drizzle-kit';

export default {
  connectionString: process.env.DB_URL,
  schema: './db/schema/*',
  out: 'migrations',
} satisfies Config;
