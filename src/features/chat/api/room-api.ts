import { CursorPagination, ListResponse } from '@/types/api';

import { Room } from '../types';
import { fetchApi } from '@/utils/data-fetching';

const basePath = '/rooms';
export const roomApi = {
  async getRooms() {
    const data = await fetchApi<ListResponse<Room, CursorPagination>>(basePath);
    return data.data;
  },
};
