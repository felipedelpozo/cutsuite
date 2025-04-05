import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';

import db from '@/lib/db';
import { accounts, sessions, users, verifications } from '@/lib/db/schema';
import * as schema from '@/lib/db/schema';
import env from '@/lib/env';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { users, accounts, sessions, verifications },
    usePlural: true,
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        console.log('Sending invitation email to', data.email);
      },
      allowUserToCreateOrganization: false,
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const orgs = await db
            .insert(schema.organizations)
            .values({
              name: 'Personal',
              slug: user.id,
              logo: null,
            })
            .returning();

          const org = orgs[0];
          await db.insert(schema.members).values({
            userId: user.id,
            organizationId: org.id,
            email: user.email,
            role: schema.MemberRole.ADMIN,
          });
        },
      },
    },
  },
});
