import { BaseEntity } from '@/types/base-entity';
import { Room } from '@/features/chat/types/room';
import { User } from '@/features/user/types/user';

export type Message = {
  content: string;
  room?: Room;
  sender: User;
  readBy?: User['_id'][];
  receivedBy?: User['_id'][];
} & BaseEntity;
