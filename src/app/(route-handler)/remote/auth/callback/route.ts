import { NextRequest, NextResponse } from 'next/server';

import { Response } from '@/types/api';
import { User } from '@/features/user/types/user';
import { appConfig } from '@/configs/app-config';
import { cookies } from 'next/headers';
import jwtDecode from 'jwt-decode';
import { redirect } from 'next/navigation';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};
type TokenPayload = {
  exp: number;
  iat: number;
  id: string;
};
export async function GET(req: NextRequest) {
  const accessToken = req.nextUrl.searchParams.get('access_token');
  const url = new URL('/api/auth/remote-login', appConfig.api.url);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({
      accessToken,
      url: url.toString(),
      message: 'Error: ' + res.statusText,
    });
  }

  const data: Response<{
    tokens: Tokens;
    user: User;
  }> = await res.json();
  const { accessToken: accessTokenValue, refreshToken: refreshTokenValue } =
    data.data.tokens;

  if (data) {
    const accessTokenDecoded = jwtDecode<TokenPayload>(accessTokenValue);
    const refreshTokenDecoded = jwtDecode<TokenPayload>(refreshTokenValue);

    cookies().set({
      name: appConfig.cookie.accessTokenName,
      value: accessTokenValue,
      path: '/',
      expires: new Date(accessTokenDecoded.exp * 1000),
      maxAge: accessTokenDecoded.exp - accessTokenDecoded.iat,
    });

    cookies().set({
      name: appConfig.cookie.refreshTokenName,
      value: refreshTokenValue,
      path: '/',
      expires: new Date(refreshTokenDecoded.exp * 1000),
      maxAge: refreshTokenDecoded.exp - refreshTokenDecoded.iat,
    });

    redirect('/talk');
  }
  return NextResponse.json({
    accessToken,
    url: url.toString(),
  });
}
