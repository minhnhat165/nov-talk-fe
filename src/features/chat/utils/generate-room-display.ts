import { Room } from '@/features/chat/types';
import { User } from '@/features/user/types/user';
import moment from 'moment';

export function generateRoomDisplay(room: Room, currentUserId: User['_id']) {
  const { participants, isGroup, name } = room;
  if (isGroup) {
    if (!name) {
      room.name = participants
        .map((participant) => participant.name.split(' ')[0])
        .join(', ');
    }
    room.link = `/talk/${room._id}`;
    return room;
  }
  let [participant] = participants.filter(
    (participant) => participant._id !== currentUserId,
  );
  if (!participant) {
    participant = participants[0];
  }

  return {
    ...room,
    name: participant.name,
    avatar: participant.avatar,
    link: `/talk/${participant._id}`,
  };
}

export function formatTimeDisplay(time: string) {
  const dateMoment = moment(time);

  if (dateMoment.get('year') !== moment().get('year')) {
    return dateMoment.format('MMM DD, YYYY, LT');
  }
  switch (moment().diff(dateMoment, 'day')) {
    case 0:
      return dateMoment.format('LT');
    case 1:
      return 'Yesterday, ' + dateMoment.format('LT');
    default:
      return dateMoment.format('MMM DD, LT');
  }
}
