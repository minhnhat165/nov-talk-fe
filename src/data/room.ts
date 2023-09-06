import { imgsData, usersData } from '@/data/user';
import { messagesData, messagesRoomData } from '@/data/message';

import { Room } from '@/features/chat/types';

export const roomsData: Room[] = [
  {
    _id: '1',
    participants: [usersData[0], usersData[1]],
    lastMessage: messagesData[5],
    isGroup: false,
  },
  {
    _id: '2',
    participants: [usersData[0], usersData[2]],
    lastMessage: messagesData[7],
    isGroup: false,
  },

  {
    _id: '3',
    participants: [usersData[0], usersData[1], usersData[2]],
    lastMessage: messagesData[7],
    isGroup: true,
    name: 'Group 1',
    avatar: imgsData[3],
  },
  {
    _id: '4',
    participants: [usersData[0], usersData[1], usersData[2]],
    lastMessage: messagesRoomData[0],
    isGroup: true,
    name: 'Group 2',
    avatar: imgsData[3],
  },
];
