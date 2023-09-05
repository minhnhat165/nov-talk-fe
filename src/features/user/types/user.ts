import { BaseEntity } from '@/types/base-entity';

export type User = {
  name: string;
  username: string;
  avatar: string;
  email: string;
} & BaseEntity;
