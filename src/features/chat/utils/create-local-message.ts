import { Media, Message } from '@/features/chat/types/message';

import { User } from '@/features/user/types';

export const createLocalMessage = ({
  sender,
  content = '',
  media = [],
}: {
  sender: User;
  content?: string;
  media?: Media[];
}): Message => {
  return {
    _id: self.crypto.randomUUID(),
    sender: sender!,
    content,
    status: 'pending',
    type: 'text',
    media,
    createdAt: new Date().toISOString(),
  };
};
