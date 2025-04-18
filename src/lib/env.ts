import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    EVOLUTION_API_URL: z.string().url(),
    EVOLUTION_API_KEY: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    EVOLUTION_API_URL: process.env.EVOLUTION_API_URL,
    EVOLUTION_API_KEY: process.env.EVOLUTION_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
});

export default env;
