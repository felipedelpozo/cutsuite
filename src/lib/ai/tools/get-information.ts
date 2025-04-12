import { tool } from 'ai';
import { z } from 'zod';

import { findRelevantContent } from '@/lib/db/queries/embeddings';

export const getInformation = tool({
  description: `get information from your knowledge base to answer questions.`,
  parameters: z.object({
    question: z.string().describe('the users question'),
  }),
  execute: async ({ question }) => {
    const response = await findRelevantContent(question);

    console.log({ response });

    return response;
  },
});
