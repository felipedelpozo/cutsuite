'use client';

import { useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { ArrowUp, Square } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ChatContainer } from '@/components/ui/chat-container';
import { Markdown } from '@/components/ui/markdown';
import {
  Message,
  MessageAvatar,
  MessageContent,
} from '@/components/ui/message';
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from '@/components/ui/prompt-input';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, stop, status } =
    useChat();

  return (
    <div className="grid h-full grid-cols-12 grid-rows-2 gap-2">
      <div className="col-span-12">
        {messages.map((message) => {
          const isAssistant = message.role === 'assistant';

          return (
            <Message
              key={message.id}
              className={
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }
            >
              {isAssistant && (
                <MessageAvatar
                  src="/avatars/ai.png"
                  alt="AI Assistant"
                  fallback="AI"
                />
              )}
              <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
                {isAssistant ? (
                  <div className="bg-secondary text-foreground prose rounded-lg p-2">
                    <Markdown>{message.content}</Markdown>
                  </div>
                ) : (
                  <MessageContent className="bg-primary text-primary-foreground">
                    {message.content}
                  </MessageContent>
                )}
              </div>
            </Message>
          );
        })}
      </div>
      <PromptInput
        value={input}
        onValueChange={(value) =>
          handleInputChange({
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        isLoading={status !== 'ready'}
        onSubmit={handleSubmit}
        className="col-span-12 row-auto max-w-(--breakpoint-md)"
      >
        <PromptInputTextarea placeholder="Ask me anything..." />
        <PromptInputActions className="justify-end pt-2">
          <PromptInputAction
            tooltip={status !== 'ready' ? 'Stop generation' : 'Send message'}
          >
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleSubmit}
            >
              {status !== 'ready' ? (
                <Square className="size-5 fill-current" />
              ) : (
                <ArrowUp className="size-5" />
              )}
            </Button>
          </PromptInputAction>
        </PromptInputActions>
      </PromptInput>
    </div>
  );
}
