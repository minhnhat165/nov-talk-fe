import { ChatBox } from '@/features/chat/components/chat-box';
import { Room } from '@/features/chat/types';
import { roomsData } from '@/data/room';

async function getChatRoom(id: string) {
  const data = roomsData.find((room) => room._id === id);
  if (!data) {
    throw new Error('Not Found');
  }
  return data;
}

const ChatRoomPage = async (props: {
  params: {
    id: string;
  };
}) => {
  const room = await getChatRoom(props.params.id);
  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-card">
      {<ChatBox room={room} />}
    </div>
  );
};

export default ChatRoomPage;
