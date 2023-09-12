import { NextRequest } from 'next/server';
import { appConfig } from '@/configs/app-config';
import { redirect } from 'next/navigation';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log('params', params);
  return redirect(appConfig.rootApp.url + '/profile/' + params.id);
}
