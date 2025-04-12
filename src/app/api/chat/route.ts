import { headers } from 'next/headers';
import { openai } from '@ai-sdk/openai';
import { smoothStream, streamText, UIMessage } from 'ai';

import { systemPrompt } from '@/lib/ai/prompts';
import { getInformation } from '@/lib/ai/tools/get-information';
import { auth } from '@/lib/auth';
import { generateUUID } from '@/lib/utils';

export const maxDuration = 30;

export async function POST(request: Request) {
  const {
    id,
    messages,
    selectedChatModel,
  }: {
    id: string;
    messages: Array<UIMessage>;
    selectedChatModel: string;
  } = await request.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || !session.user.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = streamText({
    model: openai('gpt-4o'),
    maxSteps: 5,
    system: systemPrompt({ selectedChatModel }),
    messages,
    experimental_activeTools:
      selectedChatModel === 'chat-model-reasoning' ? [] : ['getInformation'],
    experimental_transform: smoothStream({ chunking: 'word' }),
    experimental_generateMessageId: generateUUID,
    tools: {
      getInformation,
    },
    onFinish: async ({ response }) => {
      console.log({ id, response });
    },
  });

  return result.toDataStreamResponse();
}
