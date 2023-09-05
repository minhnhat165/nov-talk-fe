import { Room } from '@/features/chat/types';
import { User } from '@/features/user/types/user';

export function generateRoomDisplay(room: Room, currentUserId: User['_id']) {
  const { participants, isGroup } = room;
  if (isGroup) return room;
  const [participant] = participants.filter(
    (participant) => participant._id !== currentUserId,
  );
  return {
    ...room,
    name: participant.name,
    avatar: participant.avatar,
  };
}
