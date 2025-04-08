'use server';

import { eq } from 'drizzle-orm';

import { generateEmbeddings } from '@/lib/ai/embedding';
import db from '@/lib/db';
import { documents, NewDocument } from '@/lib/db/schema/documents';
import { embeddings, NewEmbedding } from '@/lib/db/schema/embeddings';

export const createDocument = async (input: NewDocument) => {
  try {
    const { id, ...values } = input;

    if (id) {
      await db.delete(documents).where(eq(documents.id, id));
    }

    const [document] = await db.insert(documents).values(values).returning();
    const embeddingsData = await generateEmbeddings(values.content);

    await db.insert(embeddings).values(
      embeddingsData.map((embedding) => ({
        document_id: document.id,
        ...embedding,
      })) as NewEmbedding[]
    );

    return document;
  } catch (e) {
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : 'Error, please try again.';
  }
};
