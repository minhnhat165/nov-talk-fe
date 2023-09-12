import { BaseEntity } from '@/types/base-entity';
import { Room } from '@/features/chat/types/room';
import { User } from '@/features/user/types/user';

export type MessageType = 'text' | 'media' | 'call';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'pending';
export type MediaType = 'image' | 'video' | 'audio' | 'document';
export type Media = {
  url: string;
  type: MediaType;
  file?: File;
  size?: number;
  name?: string;
};
export type Message = {
  content: string;
  room?: Room;
  sender: User;
  readBy?: User['_id'][];
  deliveredTo?: User['_id'][];
  media?: Media[];
  type: MessageType;
  status: MessageStatus;
} & BaseEntity;
