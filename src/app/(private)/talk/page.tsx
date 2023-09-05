import { Button } from '@/components/actions/button';
import { Typography } from '@/components/data-display';

export default function ChatPage() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center rounded-md bg-card">
      <div className="text-center">
        <Typography variant="h1">Select a conversation</Typography>
        <Typography variant="muted" className="text-lg">
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </Typography>

        <div>
          <Button className="mt-8" size="lg" color="primary" shape="circle">
            New conversation
          </Button>
        </div>
      </div>
    </main>
  );
}
