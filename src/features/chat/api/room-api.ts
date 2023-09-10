import { CursorPagination, ListResponse, Response } from '@/types/api';

import { Room } from '../types';
import { axios } from '@/configs/axios-config';
import { inboxTypeMap } from '../components/inbox/inbox-main-tab';
import queryString from 'query-string';
import { uploadImage } from '@/utils/upload-img';

const basePath = '/rooms';
export const roomApi = {
  async getRooms(params: CursorParams & { type: keyof typeof inboxTypeMap }) {
    const path = queryString.stringifyUrl({
      url: basePath,
      query: params,
    });
    const res: ListResponse<Room, CursorPagination> = await axios.get(path);
    return res.data;
  },
  async createRoom(
    data: Pick<Room, 'name' | 'avatar'> & {
      participants: string[];
      avatarFile?: File;
    },
  ) {
    if (data.avatarFile) {
      const res = await uploadImage(data.avatarFile);
      data.avatar = res.secure_url;
    }
    const res: Response<Room> = await axios.post(basePath, data);
    return res.data;
  },
};
