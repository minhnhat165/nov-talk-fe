import { ChatBox } from '@/features/chat/components/chat-box';
import { Room } from '@/features/chat/types';
import { roomsData } from '@/data/room';

interface Props {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

async function getChatRoom(id: string): Promise<Room> {
  const data = roomsData.find((room) => room._id === id);
  if (!data) {
    throw new Error('Not Found');
  }
  return data;
}

const ChatRoomPage = async (props: Props) => {
  const room = await getChatRoom(props.params.id);
  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-card">
      {<ChatBox room={room} />}
    </div>
  );
};

export default ChatRoomPage;
