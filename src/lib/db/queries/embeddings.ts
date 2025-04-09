import { cosineDistance, desc, gt, sql } from 'drizzle-orm';

import { generateEmbedding } from '@/lib/ai/embedding';
import db from '@/lib/db';
import { embeddings } from '@/lib/db/schema/embeddings';

export const findRelevantContent = async (userQuery: string) => {
  console.log('Finding relevant content for query:', userQuery);

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

  console.log('Similar guides found:', similarGuides);

  return similarGuides;
};

// export const createResource = async (input: NewResourceParams) => {
//   try {
//     const { content } = insertResourceSchema.parse(input);

//     const [resource] = await db
//       .insert(resources)
//       .values({ content })
//       .returning();

//     const embeddings = await generateEmbeddings(content);
//     await db.insert(embeddingsTable).values(
//       embeddings.map((embedding) => ({
//         resourceId: resource.id,
//         ...embedding,
//       }))
//     );

//     return 'Resource successfully created and embedded.';
//   } catch (error) {
//     return error instanceof Error && error.message.length > 0
//       ? error.message
//       : 'Error, please try again.';
//   }
// };
