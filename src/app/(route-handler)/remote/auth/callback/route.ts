import { NextRequest, NextResponse } from 'next/server';

import { appConfig } from '@/configs/app';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get('access_token');
  console.log(req.nextUrl.href);

  cookies().set({
    name: 'site',
    value: appConfig.siteName.local,
    path: '/',
  });
  if (accessToken) {
    cookies().set({
      name: appConfig.cookie.accessTokenName,
      value: accessToken,
      path: '/',
    });
    cookies().set({
      name: 'site',
      value: appConfig.siteName.remote,
      path: '/',
    });
    return redirect('/');
  }
  return NextResponse.json({
    accessToken,
  });
}
