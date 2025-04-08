import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { organization } from 'better-auth/plugins';

import { sendText } from '@/lib/evolution-api';
import { WebhookPayload } from '@/lib/evolution-api/types';

const sender = '34623107001@s.whatsapp.net';
export const maxDuration = 30;

// {
//   "event": "messages.upsert",
//   "instance": "Business",
//   "data": {
//     "key": {
//       "remoteJid": "34623107001@s.whatsapp.net",
//       "fromMe": false,
//       "id": "0E4CBB74E3EF18DBFEE8E473947FD26B"
//     },
//     "pushName": "Phil",
//     "status": "DELIVERY_ACK",
//     "message": {
//       "messageContextInfo": {
//         "deviceListMetadata": {
//           "senderKeyHash": "uxiSPLqOzgc7Lw==",
//           "senderTimestamp": "1743976301",
//           "recipientKeyHash": "8g5rMYfMoOn8Yg==",
//           "recipientTimestamp": "1743808104"
//         },
//         "deviceListMetadataVersion": 2,
//         "messageSecret": "nqdHEMcbd55voTdMvPIZWIlzWsWBH63e2f4GNE9vpno="
//       },
//       "conversation": "Hola"
//     },
//     "contextInfo": {
//       "expiration": 7776000,
//       "ephemeralSettingTimestamp": "1739155618",
//       "disappearingMode": {
//         "initiator": "CHANGED_IN_CHAT",
//         "trigger": "BULK_CHANGE",
//         "initiatedByMe": true
//       }
//     },
//     "messageType": "conversation",
//     "messageTimestamp": 1744138679,
//     "instanceId": "a73d1f45-b2e0-4a87-b044-41cd6575ddae",
//     "source": "android"
//   },
//   "destination": "https://q829mgvk-3000.uks1.devtunnels.ms/api/webhook",
//   "date_time": "2025-04-08T15:58:00.205Z",
//   "sender": "34641023606@s.whatsapp.net",
//   "server_url": "http://localhost:8080",
//   "apikey": "9FCA4DC163AD-4080-B4E8-CB4618C7C230"
// }

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { organizationId } = req.query;
  const body: WebhookPayload = req.body;

  if (body.data.key.remoteJid !== sender) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const systemPrompt = `
          Eres un asistente útil que responde preguntas basadas únicamente en la información proporcionada por el usuario.
          Si no tienes suficiente información para responder, indica que no lo sabes.
        `;

  const result = await generateText({
    model: openai('gpt-4o'),
    system: systemPrompt,
    prompt: body.data.message.conversation,
  });

  await sendText({
    instanceName: body.instance,
    number: body.data.key.remoteJid,
    text: result.text,
  });

  return res.json({ text: result.text });
}

// {
//     text: '¡Hola! ¿En qué puedo ayudarte hoy?',
//     files: [],
//     reasoning: undefined,
//     reasoningDetails: [],
//     toolCalls: [],
//     toolResults: [],
//     finishReason: 'stop',
//     usage: { promptTokens: 51, completionTokens: 11, totalTokens: 62 },
//     warnings: [],
//     request: {
//       body: '{"model":"gpt-4o","temperature":0,"messages":[{"role":"system","content":"\\n          Eres un asistente útil que responde preguntas basadas únicamente en la información proporcionada por el usuario.\\n          Si no tienes suficiente información para responder, indica que no lo sabes.\\n        "},{"role":"user","content":"Hola"}]}'
//     },
//     response: {
//       id: 'chatcmpl-BK8SHrodqUnRrWsq7Oky01rzUui7M',
//       timestamp: 2025-04-08T18:59:21.000Z,
//       modelId: 'gpt-4o-2024-08-06',
//       headers: [Object],
//       body: [Object],
//       messages: [Array]
//     },
//     steps: [ [Object] ],
//     experimental_providerMetadata: { openai: [Object] },
//     providerMetadata: { openai: [Object] },
//     logprobs: undefined,
//     outputResolver: [Function: outputResolver],
//     sources: []
//   }
