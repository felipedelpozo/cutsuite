'use client';

import { useChat } from '@ai-sdk/react';

import { Messages } from '@/components/ai/messages';

import { MultimodalInput } from './multimodal-input';

export function Chat({ id, isReadonly }: { id: string; isReadonly: boolean }) {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
  } = useChat();

  console.log({ messages, status });

  return (
    <>
      <div className="bg-background flex h-full min-w-0 flex-col">
        <Messages
          chatId={id}
          status={status}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
        />

        <form className="bg-background mx-auto flex w-full gap-2 px-4 pb-4 md:max-w-3xl md:pb-6">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              status={status}
              stop={stop}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>
    </>
  );
}
