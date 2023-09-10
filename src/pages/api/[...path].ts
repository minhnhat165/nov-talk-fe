import type { NextApiRequest, NextApiResponse } from 'next';

import Cookies from 'cookies';
import { appConfig } from '@/configs/app-config';
import httpProxy from 'http-proxy';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  return new Promise(() => {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get(appConfig.cookie.accessTokenName);

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    req.headers.cookie = '';
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
  });
}
