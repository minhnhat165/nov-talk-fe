'use server';

import { getAccessToken } from '@/utils/cookies';

const baseUrl = process.env.API_URL;

export async function fetchApi<T>(path: string, options?: RequestInit) {
  const url = new URL(`api${path}`, baseUrl);
  const accessToken = getAccessToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  if (!res.ok && res.status === 401) {
    throw new Error('Unauthorized');
  }
  const data: T = await res.json();
  return data;
}
