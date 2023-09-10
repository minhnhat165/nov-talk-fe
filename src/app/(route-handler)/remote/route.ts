import { NextRequest, NextResponse } from 'next/server';

import { appConfig } from '@/configs/app-config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  cookies().set({
    name: 'site',
    value: appConfig.siteName.local,
    path: '/',
  });
  if (token) {
    cookies().set({
      name: 'token',
      value: token,
      path: '/',
    });
    cookies().set({
      name: 'site',
      value: appConfig.siteName.remote,
      path: '/',
    });
    return redirect('/talk');
  }
  return NextResponse.json(token);
}
