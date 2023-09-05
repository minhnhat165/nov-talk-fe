import { Message } from '@/features/chat/types';
import { usersData } from '@/data/user';

export const messagesData: Message[] = [
  {
    _id: '1',
    content: 'Hello',
    user: usersData[0],
  },

  {
    _id: '2',
    content: 'Hi',
    user: usersData[1],
  },

  {
    _id: '3',
    content: 'How are you?',
    user: usersData[0],
  },

  {
    _id: '4',
    content: 'I am fine',
    user: usersData[1],
  },

  {
    _id: '5',
    content: 'How about you?',
    user: usersData[1],
  },

  {
    _id: '6',
    content: 'I am fine too',
    user: usersData[0],
  },
  // new room
  {
    _id: '7',
    content: 'Hello',
    user: usersData[0],
  },

  {
    _id: '8',
    content: 'Hi',
    user: usersData[2],
  },
];
