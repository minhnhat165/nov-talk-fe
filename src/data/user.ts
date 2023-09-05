import { User } from '@/features/user/types/user';

export const imgsData: string[] = [
  'https://res.cloudinary.com/devemail/image/upload/v1681044881/642d01603e7d23b767a4a6e0/u3zryapo5l1ubjdyjlz2.jpg',
  'https://res.cloudinary.com/devemail/image/upload/v1689674492/64b6628ee2f7f1fa7b504ceb/posts/pc07z02kdeijyqgamtrb.jpg',
  'https://res.cloudinary.com/devemail/image/upload/v1680859858/642d12eed33f732159d63fef/su7s5altbaur8ijdyiih.jpg',
  'https://res.cloudinary.com/devemail/image/upload/v1689470802/64a660339839667791d34043/wihn4yvnzv8qtjk4d77i.jpg',
];

export const usersData: User[] = [
  {
    _id: '1',
    name: 'John Doe',
    username: 'johndoe',
    avatar: imgsData[0],
    email: '1@gmail.com',
  },
  {
    _id: '2',
    name: 'Quynh Le',
    username: 'quynhle',
    avatar: imgsData[1],
    email: 'ql@gmail.com',
  },

  {
    _id: '3',
    name: 'Minh Nhật',
    username: 'minhnhat',
    avatar: imgsData[2],
    email: 'mh@gmail.com',
  },
];
