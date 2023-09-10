import { appConfig } from '@/configs/app-config';
import { cookies } from 'next/headers';

export const getAccessToken = () => {
  return cookies().get(appConfig.cookie.accessTokenName);
};
