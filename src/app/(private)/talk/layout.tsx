import { Inbox } from '@/features/chat/components';

export interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="h-screen w-[23.5rem] p-2">
        <Inbox />
      </div>
      <div className="flex-1 p-2 pl-0">{children}</div>
    </div>
  );
};

export default ChatLayout;
