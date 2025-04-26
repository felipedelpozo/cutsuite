import { Chat } from '@/components/ai/chat';

export default function Page() {
  return (
    <Chat
      id={chat.id}
      initialMessages={convertToUIMessages(messagesFromDb)}
      selectedChatModel={chatModelFromCookie.value}
      selectedVisibilityType={chat.visibility}
      isReadonly={session?.user?.id !== chat.userId}
    />
  );
}
