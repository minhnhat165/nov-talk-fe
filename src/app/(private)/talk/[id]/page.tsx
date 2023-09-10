import { ChatBox } from '@/features/chat/components/chat-box';
import { Response } from '@/types/api';
import { Room } from '@/features/chat/types';
import { fetchApi } from '@/utils/data-fetching';

async function getChatRoom(id: string) {
  const data = await fetchApi<Response<Room>>(`/rooms/${id}`);
  if (!data) {
    throw new Error('Not Found');
  }
  return data.data;
}

const ChatRoomPage = async (props: {
  params: {
    id: string;
  };
}) => {
  const room = await getChatRoom(props.params.id);
  if (!room) {
    return <div>Not Found</div>;
  }
  console.log(room);
  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-card">
      {<ChatBox room={room} />}
    </div>
  );
};

export default ChatRoomPage;
