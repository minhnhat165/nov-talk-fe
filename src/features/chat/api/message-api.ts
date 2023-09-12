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
    localId: string;
  }) {
    const { localId, ...sendData } = data;
    const res: Response<Message> = await axios.post(basePath, sendData);
    return res.data;
  },
};
