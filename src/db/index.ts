import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';

config({ path: '.env.local '});

export const db = drizzle(process.env.DATABASE_URL!);
