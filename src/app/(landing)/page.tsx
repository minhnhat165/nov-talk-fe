import { Button } from '@/components/actions/button';
import Link from 'next/link';
import { SingleResponse } from '@/types/api';
import { User } from '@/features/user/types/user';
import { appConfig } from '@/configs/app';

async function getProfile() {
  const url = new URL('/api/auth/me', appConfig.url);
  try {
    const res = await fetch(url);
    console.log(res.body);
  } catch (error) {}
}
export default async function LadingPage() {
  // const profile = await getProfile();
  return (
    <main className="flex min-h-screen  flex-col items-center justify-center">
      <Link
        href={
          new URL('remote/auth/login', appConfig.rootApp.url).toString() +
          '?callback_url=' +
          appConfig.url
        }
      >
        <Button color="primary">Button</Button>
      </Link>
    </main>
  );
}
