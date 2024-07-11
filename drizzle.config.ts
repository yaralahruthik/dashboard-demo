import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './supabase/migrations',
  migrations: {
    prefix: 'supabase',
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
