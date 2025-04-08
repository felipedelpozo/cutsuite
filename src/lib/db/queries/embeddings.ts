import { cosineDistance, desc, gt, sql } from 'drizzle-orm';

import { generateEmbedding } from '@/lib/ai/embedding';
import db from '@/lib/db';
import { embeddings } from '@/lib/db/schema/embeddings';

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded
  )})`;

  const similarGuides = await db
    .select({ name: embeddings.content, similarity })
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(4);

  return similarGuides;
};
