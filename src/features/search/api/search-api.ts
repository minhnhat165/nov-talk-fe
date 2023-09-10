import { Response } from '@/types/api';
import { SearchParams } from '../types';
import { User } from '@/features/user/types';
import { axios } from '@/configs/axios-config';
import queryString from 'query-string';

const basePath = '/search';
export const searchApi = {
  async users(params: SearchParams) {
    const path = queryString.stringifyUrl({
      url: `${basePath}/users`,
      query: params,
    });
    const res: Response<User[]> = await axios.get(path);
    return res.data;
  },
};
