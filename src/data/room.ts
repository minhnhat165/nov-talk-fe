import { imgsData, usersData } from '@/data/user';

import { Room } from '@/features/chat/types';
import { messagesData } from '@/data/message';

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
    lastMessage: messagesData[5],
    isGroup: true,
    name: 'Group 1',
    avatar: imgsData[3],
  },
];
