import { BaseEntity } from '@/types/base-entity';
import { Message } from '@/features/chat/types/message';
import { User } from '@/features/user/types/user';

export type Room = {
  name?: string;
  avatar?: string;
  participants: User[];
  lastMessage?: Message;
  isGroup: boolean;
  newMessageAt?: string;
  link?: string;
} & BaseEntity;
