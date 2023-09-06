import { Message } from '@/features/chat/types';
import { usersData } from '@/data/user';

export const messagesData: Message[] = [
  {
    _id: '1',
    content: 'Hello',
    sender: usersData[0],
  },

  {
    _id: '2',
    content: 'Hi',
    sender: usersData[1],
  },

  {
    _id: '3',
    content: 'How are you?',
    sender: usersData[0],
  },

  {
    _id: '4',
    content: 'I am fine',
    sender: usersData[1],
  },

  {
    _id: '5',
    content: 'How about you?',
    sender: usersData[1],
  },

  {
    _id: '6',
    content: 'I am fine too',
    sender: usersData[0],
    readBy: [usersData[0]._id, usersData[1]._id],
  },
  // new room
  {
    _id: '7',
    content: 'Hello',
    sender: usersData[0],
  },

  {
    _id: '8',
    content: 'Hi',
    sender: usersData[2],
    readBy: [usersData[0]._id, usersData[1]._id],
  },
];

export const messagesRoomData: Message[] = [
  {
    _id: '0',
    content: 'new',
    sender: usersData[0],
    createdAt: new Date('9/3/2022').toISOString(),
  },
  {
    _id: '1',
    content: 'Hello',
    sender: usersData[0],
    createdAt: new Date('9/4/2022').toISOString(),
  },
  {
    _id: '2',
    content: 'Hi there!',
    sender: usersData[1],
    createdAt: new Date('9/4/2023').toISOString(),
  },
  {
    _id: '3',
    content: 'How are you?',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 2).toISOString(),
  },
  {
    _id: '4',
    content: "I'm good, thanks!",
    sender: usersData[1],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 3).toISOString(),
  },
  {
    _id: '5',
    content: 'What are you up to?',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 4).toISOString(),
  },
  {
    _id: '6',
    content: 'Not much, just working.',
    sender: usersData[2],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 5).toISOString(),
  },
  {
    _id: '7',
    content: 'Sounds busy!',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 6).toISOString(),
  },
  {
    _id: '8',
    content: 'Yeah, it is.',
    sender: usersData[1],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 7).toISOString(),
  },
  {
    _id: '9',
    content: 'Anything',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 13).toISOString(),
  },
  {
    _id: '10',
    content: 'interesting happening?',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 14).toISOString(),
  },
  {
    _id: '11',
    content: 'No, not really.',
    sender: usersData[1],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 15).toISOString(),
  },
  {
    _id: '12',
    content: 'How about you?',
    sender: usersData[1],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 16).toISOString(),
  },
  {
    _id: '13',
    content: 'Your work is done?',
    sender: usersData[1],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 17).toISOString(),
  },
  {
    _id: '14',
    content: 'Yeah, I just finished.',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 18).toISOString(),
    readBy: [usersData[0]._id, usersData[1]._id],
  },
  {
    _id: '15',
    content: 'Let’s go for a drink!',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 19).toISOString(),
  },
  {
    _id: '16',
    content: 'Sure, let me just',
    sender: usersData[1],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 20).toISOString(),
  },
  {
    _id: '17',
    content: 'finish this up.',
    sender: usersData[1],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 21).toISOString(),
    readBy: [usersData[0]._id, usersData[1]._id],
  },
  {
    _id: '18',
    content: 'Ok, let me know when you’re done.',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 22).toISOString(),
  },
  {
    _id: '19',
    content: 'I’m done!',
    sender: usersData[1],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 100).toISOString(),
    readBy: [usersData[0]._id, usersData[2]._id],
  },
  {
    _id: '20',
    content: 'Great, let’s go!',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 101).toISOString(),
  },
  {
    _id: '21',
    content: 'Great, let’s go!',
    sender: usersData[0],
    createdAt: new Date(new Date().getTime() + 1000 * 60 * 107).toISOString(),
    readBy: [usersData[1]._id, usersData[2]._id],
  },
].reverse();
