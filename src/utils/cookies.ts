import { appConfig } from '@/configs/app';
import { cookies } from 'next/headers';

export const getAccessToken = () => {
  return cookies().get(appConfig.cookie.accessTokenName);
};
