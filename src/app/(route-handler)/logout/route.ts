import { NextRequest } from 'next/server';
import { appConfig } from '@/configs/app-config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req: NextRequest) {
  cookies().delete(appConfig.cookie.accessTokenName);
  cookies().delete(appConfig.cookie.refreshTokenName);
  return redirect('/');
}
