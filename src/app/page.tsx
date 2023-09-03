import { Button } from '@/components/actions';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        variant="outline"
        size="lg"
        color="primary"
        shape="circle"
        startIcon={<CheckBadgeIcon />}
      >
        Button
      </Button>
    </main>
  );
}
