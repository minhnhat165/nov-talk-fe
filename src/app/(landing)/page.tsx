import { Button } from '@/components/actions/button';
import Link from 'next/link';
import { appConfig } from '@/configs/app-config';
import { getAccessToken } from '@/utils/cookies';
import { redirect } from 'next/navigation';

export default async function LadingPage() {
  const isAuthenticated = !!getAccessToken()?.value;
  if (isAuthenticated) {
    redirect('/talk');
  }
  return (
    <main className="flex min-h-screen  flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-semibold">Welcome to Chat App</h1>
      <p className="mb-8 text-lg">Join the conversation today!</p>

      <Link
        href={
          new URL('remote/auth/login', appConfig.rootApp.url).toString() +
          '?callback_url=' +
          appConfig.url
        }
      >
        <Button shape="circle" size="lg" color="primary">
          Login to Talk
        </Button>
      </Link>
    </main>
  );
}
