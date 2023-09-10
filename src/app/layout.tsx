import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Providers } from '@/providers/providers';
import { appConfig } from '@/configs/app-config';
import { novFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: appConfig.name,
  description: 'A chat app built with Next.js and Socket.io',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={novFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
