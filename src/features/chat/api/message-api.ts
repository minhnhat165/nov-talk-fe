import { Media } from '../types/message';
import { Message } from '../types';
import { Response } from '@/types/api';
import { axios } from '@/configs/axios-config';

type CreateMessageData = {
  roomId: string;
  media?: Media[];
  content: string;
  localId: string;
};

const basePath = '/messages';
export const messageApi = {
  async sendMessage(data: {
    roomId: string;
    media?: Media[];
    content: string;
    clientTempId: string;
  }) {
    const res: Response<Message> = await axios.post(basePath, data);
    return res.data;
  },

  async remove({ id, type }: { id: string; type: 'me' | 'all' }) {
    const res: Response<Message> = await axios.delete(`${basePath}/${id}`, {
      params: { type },
    });
    return res.data;
  },
};
