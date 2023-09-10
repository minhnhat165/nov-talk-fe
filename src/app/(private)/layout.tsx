import { InitializeAuthStore } from '@/features/auth/stores/client-init-store';
import { Sidebar } from '@/components/layout';
import { getCurrentUser } from '@/features/auth/api/get-current-user';
import { redirect } from 'next/navigation';

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentUser();
  if (!profile) {
    redirect('/login');
  }
  return (
    <div className="flex">
      <InitializeAuthStore user={profile} />
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
