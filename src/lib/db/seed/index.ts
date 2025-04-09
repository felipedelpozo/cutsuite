import { generateEmbeddings } from '@/lib/ai/embedding';
import db from '@/lib/db';
import * as schema from '@/lib/db/schema';
import accounts from '@/lib/db/seed/data/accounts.json';
import documents from '@/lib/db/seed/data/documents.json';
import members from '@/lib/db/seed/data/members.json';
import organizations from '@/lib/db/seed/data/organizations.json';
import sessions from '@/lib/db/seed/data/sessions.json';
import users from '@/lib/db/seed/data/users.json';

async function seed() {
  await db.insert(schema.users).values(
    users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    }))
  );
  await db.insert(schema.sessions).values(
    sessions.map((session) => ({
      id: session.id,
      token: session.token,
      ipAddress: session.ip_address,
      userAgent: session.user_agent,
      expiresAt: new Date(session.expires_at),
      userId: session.user_id,
      createdAt: new Date(session.created_at),
      updatedAt: new Date(session.updated_at),
    }))
  );
  await db.insert(schema.accounts).values(
    accounts.map((account) => ({
      id: account.id,
      accountId: account.account_id,
      providerId: account.provider_id,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      idToken: account.id_token,
      accessTokenExpiresAt: account.access_token_expires_at
        ? new Date(account.access_token_expires_at)
        : null,
      refreshTokenExpiresAt: account.refresh_token_expires_at
        ? new Date(account.refresh_token_expires_at)
        : null,
      scope: account.scope,
      userId: account.user_id,
      createdAt: new Date(account.created_at),
      updatedAt: new Date(account.updated_at),
    }))
  );

  const [organization] = await db
    .insert(schema.organizations)
    .values(organizations)
    .returning();

  await db.insert(schema.members).values(
    members.map((member) => ({
      email: member.email,
      userId: member.user_id,
      organizationId: member.organization_id,
      role: member.role as schema.MemberRole,
      displayName: member.display_name,
      phoneNumber: member.phone_number,
      image: member.image,
      preferences: member.preferences,
      createdAt: new Date(member.created_at),
      updatedAt: new Date(member.updated_at),
    }))
  );

  const documentsRecords = await db
    .insert(schema.documents)
    .values(
      documents.map((document) => ({
        content: document.content,
        organizationId: organization.id,
        createdAt: new Date(document.created_at),
        updatedAt: new Date(document.updated_at),
      }))
    )
    .returning();

  await Promise.all(
    documentsRecords.map(async (document) => {
      const embeddings = await generateEmbeddings(document.content);
      await db.insert(schema.embeddings).values(
        embeddings.map((embedding) => ({
          document_id: document.id,
          ...embedding,
        }))
      );
    })
  );
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
